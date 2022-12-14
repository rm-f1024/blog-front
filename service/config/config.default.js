/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {

  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};
 
   
 
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1647697854675_3368';

  // add your middleware config here
  config.middleware = [
  ];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };
  config.mysql = {
    // database configuration
    client: {
      // host
      host: 'localhost',
      // port
      port: '3306',
      // username
      user: 'root',
      // password
      password: '123456',
      // database
      database: 'blog',    
    },
    // load into app, default is open
    app: true,
    // load into agent, default is close
    agent: false,
  };
  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true
    
    },
    domainWhiteList:['http://localhost:2000',
    'http://localhost:3000',
    'http://localhost:7001',
    
  ]//[]中放放出的白名单，*代表所有
  };
  
  config.cookies= {
    sameSite: 'none',
  }
  config.cors = {
    // origin:'*',
    credentials: true,  //允许Cook可以跨域
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
  };
  return {
    ...config,
    ...userConfig,
  };
};
