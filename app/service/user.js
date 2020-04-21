'use strict';
const _ = require('lodash');
const Service = require('egg').Service;

class UserService extends Service {

  async create(opts = {}) {
    const { ctx } = this;
    const {
      email,
      nickName,
      password,
      role,
    } = opts;
    if (await ctx.model.User.findOne({ email })) {
      return new Error('邮箱已经注册');
    }

    const user = await ctx.model.User.create({
      email,
      nickName,
      password,
      role
    });

    ctx.logger.info('新增用户：%j', user);
    return user._id;
  }

  async login(opts = {}) {
    const { ctx } = this;
    const { email, password } = opts;
    const user = await ctx.model.User.findOne({ email });
    if (!user) {
      return new Error('用户未注册');
    }
    if (!user.checkPassword(password)) {
      return new Error('密码错误');
    }
    const token = await user.genToken();
    const { nickName } = user;
    return { token, email, nickName, userId: user._id };
  }

  // 普通用户注册
  async regist(opts = {}) {
    const { ctx } = this;
    const { email, password, code } = opts;
    const _code = await ctx.model.Code.findOne({
      type: '注册',
      email,
      value: code,
      timeUsed: { $exists: false },
      timeExpires: { $gt: new Date() },
    });

    if (!_code) {
      return new Error('验证码错误或已失效');
    }
    await _code.updateOne({ timeUsed: new Date() });

    if (await ctx.model.User.findOne({ email })) {
      return new Error('邮箱已经注册');
    }

    const role = this.config.userRole.NORMAL;
    const user = await ctx.model.User.create({ email, password, role });
    ctx.logger.info('新用户注册：%j', user);
  }

  // 游客登录
  async youkeLogin() {
    const { ctx } = this;
    const userCount = await ctx.model.User.countDocuments();
    const email = `__YOUKE_${_.padStart(userCount, 8, 0)}@qq.com`;
    if (await ctx.model.User.findOne({ email })) {
      return new Error('游客帐号已不再开放');
    }
    const user = await ctx.model.User.create({
      email,
      nickName: `游客${_.padStart(userCount, 2, 0)}`,
      password: '111111',
      role: this.config.userRole.YOUKE,
    });
    ctx.logger.info('新增游客：%j', user);
    return await this.login({ email, password: '111111' });
  }
}

module.exports = UserService;
