'use strict';
const path = require('path');

exports.cors = {
  enable: true,
  package: 'egg-cors'
};

exports.validate = {
  enable: true,
  package: 'egg-validate',
};

exports.mongoose = {
  enable: true,
  package: 'egg-mongoose',
};

exports.ejs = {
  enable: true,
  package: 'egg-view-ejs',
};

exports.redis = {
  enable: true,
  package: 'egg-redis',
};

// nodemailer
exports.nodemailer = {
  enable: true,
  path: path.resolve(__dirname, '../libs/egg-nodemailer'),
};
