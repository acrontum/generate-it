## Requirements
- Node 12 LTS
- Linux/Mac/Windows
- Git
  - Without git you cannot fetch the templates.

## Setting up and downloading
A package json file:
```
npm init
```

The [openapi-nodegen core](npmjs.com/package/openapi-nodegen) should be installed as a as a local devDependency:
```
npm i --save-dev openapi-nodegen
```

After installation of the core you will need to decide on what you want to build, a server or client. 
Currently there is a lot of activity on the [openapi-nodegen-typescript-server](https://github.com/acrontum/openapi-nodegen-typescript-server) which generates a NodeJS server running express written in TypeScript.

After installing, add a build script to your `package.json` file with the relevant [arguments](/_pages/cli.md):
```
"scripts": {
    "generate:nodegen": "openapi-nodegen ./openapi.yml -t https://github.com/acrontum/openapi-nodegen-typescript-server.git",
}
```

> make sure you change the "./openapi.yml" to a path that matches your environment.

For simple spec files it generally takes about 1-5 seconds to generate. For more complex API files, up to 30 seconds, where the bulk of the time bottleneck is around the interface content generation. This is aimed to be fixed soon.
