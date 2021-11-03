const args = process.argv.slice(2);

process.env.PORT = '3000';

config = {
  APP_PORT: process.env.PORT,
  ENV: args[0],
};

module.exports = config;