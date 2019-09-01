#!/usr/bin/env node
require('colors')
const path = require('path')
const inquirer = require('inquirer')
const cli = require('./commander')()
const logger = require('./lib/logger')
const codegen = require('./lib')

console.log(`Provided arguments look ok, preceding to build the http layer and any stub files.

`.yellow)
global.startISOString = (new Date()).toISOString()
global.veryVerboseLogging = (o) => {
  if (cli.program['veryVerbose']) {
    logger(o)
  }
}
global.verboseLogging = (o) => {
  if (cli.program['verbose'] || cli.program['veryVerbose']) {
    logger(o)
  }
}

const go = (mockServer) => {
  codegen({
    swaggerFilePath: cli.swaggerFile,
    targetDir: cli.program.output,
    template: cli.program.template,
    segmentsCount: +cli.program.segmentsCount,
    handlebars_helper: cli.program.handlebars ? path.resolve(process.cwd(), cli.program.handlebars) : undefined,
    ignoredModules: cli.program.ignoredModules ? cli.program.ignoredModules.split(',') : [],
    mockServer: mockServer || false,
  }).then(() => {
    console.log(`
Done! ✨`.green.bold)
    console.log(`
Your API files have been output here: `.yellow + cli.program.output.magenta + `.
`.yellow)
  }).catch(async (err) => {
    console.error('Something went wrong:'.red)
    console.trace(err)
    process.exit(1)
  })
}

let question = `Continuing will replace the entire http layer:`.green +
  `
- ___interface|mock|op files are classed as the http layer and will be regenerated based on the provide api file, meaning local changes to these files will be lost. 
- Differences in the ___stub files, new|removed|changed methods (typically the domain layer) will be output to the console.
- See the manual for further information: https://acrontum.github.io/openapi-nodegen/
- This message is of no concern for a 1st time run.
` +
  `Are you sure you wish to continue?
`.green

const questions = [{
  type: 'confirm',
  name: 'installConfirm',
  message: question,
  default: false
}]
inquirer.prompt(questions)
  .then((answers) => {
    if (answers.installConfirm) {
      console.log(`
Starting the generation...
`)
      go(cli.program.mocked)
    } else {
      console.log('Generation cancelled. No files have been touched.'.red)
    }
  })
  .catch((e) => {
    console.error(e)
  })

process.on('unhandledRejection', (err) => {
  console.error(err)
})
