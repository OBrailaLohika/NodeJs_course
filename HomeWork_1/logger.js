const config = require('./config');

const {APP_PORT, ENV} = config;

const logger = () =>
  console.log(`Server is listening on port ${APP_PORT}. Env is ${ENV}.`);

  module.exports = {
    logger
  }
