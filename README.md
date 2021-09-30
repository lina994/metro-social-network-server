
<p align="center">
  <img src="https://github.com/lina994/social-network-server-2021/blob/master/documentation/logo-server.svg?raw=true" alt="Logo" width="300"/>
</p>

<h1 align="center">
  Metro Server - Social Network Server
</h1>

<p align="center">
  <img src="https://shields.io/badge/npm-v6.14.10-blue" alt="npm version"/>
  <img src="https://img.shields.io/badge/node-14.15.4-blue" alt="node version"/>
  <img src="https://img.shields.io/badge/MySQL-8.0.26-blue" alt="MySQL version"/>
</p>


## Table of contents

- [Quick Start](#quick-start)
  - [Download Server](#download-server)
  - [Add Environment File](#add-environment-file)  
  - [Available Scripts](#available-scripts)
- [API Reference](#api-reference)
  - [HTTP Call Type](#http-call-type)
  - [Status Code](#status-code)
  - [Middlewares](#middlewares)
  - [Authentication Model](#authentication-model)
  - [API Summary](#api-summary)
- [Database](#database)

## Quick Start

### Download Server

```
git clone https://github.com/lina994/social-network-server-2021.git
cd social-network-server-2021
npm install
```

### Add Environment File

File name: `.env`  
File location: `social-network-server-2021` directory

```
PORT = your_port
DB_NAME = your_db_name
DB_USER = your_db_username
DB_PASSWORD = your_db_password
DB_HOST = your_db_host
DB_PORT = your_db_port
```

### Available Scripts

#### `npm run prod`

#### `npm run dev`

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


| URL                     | Method    |
| ----------------------- | --------- |
| /people                 | get       |
| /friends                | get       |
| /friends                | post      |
| /friends                | delete    |
| /profile                | get       |
| /profile                | put       |
| /profile/img            | put       |
| /conversation           | get       |
| /conversation           | post      |
| /conversation           | delete    |
| /conversation/messages  | get       |
| /conversation/messages  | post      |
| /conversation/messages  | delete    |

## Database

Database: MySQL 8.0.26

![Database](https://github.com/lina994/social-network-server-2021/blob/master/documentation/db_sn.png?raw=true "Database")


