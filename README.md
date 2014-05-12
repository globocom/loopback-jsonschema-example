# Loopback JSON Schema Example

Adds JSON Schema support to [LoopBack](https://github.com/strongloop/loopback).


### Configuring a DataSource

Add a `loopbackJsonSchemaDb` entry to the `datasources.json` file with your data source configuration if you want to use any database. If no `loopbackJsonSchemaDb` entry is found, we fallback to using the default memory data source.


```
  "loopbackJsonSchemaDb": {
    "connector": "loopback-connector-mongodb",
    "url": "mongodb://127.0.0.1:27017/your-database",
    "debug": true
  }
```
## Using

### Instaling

```
make setup
make run
```

### Dynamically defining Loopback models from a JSON Schema


```
make post_schema
make create_person
```

```
# Retrieve a created Person object
curl -i -XGET -H "Content-Type: application/json" http://localhost:5000/api/people/{id}
```

## Disclaimer

This is just a simple Loopback app using [loopback-jsonschema](https://github.com/globocom/loopback-jsonschema) module (there're no tests here). Do not use this app in production!

## References

https://github.com/globocom/loopback-jsonschema

http://json-schema.org/
