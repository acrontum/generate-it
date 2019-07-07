## Transformers

As in your OpenAPI file you will have already declared quite strictly what to expect in response from the server, OpenAPI-Nodegen takes this information and auto-generates equally as strict output transformers.

Taking the idea from [transformers](https://fractal.thephpleague.com/transformers/) all output is passed through [objectReduceByMap](https://www.npmjs.com/package/object-reduce-by-map) which will strip out non-defined content from the domain layer.
