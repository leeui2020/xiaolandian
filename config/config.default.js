'use strict';
const path = require('path');

/** @param {Egg.EggAppInfo} appInfo */
module.exports = appInfo => {
  /** @type {Egg.EggAppConfig} */
  const config = exports = {};
  config.keys = appInfo.name + '_1587230493533_5413';
  config.middleware = ['install'];

  config.static = {
    prefix: '/',
  };

  config.security = {
    csrf: false,
  };

  config.cluster = {
    listen: {
      port: 20203,
    },
  };

  config.cors = {
    origin: '*',
    allowMethods: 'GET,POST,PUT,DELETE,PATCH',
  };

  config.mongoose = {
    url: 'mongodb://localhost:27017/DATABASE_QIANMIANDAN_V1',
    options: { useUnifiedTopology: true },
  };

  config.view = {
    mapping: {
      '.ejs': 'ejs',
    },
  };
  
  config.userRole = {
    NORMAL: 'NORMAL',
    EDITOR: 'EDITOR',
    ADMINISTRATOR: 'ADMINISTRATOR',
    YOUKE: 'YOUKE',
  };

  config.install = {
    ignore: [
      '/user/createAdmin',
    ],
  };

  config.redis = {
    client: {
      port: 6379,
      host: '127.0.0.1',
      password: '123456',
      db: 0,
    },
  };

  config.multipart = {
    mode: 'file',
    tmpdir: path.join(appInfo.baseDir, 'egg-multipart-tmp'),
    fileSize: '2mb',
    whitelist: ['.jpg', '.jpeg', '.png'],
    cleanSchedule: {
      cron: '0 30 4 * * *',
    },
  };

  config.mediaDir = path.join(appInfo.baseDir, 'app/public/media');
  config.siteDoname = 'http://localhost:20203/';

  config.nodemailer = {
    host: 'smtp.sina.com',
    port: 465,
    secureConnection: true,
    auth: {
      user: 'game_saolei@sina.com',
      pass: '8d8f1bf03c048db5',
    },
  };
  config.nodemailerFrom = '小蓝店<game_saolei@sina.com>';

  // 优惠券类型
  config.youhuiquanTypes = {
    ZHEKOU: 'zhekou',
    MANJIAN: 'manjian',
  };
  return config;
};
