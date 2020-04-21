'use strict';
const Service = require('egg').Service;

class AddressService extends Service {

  // 添加地址
  async add(opts = {}) {
    const { ctx } = this;
    const { userId, name, phone, city, address, isDefault } = opts;

    const item = await ctx.model.Address.create({
      name,
      phone,
      city,
      address,
      userId,
    });

    if (isDefault) {
      await item.setDefault()
    }
  }

  // 地址列表
  async list() {
    const { ctx } = this;
    const userId = ctx.user._id;
    const list = await ctx.model.Address.find({ userId }).sort({ createdAt: -1 });
    return list;
  }
}

module.exports = AddressService;
