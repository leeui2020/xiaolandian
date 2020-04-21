'use strict';
/** @param {Egg.Application} app */
module.exports = app => {
  const { router, controller } = app;

  const authAdmin = app.middleware.auth({
    roles: [app.config.userRole.ADMINISTRATOR],
  });
  const authYouKe = app.middleware.auth({
    roles: [
      app.config.userRole.YOUKE,
      app.config.userRole.NORMAL,
      app.config.userRole.EDITOR,
      app.config.userRole.ADMINISTRATOR,
    ],
  });

  router.post('/user/createAdmin', controller.user.createAdmin);
  router.post('/user/login', controller.user.login);
  router.post('/user/regist', controller.user.regist);
  router.post('/user/youkeLogin', controller.user.youkeLogin);

  router.post('/media/upload', authAdmin, controller.media.upload);
  router.post('/media/getList', controller.media.getList);
  router.post('/media/remove', authAdmin, controller.media.remove);

  router.post('/product/add', authAdmin, controller.product.add);
  router.post('/product/list', controller.product.list);
  router.post('/product/remove', authAdmin, controller.product.remove);
  router.post('/product/update', authAdmin, controller.product.update);
  router.post('/product/detail', controller.product.detail);

  router.post('/code/send', controller.code.send);

  router.post('/address/add', authYouKe, controller.address.add);
  router.post('/address/list', authYouKe, controller.address.list);

  router.get('/', controller.home.index);
  router.get(/\/admin(\/.+)*/, controller.home.admin);
};