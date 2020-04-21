'use strict';
/** @param {Egg.EggAppInfo} appInfo */
module.exports = appInfo => {
  /** @type {Egg.EggAppConfig} */
  const config = exports = {};

  config.development = {
    watchDirs: ['libs'],
  };

  return config;
};