## Introduction

OpenAPI Nodegen is an opensourced tool from [https://www.acrontum.com](https://www.acrontum.com)

The tool will build a REST Api server with the expressjs application framework;
- All routes are validated with celebrate, which under the hood maps to Joi and does a little more than just validation.
- All routes then map to their own domain layer (named via the path tag) for which you have two options when starting:
  -  Just using this tool without any options will leave you with a method stub; an empty method for you to fill in.
  -  Passing the `-m` or `--mocked` option will inject the use of the [openapi-nodegen-mockers](https://www.npmjs.com/package/openapi-nodegen-mockers) helper and instantly give you the ability to use your server as a mock server to quickly build a frontend,

> !Important: Do not give a path more than 1 tag. This will, as with many code-generators result in duplicate code.
  
Once the server is built the first time, subsequent runs will replace the `src/http/nodegen` directory with new content, as such, do not modify these files directly.

Subsequent runs post 1st run will not replace the domain layer or any other application code; this also means after the 1st run, should you add new routes to an existing tag, the corresponding methods will not appear, you must then add them by hand.
