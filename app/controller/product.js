'use strict';
const Controller = require('egg').Controller;

class ProductController extends Controller {

  // 添加产品
  async add() {
    const { ctx } = this;
    ctx.validate({
      name: { type: 'string' },
      price: { type: 'int', min: 0 },
      thumbnail: { type: 'string', required: false },
    });
    await ctx.handler(await ctx.service.product.add(ctx.request.body));
  }

  // 产品列表
  async list() {
    const { ctx } = this;
    ctx.validate({
      page: { type: 'int', min: 1, required: false, default: 1 },
      pagesize: { type: 'int', min: 1, required: false, default: 10 },
    });
    await ctx.handler(await ctx.service.product.list(ctx.request.body));
  }

  // 删除产品
  async remove() {
    const { ctx } = this;
    ctx.validate({
      products: {
        type: 'array',
        itemType: 'string',
        min: 1,
      },
    });
    await ctx.handler(await ctx.service.product.remove(ctx.request.body.products));
  }

  // 编辑产品
  async update() {
    const { ctx } = this;
    ctx.validate({
      _id: { type: 'string' },
      modify: {
        type: 'object',
        rule: {
          name: { type: 'string', required: false },
          price: { type: 'int', min: 0, required: false },
          thumbnail: { type: 'string', required: false },
        },
      },
    });
    await ctx.handler(await ctx.service.product.update(ctx.request.body));
  }

  // 产品详情
  async detail() {
    const { ctx } = this;
    ctx.validate({
      _id: { type: 'string' },
    });
    await ctx.handler(await ctx.service.product.detail(ctx.request.body));
  }
}

module.exports = ProductController;
