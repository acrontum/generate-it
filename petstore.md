```json
{
  "swagger": "2.0",
  "info": {
    "version": "1.0.0",
    "title": "openapi-nodegen-swagger-yml-example",
    "description": "A sample API",
    "contact": {
      "name": "Swagger API Team",
      "email": "john@boats.io",
      "url": "https://github.com/johndcarmichael/boats/"
    },
    "license": {
      "name": "Apache 2.0",
      "url": "https://www.apache.org/licenses/LICENSE-2.0.html"
    }
  },
  "host": "api.example.com",
  "basePath": "/v1",
  "schemes": [
    "https"
  ],
  "tags": [
    {
      "name": "weather",
      "description": "Weather data"
    }
  ],
  "paths": {
    "/weather/": {
      "get": {
        "tags": [
          "weather"
        ],
        "summary": "weather data",
        "description": "Get the latest temperatures",
        "operationId": "v1WeatherGet",
        "parameters": [
          {
            "in": "query",
            "name": "limit",
            "required": false,
            "type": "integer",
            "description": "Will limit the result count returned"
          },
          {
            "in": "query",
            "name": "offset",
            "required": false,
            "type": "integer",
            "description": "The number of items to skip before starting to collect the result set."
          }
        ],
        "responses": {
          "200": {
            "description": "Successful fetch",
            "schema": {
              "properties": {
                "meta": {
                  "properties": {
                    "totalResultCount": {
                      "type": "number"
                    },
                    "offset": {
                      "type": "number"
                    },
                    "limit": {
                      "type": "number"
                    }
                  }
                },
                "data": {
                  "type": "array",
                  "items": {
                    "type": "object",
                    "properties": {
                      "id": {
                        "type": "number"
                      },
                      "date": {
                        "type": "string",
                        "format": "date"
                      },
                      "location": {
                        "type": "string"
                      },
                      "cloudCoverPercentage": {
                        "type": "number"
                      },
                      "humidityPercentage": {
                        "type": "number"
                      },
                      "temperature": {
                        "type": "number"
                      }
                    }
                  }
                }
              }
            }
          },
          "404": {
            "description": "Temp not found"
          }
        },
        "x-request-definitions": {
          "query": {
            "name": "WeatherGetQuery",
            "params": [
              "parameters.queryOffset",
              "parameters.queryLimit"
            ],
            "interfaceText": "limit?:number,offset?:number,"
          }
        },
        "x-response-definitions": {
          "200": "Weathers"
        }
      },
      "post": {
        "tags": [
          "weather"
        ],
        "summary": "weather data",
        "description": "Create a new weather record.",
        "operationId": "v1WeatherPost",
        "parameters": [
          {
            "in": "body",
            "name": "v1WeatherPost",
            "description": "Optional description in *Markdown*",
            "required": true,
            "schema": {
              "type": "object",
              "properties": {
                "date": {
                  "type": "string",
                  "format": "date"
                },
                "location": {
                  "type": "string"
                },
                "cloudCoverPercentage": {
                  "type": "number"
                },
                "humidityPercentage": {
                  "type": "number"
                },
                "temperature": {
                  "type": "number"
                }
              }
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful temp creation",
            "schema": {
              "type": "object",
              "properties": {
                "id": {
                  "type": "number"
                },
                "date": {
                  "type": "string",
                  "format": "date"
                },
                "location": {
                  "type": "string"
                },
                "cloudCoverPercentage": {
                  "type": "number"
                },
                "humidityPercentage": {
                  "type": "number"
                },
                "temperature": {
                  "type": "number"
                }
              }
            }
          },
          "422": {
            "description": "Invalid form data provided"
          }
        },
        "x-request-definitions": {
          "body": {
            "name": "WeatherPostBody",
            "params": [
              "definitions.WeatherPost"
            ],
            "interfaceName": "WeatherPost",
            "interfaceText": ""
          }
        },
        "x-response-definitions": {
          "200": "Weather"
        }
      }
    },
    "/weather/{id}": {
      "get": {
        "tags": [
          "weather"
        ],
        "summary": "weather data",
        "description": "Get the latest temperatures",
        "operationId": "v1WeatherIdGet",
        "produces": [
          "application/json"
        ],
        "parameters": [
          {
            "in": "path",
            "name": "id",
            "type": "integer",
            "required": true,
            "description": "Numeric ID of object to fetch"
          }
        ],
        "responses": {
          "200": {
            "description": "Successful fetch",
            "schema": {
              "type": "object",
              "properties": {
                "id": {
                  "type": "number"
                },
                "date": {
                  "type": "string",
                  "format": "date"
                },
                "location": {
                  "type": "string"
                },
                "cloudCoverPercentage": {
                  "type": "number"
                },
                "humidityPercentage": {
                  "type": "number"
                },
                "temperature": {
                  "type": "number"
                }
              }
            }
          },
          "404": {
            "description": "Temp not found"
          }
        },
        "x-request-definitions": {
          "path": {
            "name": "WeatherIdGetPath",
            "params": [
              "parameters.pathId"
            ],
            "interfaceText": "id:number,"
          }
        },
        "x-response-definitions": {
          "200": "Weather"
        }
      },
      "put": {
        "tags": [
          "weather"
        ],
        "summary": "weather data",
        "description": "Create a new weather record.",
        "operationId": "v1WeatherIdPut",
        "produces": [
          "application/json"
        ],
        "parameters": [
          {
            "in": "path",
            "name": "id",
            "type": "integer",
            "required": true,
            "description": "Numeric ID of object to fetch"
          },
          {
            "in": "body",
            "name": "v1WeatherIdPut",
            "description": "Optional description in *Markdown*",
            "required": true,
            "schema": {
              "allOf": [
                {
                  "type": "object",
                  "properties": {
                    "date": {
                      "type": "string",
                      "format": "date"
                    },
                    "location": {
                      "type": "string"
                    },
                    "cloudCoverPercentage": {
                      "type": "number"
                    },
                    "humidityPercentage": {
                      "type": "number"
                    },
                    "temperature": {
                      "type": "number"
                    }
                  }
                },
                {
                  "type": "object",
                  "properties": {
                    "id": {
                      "type": "integer"
                    }
                  }
                }
              ]
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful temp creation",
            "schema": {
              "type": "object",
              "properties": {
                "id": {
                  "type": "number"
                },
                "date": {
                  "type": "string",
                  "format": "date"
                },
                "location": {
                  "type": "string"
                },
                "cloudCoverPercentage": {
                  "type": "number"
                },
                "humidityPercentage": {
                  "type": "number"
                },
                "temperature": {
                  "type": "number"
                }
              }
            }
          },
          "422": {
            "description": "Invalid form data provided"
          }
        },
        "x-request-definitions": {
          "body": {
            "name": "WeatherIdPutBody",
            "params": [
              "definitions.WeatherPut"
            ],
            "interfaceName": "WeatherPut",
            "interfaceText": ""
          },
          "path": {
            "name": "WeatherIdPutPath",
            "params": [
              "parameters.pathId"
            ],
            "interfaceText": "id:number,"
          }
        },
        "x-response-definitions": {
          "200": "Weather"
        }
      }
    }
  },
  "parameters": {
    "queryLimit": {
      "in": "query",
      "name": "offset",
      "required": false,
      "type": "integer",
      "description": "The number of items to skip before starting to collect the result set."
    },
    "queryOffset": {
      "in": "query",
      "name": "limit",
      "required": false,
      "type": "integer",
      "description": "Will limit the result count returned"
    },
    "pathId": {
      "in": "path",
      "name": "id",
      "type": "integer",
      "required": true,
      "description": "Numeric ID of object to fetch"
    }
  },
  "definitions": {
    "GenericSearchMeta": {
      "properties": {
        "totalResultCount": {
          "type": "number"
        },
        "offset": {
          "type": "number"
        },
        "limit": {
          "type": "number"
        }
      }
    },
    "Weather": {
      "type": "object",
      "properties": {
        "id": {
          "type": "number"
        },
        "date": {
          "type": "string",
          "format": "date"
        },
        "location": {
          "type": "string"
        },
        "cloudCoverPercentage": {
          "type": "number"
        },
        "humidityPercentage": {
          "type": "number"
        },
        "temperature": {
          "type": "number"
        }
      }
    },
    "Weathers": {
      "properties": {
        "meta": {
          "properties": {
            "totalResultCount": {
              "type": "number"
            },
            "offset": {
              "type": "number"
            },
            "limit": {
              "type": "number"
            }
          }
        },
        "data": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "id": {
                "type": "number"
              },
              "date": {
                "type": "string",
                "format": "date"
              },
              "location": {
                "type": "string"
              },
              "cloudCoverPercentage": {
                "type": "number"
              },
              "humidityPercentage": {
                "type": "number"
              },
              "temperature": {
                "type": "number"
              }
            }
          }
        }
      }
    },
    "WeatherPost": {
      "type": "object",
      "properties": {
        "date": {
          "type": "string",
          "format": "date"
        },
        "location": {
          "type": "string"
        },
        "cloudCoverPercentage": {
          "type": "number"
        },
        "humidityPercentage": {
          "type": "number"
        },
        "temperature": {
          "type": "number"
        }
      }
    },
    "WeatherPut": {
      "allOf": [
        {
          "type": "object",
          "properties": {
            "date": {
              "type": "string",
              "format": "date"
            },
            "location": {
              "type": "string"
            },
            "cloudCoverPercentage": {
              "type": "number"
            },
            "humidityPercentage": {
              "type": "number"
            },
            "temperature": {
              "type": "number"
            }
          }
        },
        {
          "type": "object",
          "properties": {
            "id": {
              "type": "integer"
            }
          }
        }
      ]
    }
  },
  "interfaces": [
    {
      "name": "GenericSearchMeta",
      "content": "undefined;"
    },
    {
      "name": "Weather",
      "content": "id?: number;date?: string;location?: string;cloudCoverPercentage?: number;humidityPercentage?: number;temperature?: number;"
    },
    {
      "name": "WeatherGetQuery",
      "content": "limit?:number,offset?:number,"
    },
    {
      "name": "WeatherIdGetPath",
      "content": "id:number,"
    },
    {
      "name": "WeatherIdPutBody",
      "content": ""
    },
    {
      "name": "WeatherIdPutPath",
      "content": "id:number,"
    },
    {
      "name": "WeatherPost",
      "content": "date?: string;location?: string;cloudCoverPercentage?: number;humidityPercentage?: number;temperature?: number;"
    },
    {
      "name": "WeatherPostBody",
      "content": ""
    },
    {
      "name": "WeatherPut",
      "content": "undefined;"
    },
    {
      "name": "Weathers",
      "content": "undefined;"
    }
  ]
}

```
