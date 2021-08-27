import express from 'express';
import sequelize from './db'; 
import models from './models/models'

const PORT = process.env.PORT || 3000;
const app = express();

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}!`));
  } catch (e) {
    console.log(e);
  }
}

start();




// "start": "node src/app.js",
// "type": "module",

// import * as http from 'http';
// import * as url from 'url';
// import { parse } from 'querystring';

// import { usersList } from './users.js';

// const hostname = '127.0.0.1';
// const port = 3001; // 8080
// const allow_origin = 'http://localhost:3000';


// let users = usersList;
// // console.log(usersList);
// // console.log('Program run');

// const server = http.createServer((req, res) => {
//   // CORS
//   res.setHeader("Access-Control-Allow-Origin", allow_origin);  // TODO - edit
//   res.setHeader("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH,OPTIONS");  // TODO - edit
  
//   if (req.method == 'GET') {
//     let urlParts = url.parse(req.url, true);
//     // console.log(urlParts.pathname);
//     switch (urlParts.pathname) {
//       case '/users':
//         res.end('its server response - get method - users page');
//         break;
//       default:
//         res.end('its server response - get method - 404 page');
//         break;
//     }
//   }
//   else if (req.method == 'POST') {
//     // let body = '';
//     // req.on('data', chunk => {
//     //   body += chunk.toString();
//     // });
//     // req.on('end', () => {
//     //   console.log(body);
//     //   let params = parse(body);
//     //   console.log(params);
//     // });
//     res.end('its server response - post method');
//   }
//   else {
//     res.end('its server response - unsupported method');
//   }
// });

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });
