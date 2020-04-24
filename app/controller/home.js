'use strict';
const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }

  async admin() {
    const { ctx } = this;
    if (this.config.env === 'local') {
      await ctx.redirect(`http://localhost:20204/admin${ctx.params[0] || '/'}`);
    } else {
      await ctx.render('admin.ejs', {});
    }
  }

  async h5() {
    const { ctx } = this;
    if (this.config.env === 'local') {
      await ctx.redirect(`http://localhost:20205/admin${ctx.params[0] || '/'}`);
    } else {
      await ctx.render('h5.ejs', {});
    }
  }
}

module.exports = HomeController;
