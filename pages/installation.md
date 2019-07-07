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
