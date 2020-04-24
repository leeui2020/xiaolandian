'use strict';
const Controller = require('egg').Controller;

class PaycodeController extends Controller {

  // 新增支付二维码
  async add() {
    const { ctx } = this;
    ctx.validate({
      title: { type: 'string' },
      email: { type: 'email' },
      qrcode: { type: 'string' },
    });
    await ctx.handler(await ctx.service.paycode.add(ctx.request.body));
  }
}

module.exports = PaycodeController;
