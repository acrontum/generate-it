# OpenAPI Nodegen

Automate the donkey work of manually typing out a server's routes, validation and output transformers more than once.

## Introduction

OpenAPI Nodegen is an opensourced tool from [https://www.acrontum.com](https://www.acrontum.com)

It is a port of swagger-codegen with the help of json-schema-ref-parser. Instead of using the moustache template engine it uses the more flexible nunjucks.

On top of the base codegen functionality, this tool can:
- Generate a mock server from a single api file (swagger/openapi):
  -  Passing the `-m` or `--mocked` option will inject the use of the [openapi-nodegen-mockers](https://www.npmjs.com/package/openapi-nodegen-mockers) helper and instantly give you the ability to use your server as a mock server to quickly build a frontend.
- Generate domain files for your server based on `___stub.<js|ts>.njk` files
  - Eg: [___stub.ts.njk](https://github.com/acrontum/openapi-nodegen/blob/master/templates/typescript/src/domains/___stub.ts.njk)
  - The stub files will never be overwritten after their 1st generation, instead new methods and changes to methods will be run through a diff tool and output in the console.
- Fetch templates via git eg:
  - `openapi-nodegen ./api_1.0.0.yml -o ./src/services/client -t https://github.com/acrontum/openapi-nodegen-typescript-server-client.git`
  - There are only 2 template options to choose from that nodegen ships with, an es6 server and a Typescript server, if you require anything else you must use a git url.


## Installation
Install as a local devDependency:
```
npm i --save-dev openapi-nodegen
```

After installing, add a build script to your `package.json` file:
```
"scripts": {
    "generate:nodegen": "openapi-nodegen ./openapi.yml -m",
}
```

> make sure you change the "./openapi.yml" to a path that matches your environment.

The above script makes use of the `-m` option, for an understanding on what this means and all other options please see (this page)[./cli-options.md]

## CLI Options
```
  Usage: cli <swaggerFile> [options] 
  Options:
    -o, --output <outputDir>                Output directory for the the generated files (defaults to current directory the tool is run from) (default: ./)
    -t, --template <template>               Templates to use (es6 or typescript or a git url) (default: es6)
    -m, --mocked                            If passed, the domains will be configured to return dummy content.
    -i, --ignored-modules <ignoredModules>  Ignore the following type of modules (routes, controllers, domains, validators, transformers) in case they already exist (separated by commas)
    -v,                                     versbose logging
    -V, --version                           Output the version number
    -h, --help                              Output help information
```

## How it works
A great big loop over all the paths essentially.

Using json-schema-ref-parser a big object is formed. Openapi-nodegen then loops over all the api paths in the formed object passing each paths object to a nunjucks template.

Please take a look at the exmaple

## Routing
The route files are automatically built based on the described routes in the OpenAPI Spec file.

Middlewares: OpenAPI-Nodegen will inject, based on the data within the yaml file, to each route the following middleware when required:
- JWT Validation
- API Key protection
- Input validation with [Celebrate](https://www.npmjs.com/package/celebrate)

Domain: The data is then passed to a given domain method.

Output transformer: Each route will then automatically reduce the output to that which is declared in the response objects of the yaml file.

### Route security
To help the Nodegen understanding which security definitions are API keys and which are JWT tokens, you will need to give them one of the following names `apiKeyX` / `jwtTokenX` (the X can be replaced with any other character, and allows you to declare multiple security definitions of the same type for a single api if needed).

An example of an API key security definition:
```yaml
securityDefinitions:
  apiKey1:
    type: apiKey
    in: header
    name: 'x-api-key'
```

And an example of a JWT token security definition:
```yaml
securityDefinitions:
  jwtToken1:
    type: apiKey
    in: header
    name: 'Authorization'
```

### Automatic Route Validation Protection
OpenAPI allows one to very clearly state what the expected input format should and should not be. Based on this very clear definition, OpenAPI-Nodegen auto-generates [Joi](https://github.com/hapijs/joi) validation syntax for use with [celebrate](https://www.npmjs.com/package/celebrate).

The celebrate package with the generated Joi syntax will:
- Validate the input provided, ensuring the datatypes are as expected.
- Not allow non-declared input to pass the front door, ie not hit your domain layer; should you pass "email=john@gmail.com" but this is not declared in the OpenAPI file, the celebrate will throw a 422 http status code in response.

### Output Transformer
Your OpenAPI file you will have already declared quite strictly what to expect in response from the server, OpenAPI-Nodegen takes this information and auto-generates equally as strict output transformers.

Taking the idea from [transformers](https://fractal.thephpleague.com/transformers/) all output is passed through [objectReduceByMap](https://www.npmjs.com/package/object-reduce-by-map) which will strip out non-defined content from the domain layer.

OpenAPI-nodegen will generate an object map and pass this along with the domain output to the above function. 


## Domain Layer
Much the same as most openapi generators, the domain layer's method names are mapped to the paths operation id.

### Domain layer api token
By default each domain method will receive the current users access token should the corresponding route contain a security definition. For details on security visit this page: [security](./security-definitions.md)

### Passing the request variables from the router to the domain
In case some of your domain methods need to access the entire request object; you can easily do this by adding the following to the desired route in your OpenAPI file, `x-passRequest: true` for example:

```
/pets:
get:
  summary: List all pets
  operationId: listPets
  tags:
    - pets
  parameters:
    - name: limit
      in: query
      description: How many items to return at one time (max 100)
      required: false
      type: integer
      format: int32
  responses:
    "200":
      description: A paged array of pets
      headers:
        x-next:
          type: string
          description: A link to the next page of responses
      schema:
        $ref: '#/definitions/Pets'
  x-passRequest: true        
```
