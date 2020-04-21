'use strict';
const Controller = require('egg').Controller;

class CodeController extends Controller {

  // 发送验证码
  async send() {
    const { ctx } = this;
    ctx.validate({
      type: { type: 'string' },
      email: { type: 'email' },
    });
    const data = await ctx.service.code.create(ctx.request.body);
    if (typeof data === 'string') {
      await this.app.nodemailer.sendMail({
        from: this.config.nodemailerFrom,
        to: ctx.request.body.email,
        subject: `${ctx.request.body.type}验证码`,
        text: `本次验证码：${data}，有效时间5分钟。`,
      });
      await ctx.handler();
      return;
    }
    await ctx.handler(data);
  }
}

module.exports = CodeController;
