'use strict';
module.exports = ({ roles }) => {
  return async function(ctx, next) {
    const { token } = ctx.headers;
    const user = await ctx.model.User.auth(token);
    if (user instanceof Error) {
      return ctx.handler(user);
    }

    if (roles && !roles.includes(user.role)) {
      return ctx.handler('没有此项操作的权限')
    }
    ctx.user = user;
    await next();
  };
};
