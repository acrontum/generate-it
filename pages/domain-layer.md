## Domain Layer

Much the same as most openapi generators, the domain layer's method names are mapped to the paths operation id.

#### Domain layer api token
By default each domain method will receive the current users access token should the corresponding route contain a security definition. For details on security visit this page: [security](./security-definitions.md)

#### Passing the request variables from the router to the domain
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
