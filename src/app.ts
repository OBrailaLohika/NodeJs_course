import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import {logErrorMsg, logInfoMsg} from './utils/logger/logActions';

const db = require('./db')
import movieRouter from './routes/movie-router';

import type { ErrorRequestHandler } from "express";
import { API_PORT, HOST, HTTP_SERVER_ERROR } from './constants';

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if(res.headersSent) {
    return next(err);
  }

  return res.status(err.status || HTTP_SERVER_ERROR).render('500');
};


const app = express();

app.use(bodyParser.urlencoded({extended: true}))
app.use(cors());
app.use(bodyParser.json());

db.on('error', () => logErrorMsg('MongoDB connection error:', true))

db.once("open", () => {
    logInfoMsg("Database connection successful", true);
})

app.get('/', (req, res) => {
  res.send('hello, world!')
})

app.use('/apiV1', movieRouter)

app.use(errorHandler)

app.listen(API_PORT, () => {
  logInfoMsg(`Server started and running on http://${HOST}:${API_PORT}`, true);
  }
)
