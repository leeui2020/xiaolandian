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
}

module.exports = PaycodeService;
