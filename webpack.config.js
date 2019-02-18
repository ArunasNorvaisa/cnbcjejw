const devConfig = require('./webpack.dev.config.js');
const prodConfig = require('./webpack.prod.config.js');

const config = () => {
  switch (process.env.NODE_ENV) {
    case 'dev':
      return devConfig;
    case 'prod':
      return prodConfig;
    default:
      throw new Error(`Incorrect NODE_ENV variable: ${process.env.NODE_ENV}`);
  }
};

module.exports = config();
