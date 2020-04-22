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

  // 查询单个地址详情
  async detail(opts = {}) {
    const { ctx } = this;
    const { _id } = opts;
    const userId = ctx.user._id;
    const address = await ctx.model.Address.findOne({ _id, userId });
    if (!address) {
      return new Error('地址不存在')
    }
    return address;
  }

  // 编辑地址
  async edit(opts = {}) {
    const { ctx } = this;
    const { _id, modify } = opts;
    const userId = ctx.user._id;
    const address = await ctx.model.Address.findOne({ _id, userId });
    if (!address) {
      return new Error('地址不存在');
    }

    await address.updateOne({ $set: modify });
    if (modify.isDefault) {
      await address.setDefault()
    }
  }
}

module.exports = AddressService;
