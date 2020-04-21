'use strict';
const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }

  async admin() {
    const { ctx } = this;
    await ctx.redirect(`http://localhost:8080/admin${ctx.params[0] || '/'}`);
  }
}

module.exports = HomeController;
