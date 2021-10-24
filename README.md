
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
- [Project Structure](#project-structure)
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
SECRET_KEY = your_secret_key
```

### Available Scripts

#### `npm run prod`

#### `npm run dev`

## Project Structure

![Project structure](https://github.com/lina994/social-network-server-2021/blob/master/documentation/project_structure.png?raw=true "Project structure")

Within the download project you'll find the following directories and files:

```
social-network-server-2021
├── dist-server/
├── documentation/
│   ├── API.md
├── src/
│   ├── controllers/
│   │   ├── conversationController.js
│   │   ├── friendsController.js
│   │   ├── peopleController.js
│   │   ├── profileController.js
│   │   └── userController.js
│   ├── errors/
│   │   └── apiError.js
│   ├── middlewares/
│   │   ├── authMiddleware.js
│   │   ├── errorHandlingMiddleware.js
│   │   └── fileMiddleware.js
│   ├── models/
│   │   └── models.js
│   ├── routes/
│   │   ├── index.js
│   │   ├── conversationRouter.js
│   │   ├── friendsRouter.js
│   │   ├── peopleRouter.js
│   │   ├── profileRouter.js
│   │   └── userRouter.js
│   ├── utils/
│   │   ├── userInfo.js
│   │   └── validation.js
│   ├── app.js
│   └── db.js
├── static/
├── .env
├── .gitignore
├── babel.config.json
├── nodemon.json
└── package.json
```

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

| Middleware     | File name                     |
| -------------- | ----------------------------- |
| API Error      | errorHandlingMiddleware.js    |
| File filter    | fileMiddleware.js             |
| Authorization  | authMiddleware.js             |
| CORS           | app.js: import 'cors' package |

### Authentication Model

JWT (JSON Web Token) package

|                      | Input (required)      | Output     | Description                   |
| -------------------- | --------------------- | -----------|-------------------------------|
| authMiddleware       | JWT token             | req.jwt   | jwt.verify                    |
| /user/registration   | email, password       | JWT token  | bcrypt.hashSync, jwt.sign     |
| /user/login          | email, password       | JWT token  | bcrypt.compareSync, jwt.sign  |
| /user/auth           | Authorization header  | JWT token  | authMiddleware, jwt.sign      |

### API Summary

full methods documentation: [API.md](https://github.com/lina994/social-network-server-2021/blob/master/documentation/API.md)


| URL                     | Method    | Authorization |
| ----------------------- | --------- | ------------- |
| /user/registration      | post      | -             |
| /user/login             | post      | -             |
| /user/auth              | get       | required      |
| /people                 | get       | -             |
| /friends                | get       | -             |
| /friends                | post      | required      |
| /friends                | delete    | required      |
| /profile                | get       | -             |
| /profile                | put       | required      |
| /profile/img            | put       | required      |
| /conversation           | get       | required      |
| /conversation           | post      | required      |
| /conversation           | delete    | required      |
| /conversation/messages  | get       | required      |
| /conversation/messages  | post      | required      |
| /conversation/messages  | delete    | required      |

## Database

Database: MySQL 8.0.26

![Database](https://github.com/lina994/social-network-server-2021/blob/master/documentation/db_sn.png?raw=true "Database")


