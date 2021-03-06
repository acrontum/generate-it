import bodyParser from 'body-parser';
import express from 'express';
import expressFormData from 'express-form-data';
import morgan from 'morgan';
import packageJson from '../../package.json';
import requestIp from 'request-ip';
import corsMiddleware from './nodegen/middleware/corsMiddleware';
import headersCaching from './nodegen/middleware/headersCaching';
import queryArrayParserMiddleware from './nodegen/middleware/queryArrayParserMiddleware';

const responseHeaders = (app: express.Application): void => {
  app.use(corsMiddleware());
  app.use(headersCaching());
};

const requestParser = (app: express.Application): void => {
  // parse data with connect-multiparty
  app.use(
    expressFormData.parse({
      autoClean: true,
      autoFiles: true,
      uploadDir: require('os').tmpdir(),
    }),
  );
  app.use(bodyParser.json({ limit: '50mb' }));

  // parse query params
  app.use(queryArrayParserMiddleware());

  // clear all empty files (size == 0)
  app.use(expressFormData.format());

  // union body and files
  app.use(expressFormData.union());

  // parse the body
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  app.use(requestIp.mw());
};

const accessLogger = (app: express.Application): void => {
  // Log all requests
  app.use(
    morgan(
      `[${packageJson.name}] :remote-addr [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length]`,
    ),
  );
};

/**
 * Injects routes into the passed express app
 * @param app
 */
export default (app: express.Application): void => {
  accessLogger(app);
  requestParser(app);
  responseHeaders(app);
};
