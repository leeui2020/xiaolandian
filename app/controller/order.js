'use strict';
const Controller = require('egg').Controller;

class OrderController extends Controller {

  // 用户创建订单
  async create() {
    const { ctx } = this;
    ctx.validate({
      productId: { type: 'string' },
      addressId: { type: 'string' },
      count: { type: 'int', min: 1 },
    });
    await ctx.handler(await ctx.service.order.create(ctx.request.body));
  }
}

module.exports = OrderController;
