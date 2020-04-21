'use strict';
module.exports = () => {
  return async function(ctx, next) {
    const countAdmin = await ctx.model.User.countDocuments({
      role: ctx.app.config.userRole.ADMINISTRATOR,
    });
    if (countAdmin > 0) {
      await next();
    } else {
      await ctx.render('install.ejs', {});
    }
  };
};
