'use strict';

/**
 * @param {Egg.Application} app - egg application
 */

// app/router.js
module.exports = (app) => {

   require('./router/default')(app)
   require('./router/admin')(app)
};
