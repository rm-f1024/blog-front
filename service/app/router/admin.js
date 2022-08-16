'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  let adminauth = app.middleware.adminauth()
  const baseUrl = '/api/admin'
  router.get(`${baseUrl}/index`, controller.admin.home.index);
  router.post(`${baseUrl}/checkLogin`, controller.admin.home.checkLogin);
  router.get(`${baseUrl}/type`, controller.admin.home.type);
  router.post(`${baseUrl}/article`, adminauth, controller.admin.home.addArticle);
  router.get(`${baseUrl}/article`, adminauth, controller.admin.home.getArticle);
  router.get(`${baseUrl}/article/:article_id`, adminauth, controller.admin.home.getArticleById);
  router.get(`${baseUrl}/allarticle`, adminauth, controller.admin.home.getAllArticle);
  router.put(`${baseUrl}/article`, adminauth, controller.admin.home.updateArticle);
  router.patch(`${baseUrl}/article`, adminauth, controller.admin.home.publishArticle);
  router.delete(`${baseUrl}/article/:id`, adminauth, controller.admin.home.deleteArticle);
};
