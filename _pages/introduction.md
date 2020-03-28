[![Dependencies](https://david-dm.org/acrontum/openapi-nodegen.svg)](https://david-dm.org/acrontum/openapi-nodegen) | [![Build Status](https://travis-ci.org/acrontum/openapi-nodegen.svg?branch=master)](https://travis-ci.org/acrontum/openapi-nodegen) | [codecov](https://codecov.io/gh/acrontum/openapi-nodegen/)

# OpenAPI Nodegen

Automate the donkey work of manually typing out the HTTP layer of a your RESTful API servers and clients.

OpenAPI Nodegen is an open-sourced tool from [https://www.acrontum.com](https://www.acrontum.com)

> Upcoming: The name of this tool may change soon as support for AsyncAPI is on the horizon.

## Introduction

Write a well defined RESTful API specification file (eg with [BOATS](https://www.npmjs.com/package/boats)) then use OpenAPI Nodegen to generate a server, a client, an API testrig or whatever the target template files build.

OpenAPI Nodegen is very similar to swagger-codegen except:
- The core engine is written 100% in JavaScript and only needs Node LTS to run and is currently designed to primarily generate JavaScript and TypeScript code.
- The template engine is the Mozilla Nunjucks engine extended with Lodash & a few custom helpers.
- All the template files to generate content have been removed from the core engine.
  - The core downloads the template files from a git URL, eg from GitHub, of your choosing.
  - This allows for tpl changes to be released without having to publish a new version of the core.
