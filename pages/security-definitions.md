## Security

#### Avoiding overwriting previously written changes
When trying to generate a server on top of a previously generated server, you need to take into account that all the files
inside `src/http/nodegen` are going to be overwritten.
If you are interested in creating a custom middleware, please make sure to place it outside `src/http/nodegen`, and use the `middlewaresImporter.js` (which is not going to be overwritten) to import it.

#### Usage of security definitions combined with middlewares
In addition to routes, controllers, transformers, and validators, the Nodegen also generates a few middlewares that you would most likely like to use in case you wanna protect some of yours routes with an `API key` / `JWT token`.
To help the Nodegen understanding which security definitions are API keys and which are JWT tokens, you will need to give them one of the following names `apiKeyX` / `jwtTokenX` (the X can be replaced with any other character).
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
