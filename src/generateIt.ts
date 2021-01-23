import { Config, ConfigExtendedBase } from '@/interfaces';
import ConfigMerger from '@/lib/ConfigMerger';
import FileIterator from '@/lib/FileIterator';
import GeneratedComparison from '@/lib/generate/GeneratedComparison';
import generateDirectoryStructure from '@/lib/generate/generateDirectoryStructure';
import checkRcOpIdArrIsValid from '@/lib/helpers/checkRcOpIdArrIsValid';
import globalHelpers from '@/lib/helpers/globalHelpers';
import OpenAPIBundler from '@/lib/openapi/OpenAPIBundler';
import TemplateFetch from '@/lib/template/TemplateFetch';
import * as fs from 'fs-extra';
import path from 'path';

const bold = (s: string) => `\x1b[1;1m${s}\x1b[0;0m`;
const green = (s: string, isBold = false) => `\x1b[${Number(isBold)};32m${s}\x1b[0;0m`;
let now: number;

export const logTimeDiff = (start = now, end = Date.now()) => {
  console.log(green(`Seconds passed: ${((end - start) / 1000).toFixed(2)}`));
  start = end;
};

/**
 * Fetches templates.
 *
 * @param  {Config}                       config  The configuration
 *
 * @return {Promise<ConfigExtendedBase>}  Merged config settings
 */
const fetchTemplates = async (config: Config): Promise<ConfigExtendedBase> => {
  console.log(green('Fetching templates...', true));

  const templatesDir = await TemplateFetch.resolveTemplateType(
    config.template,
    config.targetDir,
    config.dontUpdateTplCache
  );
  const extendedConfig = await ConfigMerger.base(config, templatesDir);
  logTimeDiff();

  return extendedConfig;
};

/**
 * Creates an api object.
 *
 * @param  {Config}                       config          The configuration
 * @param  {ConfigExtendedBase}           extendedConfig  The extended configuration
 *
 * @return {Promise<ConfigExtendedBase>}  Merged config settings
 */
const createApiObject = async (config: Config, extendedConfig: ConfigExtendedBase): Promise<ConfigExtendedBase> => {
  console.log(green('Preparing openapi object...', true));

  const apiObject = await OpenAPIBundler.bundle(config.swaggerFilePath, extendedConfig);
  logTimeDiff();

  console.log(green('Printing full object to the .openapi-nodegen directory', true));

  const baseCompiledObjectPath = path.join(GeneratedComparison.getCacheBaseDir(config.targetDir), 'apiObject.json');
  fs.ensureFileSync(baseCompiledObjectPath);
  fs.writeJsonSync(baseCompiledObjectPath, apiObject, { spaces: 2 });
  extendedConfig = ConfigMerger.injectSwagger(extendedConfig, apiObject);
  checkRcOpIdArrIsValid(extendedConfig.swagger, extendedConfig.nodegenRc);

  logTimeDiff();

  return extendedConfig;
};

/**
 * Iterates files and renders content.
 *
 * @param  {ConfigExtendedBase}  extendedConfig  The extended configuration
 * @param  {string}              templatesDir    The templates dir
 */
const injectContent = async (extendedConfig: ConfigExtendedBase, templatesDir: string): Promise<void> => {
  console.log(green('Injecting content to files...', true));

  await FileIterator.walk(generateDirectoryStructure(extendedConfig, templatesDir), extendedConfig);
  logTimeDiff();
};

/**
 * Generates stub diffs.
 *
 * @param  {Config}         config  The configuration
 */
const runComparisonTool = async (config: Config): Promise<void> => {
  if (config.dontRunComparisonTool) {
    return;
  }

  console.log(green('Building stub file comparison list...', true));

  const startTime = new Date().getTime();
  const diffObject = await GeneratedComparison.fileDiffs(config.targetDir);
  await GeneratedComparison.fileDiffsPrint(config.targetDir, diffObject);
  logTimeDiff();

  console.log(green('Comparison version cleanup...', true));
  GeneratedComparison.versionCleanup(config.targetDir);
  logTimeDiff();
};

/**
 * Prints the changelog.
 *
 * @param {Config}  config  The configuration
 */
const printChangelog = (config: Config): void => {
  const changelogFilePath = path.join(config.targetDir, 'changelog.generate-it.json');

  if (fs.existsSync(changelogFilePath)) {
    const changelog = fs.readJsonSync(changelogFilePath);
    const latest = changelog.releases.pop();

    console.log(`

${green('Template version:                ')} ${green(latest.templateVersion, true)}
Minimum generate-it core version: ${bold(latest.minCoreVersion)}
Tpl Change Description:           ${bold(latest.description)}

${green('See the changelog for details:', true)} ${green(changelogFilePath)}
`);
  }
};

export default async (config: Config): Promise<boolean> => {
  now = Date.now();
  globalHelpers(config.verbose, config.veryVerbose);

  const extendedConfig = await fetchTemplates(config);

  const apiObject = await createApiObject(config, extendedConfig);

  await injectContent(extendedConfig, extendedConfig.templates);

  await runComparisonTool(config);

  printChangelog(config);

  return true;
};
