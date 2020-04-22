'use strict';
exports.handler = async function(data, expand = {}) {
  const body = {};

  if (this.user) {
    body.token = await this.user.genToken();
  }

  if (data instanceof Error) {
    body.status = 'err';
    body.errmsg = data.message;
    if (typeof expand === 'number') {
      body.errcode = expand;
    }
  } else {
    body.status = 'ok';
    body.data = data;
    if (typeof expand === 'object') {
      Object.assign(body, expand);
    }
  }

  this.body = body;
};
