import http from 'http';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import initializeDb from './db';
import middleware from './middleware';
import api from './api';
import routes from './routes';
import config from './config.json';
import mongoose from 'mongoose';
import path from 'path';
import basicAuth from 'basic-auth';

let app = express();
app.server = http.createServer(app);

// 3rd party middleware
app.use(cors({
	exposedHeaders: config.corsHeaders
}));

// var auth = function (req, res, next) {
//   function unauthorized(res) {
//     res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
//     return res.sendStatus(401);
//   };
//
//   var user = basicAuth(req);
//
//   if (!user || !user.name || !user.pass) {
//     return unauthorized(res);
//   };
//
//   if (user.name === 'foo' && user.pass === 'bar') {
//     return next();
//   } else {
//     return unauthorized(res);
//   };
// };
//
// app.use('/', auth, routes);

app.use(bodyParser.json({
	limit : config.bodyLimit
}));

app.use(morgan('dev')) // switch to 'combined' for standard output



app.use(express.static(__dirname + '/../node_modules')); // client-side frameworks
app.use(express.static(__dirname + '/../bower_components'));
app.use(express.static(__dirname + '/public')); // HTML, CSS

// connect to db
initializeDb( db => {

	// internal middleware
	app.use(middleware({ config, db }));

	// api router

	app.use('/api', api({ db }));

	app.server.listen(process.env.PORT || config.port);

	console.log(`Started on port ${app.server.address().port}`);
});

export default app;
