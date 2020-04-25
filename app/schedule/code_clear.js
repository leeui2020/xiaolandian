'use strict';
const Subscription = require('egg').Subscription;

class CodeClear extends Subscription {

  // 每日凌晨4:00执行
  static get schedule() {
    return {
      type: 'worker',
      cron: '0 0 4 * * ?',
    };
  }

  // 清除过期的 code
  async subscribe() {
    const { ctx } = this;
    await ctx.model.Code.remove({
      timeExpires: { $lte: new Date() },
      timeUsed: { $exists: true },
    });
  }
}

module.exports = CodeClear;
