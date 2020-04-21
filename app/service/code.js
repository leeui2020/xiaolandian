'use strict';
const Service = require('egg').Service;

class CodeService extends Service {

  // 创建验证码
  async create(opts = {}) {
    const { ctx } = this;
    const { type, email } = opts;
    const lastCode = await ctx.model.Code.findOne({
      type,
      email,
      timeUsed: { $exists: false },
      timeExpires: { $gt: new Date() },
    });

    if (!lastCode) {
      const value = String(Math.random()).substr(2, 6);
      const code = await ctx.model.Code.create({ type, email, value });
      return code.value;
    }

    if (new Date() - lastCode.createdAt <= 60000) {
      return new Error('操作频繁');
    }

    return lastCode.value;
  }
}

module.exports = CodeService;
