# OpenAPI Nodegen

Automate the donkey work of manually typing out a server's routes, validation and output transformers more than once.

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

    -V, --version                           output the version number
    -m, --mocked                            If passed, the domains will be configured to return dummy content.
    -o, --output <outputDir>                directory where to put the generated files (defaults to current directory) (default: /home/carmichael/code/open-source-projects/openapi-nodegen)
    -t, --template <template>               template to use (es6 or typescript [typescript is currently not working]) (default: es6)
    -i, --ignored-modules <ignoredModules>  ignore the following type of modules (routes, controllers, domains, validators, transformers) in case they already exist (separated by commas)
    -h, --help                              output usage informati
```

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


## Roadmap
- [x] Make the mock generators more intelligent, instead of "dumb" random text responses return "testable" content.
- [x] Ensure this package can be used for oa3 files, currently the block is on the generation of the celebrate validation layer, not a big issue to resolve but in oa3 everything is pretty much in a schema block in the request parameters which is a breaking change from oa2.
- [ ] Add docker ability to both es6 and ts templates.
- [x] Update the Typescript templates to use Nunjucks over moustache. They are currently 100% broken awaiting the port over.
- [ ] Convert the mock generators to the typescript tpl.
- [ ] Optionally add in socket connections via vli args.
- [ ] Optionally add in mongoose via cli args.
