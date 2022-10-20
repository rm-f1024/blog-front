'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports =  app => {
  const { router, controller } = app;
  const baseUrl = '/api/default'
  router.get(`${baseUrl}/getArticleList`, controller.default.home.getArticleList);
  router.get(`${baseUrl}/getArticleById/:id`, controller.default.home.getArticleById);
  router.get(`${baseUrl}/getTypeInfo`, controller.default.home.getTypeInfo);
  router.get(`${baseUrl}/getArticleListById/:id`, controller.default.home.getArticleListById); 
  router.get(`${baseUrl}/getGuestIp`, controller.default.home.getGuestIp);
  router.post(`${baseUrl}/addArticleReadById`, controller.default.home.addArticleReadById);  
  router.get(`${baseUrl}/getArticleHot`, controller.default.home.getArticleHot);  
  router.get(`${baseUrl}/getArticleId`, controller.default.home.getArticleId);  
  router.post(`${baseUrl}/addComment`,controller.default.home.addComment); 
  router.get(`${baseUrl}/getAllCommentsByArticleId/:id`,controller.default.home.getAllCommentsByArticleId); 
  router.get(`${baseUrl}/getRandomAvatar/:path`,controller.default.home.getRandomAvatar); 


  
};
