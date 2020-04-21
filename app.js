'use strict';
class AppBootHook {
  /** @param {Egg.Application} app */
  constructor(app) {
    this.app = app;
  }

  async didReady() {
    const ctx = await this.app.createAnonymousContext();
    // QQ邮箱验证规则
    this.app.validator.addRule('qqEmail', /^[a-zA-Z0-9_-]+@qq(\.[a-zA-Z0-9_-]+)+$/);
    // 手机号码验证则
    this.app.validator.addRule('phone', /^1[3456789]\d{9}$/);
  }
}

module.exports = AppBootHook;
