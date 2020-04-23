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

  // 管理员查看订单列表
  async list(opts = {}) {
    const { ctx } = this;
    const { page, pagesize } = opts;
    const data = await ctx.model.Order.find()
      .populate('userId', '_id email nickName')
      .populate('productSnapShot.thumbnail', 'fileName src')
      .skip((page - 1) * pagesize)
      .limit(pagesize)
      .sort({ createdAt: -1 });
    const total = await ctx.model.Order.countDocuments();
    const list = data.map(item => {
      const order = item.toObject();
      order.status = item.status;
      order.productSnapShot.thumbnail = item.productSnapShot.thumbnail && item.productSnapShot.thumbnail.src;
      return order;
    });
    return { page, pagesize, list, total };
  }

  // 管理员关闭订单
  async close(opts = {}) {
    const { ctx } = this;
    const { _id } = opts;
    const order = await ctx.model.Order.findOne({
      _id,
      timeClosed: { $exists: false },
    });

    if (!order) {
      return new Error('订单不存在或已关闭');
    }

    await order.updateOne({
      $set: {
        timeClosed: new Date(),
      },
    });
    ctx.logger.info('关闭订单：[%s]', order.cornet);
  }

  // 用户查询订单列表
  async search(opts = {}) {
    const { ctx } = this;
    const { page, pagesize, filter } = opts;
    const userId = ctx.user._id;
    const query = Object.assign({ userId }, filter);
    const data = await ctx.model.Order.find(query)
      .populate('userId', '_id email nickName')
      .populate('productSnapShot.thumbnail', 'fileName src')
      .skip((page - 1) * pagesize)
      .limit(pagesize)
      .sort({ createdAt: -1 });
    const total = await ctx.model.Order.countDocuments(query);
    const list = data.map(item => {
      const order = item.toObject();
      order.status = item.status;
      order.productSnapShot.thumbnail = item.productSnapShot.thumbnail && item.productSnapShot.thumbnail.src;
      return order;
    });
    return { page, pagesize, list, total };
  }

  // 用户删除订单
  async remove(opts = {}) {
    const { ctx } = this;
    const { _id } = opts;
    const userId = ctx.user._id;
    const order = await ctx.model.Order.findOne({
      _id,
      userId,
      timeClosed: { $exists: true },
    });
    if (!order) {
      return new Error('订单不存在或未关闭');
    }
    await order.remove();
  }

  // 用户取消订单
  async cancel(opts = {}) {
    const { ctx } = this;
    const { _id } = opts;
    const userId = ctx.user._id;
    const order = await ctx.model.Order.findOne({ _id, userId });
    if (!order) {
      return new Error('订单不存在');
    }
    if (order.timeClosed) {
      return new Error('订单已关闭');
    }
    if (order.timePayed) {
      return new Error('暂不支持关闭已支付订单');
    }
    await order.updateOne({
      $set: {
        timeClosed: new Date(),
      },
    });
  }
}

module.exports = OrderService;
