'use strict';
const Controller = require('egg').Controller;

class UserController extends Controller {

  async createAdmin() {
    const { ctx } = this;
    ctx.validate({
      email: { type: 'email' },
      nickName: { type: 'string' },
      password: { type: 'string' },
    });
    ctx.handler(await ctx.service.user.create({
      ...ctx.request.body,
      role: this.config.userRole.ADMINISTRATOR,
    }), {
      redirectUrl: '/admin',
    });
  }

  async login() {
    const { ctx } = this;
    ctx.validate({
      email: { type: 'email' },
      password: { type: 'string' },
    });
    ctx.handler(await ctx.service.user.login(ctx.request.body))
  }

  // 普通用户注册
  async regist() {
    const { ctx } = this;
    ctx.validate({
      email: { type: 'qqEmail' },
      password: { type: 'string' },
      code: { type: 'string', min: 6, max: 6 },
    });
    await ctx.handler(await ctx.service.user.regist(ctx.request.body));
  }

  // 游客登录
  async youkeLogin() {
    const { ctx } = this;
    await ctx.handler(await ctx.service.user.youkeLogin());
  }
}

module.exports = UserController;
