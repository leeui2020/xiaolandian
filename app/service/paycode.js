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
}

module.exports = PaycodeService;
