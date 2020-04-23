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

  // 管理员查询订单列表
  async list() {
    const { ctx } = this;
    ctx.validate({
      page: { type: 'int', min: 1, required: false, default: 1 },
      pagesize: { type: 'int', mix: 1, required: false, default: 10 },
    });
    await ctx.handler(await ctx.service.order.list(ctx.request.body));
  }

  // 管理员关闭订单
  async close() {
    const { ctx } = this;
    ctx.validate({
      _id: { type: 'string' },
    });
    await ctx.handler(await ctx.service.order.close(ctx.request.body));
  }

  // 用户查询订单列表
  async search() {
    const { ctx } = this;
    ctx.validate({
      page: { type: 'int', min: 1, required: false, default: 1 },
      pagesize: { type: 'int', min: 1, required: false, default: 10 },
      filter: { type: 'object', required: false, default: {} },
    });
    await ctx.handler(await ctx.service.order.search(ctx.request.body));
  }

  // 用户删除订单
  async remove() {
    const { ctx } = this;
    ctx.validate({ _id: { type: 'string' } });
    await ctx.handler(await ctx.service.order.remove(ctx.request.body));
  }

  // 用户取消订单
  async cancel() {
    const { ctx } = this;
    ctx.validate({ _id: { type: 'string'} });
    await ctx.handler(await ctx.service.order.cancel(ctx.request.body));
  }
}

module.exports = OrderController;
