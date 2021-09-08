# social-network-server-2021

## Navigation

- [Available Scripts](#available-scripts)
- [API Reference](#api-reference)
  - [HTTP Call Type](#http-call-type)
  - [Status Code](#status-code)
  - [Middlewares](#middlewares)
  - [Authentication Model](#authentication-model)
  - [Summary](#api-summary)
- [Database](#database)

## Available Scripts

### `npm run prod`

### `npm run dev`


## API Reference

- HTTP based API
- Architectural style: REST
- suppoted request formats: JSON, Query Params
- suppoted response formats: JSON

### HTTP Call Type

- GET
- POST
- PUT
- DELETE

### Status Code

| Code  | Description   |
| ----- | ------------- |
| 200   | OK            |
| 400   | Bad Request   |
| 401   | Unauthorized  |
| 403   | Forbidden     |
| 404   | Not Found     |
| 500   | Internal      |

### Middlewares

| Error       | Middleware              |
| ----------- | ----------------------- |
| API Error   | errorHandlingMiddleware |

### Authentication Model

TODO

### API Summary

full methods documentation: [API.md](https://github.com/lina994/social-network-server-2021/blob/master/documentation/API.md)


| URL        | Method    | Input             | Output                        |
| ---------- | --------- | ----------------- | ----------------------------- |
| /people    | get       | count, page       | JSON object - array of users  |


## Database

![Database](https://github.com/lina994/social-network-server-2021/blob/master/documentation/db_sn.png?raw=true "Database")