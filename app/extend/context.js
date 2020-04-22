'use strict';
exports.handler = async function(data, expand = {}) {
  if (this.user) {
    expand.token = await this.user.genToken();
  }

  if (data instanceof Error) {
    const body = { status: 'err', errmsg: data.message };
    if (typeof expand === 'number') {
      body.errcode = expand;
    }
    this.body = body;
  } else {
    const body = { status: 'ok', data };
    if (typeof expand === 'object') {
      Object.assign(body, expand);
    }
    this.body = body;
  }
};
