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

  // 支付二维码列表
  async list() {
    const { ctx } = this;
    ctx.validate({
      page: { type: 'int', min: 1, required: false, default: 1 },
      pagesize: { type: 'int', min: 1, required: false, default: 10 },
    });
    await ctx.handler(await ctx.service.paycode.list(ctx.request.body));
  }

  // 删除支付二维码
  async remove() {
    const { ctx } = this;
    ctx.validate({
      _id: { type: 'array', itemType: 'string' },
    });
    await ctx.handler(await ctx.service.paycode.remove(ctx.request.body));
  }
}

module.exports = PaycodeController;
