'use strict';
const Controller = require('egg').Controller;

class AddressController extends Controller {

  // 新增地址
  async add() {
    const { ctx } = this;
    ctx.validate({
      name: { type: 'string' },
      phone: { type: 'phone' },
      city: {
        type: 'array',
        itemType: 'string',
        min: 1,
      },
      address: { type: 'string' },
      isDefault: {
        type: 'bool',
        required: false,
        default: false,
      },
      userId: { type: 'string' },
    });
    await ctx.handler(await ctx.service.address.add(ctx.request.body));
  }

  // 用户的地址列表
  async list() {
    const { ctx } = this;
    await ctx.handler(await ctx.service.address.list());
  }

  // 查询单个地址详情
  async detail() {
    const { ctx } = this;
    ctx.validate({ _id: { type: 'string' } });
    await ctx.handler(await ctx.service.address.detail(ctx.request.body));
  }

  // 编辑地址
  async edit() {
    const { ctx } = this;
    ctx.validate({
      _id: { type: 'string' },
      modify: {
        type: 'object',
        rules: {
          name: { type: 'string', required: false },
          phone: { type: 'phone', required: false },
          city: { type: 'array', itemType: 'string', required: false },
          address: { type: 'string', required: false },
          isDefault: { type: 'bool', required: false },
        },
      },
    });
    await ctx.handler(await ctx.service.address.edit(ctx.request.body));
  }

  // 删除地址
  async remove() {
    const { ctx } = this;
    ctx.validate({ _id: { type: 'string' } });
    await ctx.handler(await ctx.service.address.remove(ctx.request.body));
  }
}

module.exports = AddressController;
