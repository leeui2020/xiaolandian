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
}

module.exports = AddressController;
