"use strict";
exports.__esModule = true;
var jsonServer = require("json-server");
var fs = require("fs");
var https = require("https");
var path = require("path");
var auth_1 = require("./auth");
var authz_1 = require("./authz");
var http = require("http");
var server = jsonServer.create();
var router = jsonServer.router(path.join(__dirname, '/../db.json'));
var middlewares = jsonServer.defaults();
// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);
// Add custom routes before JSON Server router
// server.get('/echo', (req, res) => {
//   res.jsonp(req.query)
// })
// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser);
server.post('/login', auth_1.handleAuthentication);
server.use('/users', authz_1.handleAuthorization);
// server.use((req, res, next) => {
//   if (req.method === 'POST') {
//     req.body.createdAt = Date.now()
//   }
//   // Continue to JSON Server router
//   next()
// })
// Use default router
server.use(router);
var enableSSL = false;
if (enableSSL) {
    var options = {
        cert: fs.readFileSync(path.join(__dirname, '/../keys/cert.pem')),
        key: fs.readFileSync(path.join(__dirname, '/../keys/key.pem'))
    };
    https.createServer(options, server).listen(3001, function () {
        console.log('JSON Server is running with SSL on https://localhost:3001');
    });
}
else {
    http.createServer({}, server).listen(3001, function () {
        console.log('JSON Server is running on http://localhost:3001');
    });
}
