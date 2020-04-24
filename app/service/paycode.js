'use strict';
const Service = require('egg').Service;

class PaycodeService extends Service {

  // 新增支付二维码
  async add(opts = {}) {
    const { ctx } = this;
    const { title, email, qrcode } = opts;
    const paycode = await ctx.model.Paycode.create({
      title,
      email,
      qrcode,
    });
    ctx.logger.info('新增支付二维码：', paycode);
  }

  // 管理员查询支付二维码列表
  async list(opts = {}) {
    const { ctx } = this;
    const { page, pagesize } = opts;
    const data = await ctx.model.Paycode.find()
      .populate('qrcode', 'fileName src')
      .skip((page - 1) * pagesize)
      .limit(pagesize)
      .sort({ createdAt: -1 });
    const total = await ctx.model.Paycode.countDocuments();
    const list = data.map(item => {
      const paycode = item.toObject();
      paycode.qrcode.src = item.qrcode.src;
      return paycode;
    });
    return { page, pagesize, total, list };
  }

  // 删除支付二维码
  async remove(opts = {}) {
    const { ctx } = this;
    const { _id } = opts;
    await ctx.model.Paycode.remove({
      _id: { $in: _id },
    });
  }

  // 编辑二维码
  async edit(opts = {}) {
    const { ctx } = this;
    const { _id, modify } = opts;
    const paycode = await ctx.model.Paycode.findOne({ _id });
    if (!paycode) {
      return new Error('支付二维码不存在');
    }
    await paycode.updateOne({ $set: modify });
  }

  // 客户端查询可选支付方式
  async canUse() {
    const { ctx } = this;
    const list = await ctx.model.Paycode.find({ isClosed: false })
      .select('_id title')
      .sort({ createdAt: -1 });
    if (list.length === 0) {
      return new Error('暂不支持支付');
    }
    return list;
  }
}

module.exports = PaycodeService;
