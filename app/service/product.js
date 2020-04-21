'use strict';
const Service = require('egg').Service;

class ProductService extends Service {
  // 添加产品
  async add(opts = {}) {
    const { ctx } = this;
    const { name, thumbnail, price } = opts;
    const product = await ctx.model.Product.create({
      name,
      price,
      thumbnail,
    });
    return product._id;
  }

  // 产品列表
  async list(opts = {}) {
    const { ctx } = this;
    const { page, pagesize } = opts;
    const data = await ctx.model.Product.find()
      .populate('thumbnail', '_id fileName src')
      .skip((page - 1) * pagesize)
      .limit(pagesize)
      .sort({ createdAt: -1 });
    const total = await ctx.model.Product.countDocuments();
    const list = data.map(item => {
      const src = item.thumbnail.src;
      const product = item.toObject();
      product.thumbnail.src = src;
      return product;
    });
    return { page, pagesize, total, list };
  }

  // 删除
  async remove(products = []) {
    const { ctx } = this;
    return await ctx.model.Product.remove({
      _id: { $in: products },
    });
  }

  // 编辑产品
  async update(opts = {}) {
    const { ctx } = this;
    const { _id, modify } = opts;
    const product = await ctx.model.Product.findOne({ _id });
    if (!product) {
      return new Error('产品不存在');
    }
    await product.updateOne({ $set: modify });
  }

  // 产品详情
  async detail(opts = {}) {
    const { ctx } = this;
    const { _id } = opts;
    const product = await ctx.model.Product.findOne({ _id })
      .select('_id name price thumbnail')
      .populate('thumbnail', 'fileName src');
    if (!product) {
      return new Error('产品不存在');
    }
    const data = product.toObject();
    data.thumbnail.src = product.thumbnail.src;
    return data;
  }
}

module.exports = ProductService;
