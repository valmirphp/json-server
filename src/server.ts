import {Express} from 'express';
import * as jsonServer from 'json-server';
import * as fs from 'fs';
import * as https from 'https';
import * as path from "path";
import {handleAuthentication} from './auth';
import {handleAuthorization} from './authz';
import * as http from "http";


const server: Express = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, '/../db.json'));
const middlewares = jsonServer.defaults();

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// Add custom routes before JSON Server router
// server.get('/echo', (req, res) => {
//   res.jsonp(req.query)
// })

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser);

server.post('/login', handleAuthentication);
server.use('/users', handleAuthorization);

// server.use((req, res, next) => {
//   if (req.method === 'POST') {
//     req.body.createdAt = Date.now()
//   }
//   // Continue to JSON Server router
//   next()
// })

// Use default router
server.use(router);

const enableSSL = false;

if (enableSSL) {

    const options = {
        cert: fs.readFileSync(path.join(__dirname, '/../keys/cert.pem')),
        key: fs.readFileSync(path.join(__dirname, '/../keys/key.pem'))
    };

    https.createServer(options, server).listen(3001, () => {
        console.log('JSON Server is running with SSL on https://localhost:3001');
    });

} else {

    http.createServer({}, server).listen(3001, () => {
        console.log('JSON Server is running on http://localhost:3001');
    });

}
