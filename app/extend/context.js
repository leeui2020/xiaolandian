'use strict';
exports.handler = async function(data, expand = {}) {
  if (this.user) {
    expand.token = await this.user.genToken();
  }
  this.body = data instanceof Error
    ? { status: 'err', errmsg: data.message }
    : { status: 'ok', data, ...expand };
};
