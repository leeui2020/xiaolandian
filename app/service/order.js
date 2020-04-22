'use strict';
const Service = require('egg').Service;

class OrderService extends Service {

  // 用户提交订单
  async create(opts = {}) {
    const { ctx } = this;
    const { productId, count, addressId } = opts;
    const userId = ctx.user._id;
    const product = await ctx.model.Product.findOne({ _id: productId });
    const address = await ctx.model.Address.findOne({ userId, _id: addressId });

    if (!product || !address) {
      return new Error('创建订单失败');
    }

    const no = await ctx.model.Order.genNo(userId);
    const cornet = await ctx.model.Order.genCornet();
    const totalFee = count * product.price;
    const order = await ctx.model.Order.create({
      no,
      cornet,
      userId,
      productId: product._id,
      addressId: address._id,
      productSnapShot: {
        name: product.name,
        price: product.price,
        thumbnail: product.thumbnail,
      },
      addressSnapShot: {
        name: address.name,
        phone: address.phone,
        city: address.city,
        address: address.address,
      },
      count,
      totalFee, 
      priceSum: count * product.price,
    });
    ctx.logger.info('创建了订单 %j', order);
    return { no, cornet };
  }
}

module.exports = OrderService;
