# social-network-server-2021

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

### Supported API methods

#### /people

Method: 
- get

Input:
- count (Query Param, default: 20)  
- page (Query Param, default: 1)

Example:  
http://localhost:3001/api/people?count=25&page=2

Output:
JSON object
- Array of objects
- Object fields: 
  - id (integer)
  - email (string)
  - password (string)
  - role (string)
  - isActive (boolean)
  - lastLogin (DATETIME)
  - accountStatus (string)
  - firstName (string)
  - lastName (string)
  - imgUrl (string)
  - intro (string)
  - country (string)
  - city (string)
  - gender (string)
  - createdAt (DATETIME)
  - updatedAt (DATETIME)

### Summary

| URL        | Method    | Input             | Output                        |
| ---------- | --------- | ----------------- | ----------------------------- |
| /people    | get       | count, page       | JSON object - array of users  |
| /people    | post      | TODO              | TODO                          |
| /people    | delete    | TODO              | TODO                          |
