import { logErrorMsg } from "../utils/logger/logActions";

const mongoose = require('mongoose');

mongoose
  .connect('mongodb://127.0.0.1:27017/movies', {useNewUrlParser: true})
  .catch((e: Error) => {
    logErrorMsg(e.message, true);
  });
  const db = mongoose.connection

  module.exports = db;