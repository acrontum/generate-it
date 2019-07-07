# Validate Input

OpenAPI allows one to very clearly state that the expect input format should and should not be.

Based on this very clear definition, OpenAPI-Nodegen auto-generates [Joi](https://github.com/hapijs/joi) validation syntax for use with [celebrate](https://www.npmjs.com/package/celebrate).

The celebrate package with the generated Joi syntax will:
- Validate the input provided, ensuring the datatypes are as expected.
- Not allow non-declared input to pass the front door; should you pass "email=john@gmail.com" but this is not declared in the OpenAPI file, the celebrate will throw a 422 http status code in response.
