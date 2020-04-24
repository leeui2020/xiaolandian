'use strict';
const fs = require('fs-extra');
const path = require('path');
const Controller = require('egg').Controller;

class MediaController extends Controller {

  async upload() {
    const { ctx } = this;
    ctx.validate({
      type: { type: 'string' },
      size: { type: 'string' }
    });
    const file = ctx.request.files[0];
    if (!file) {
      return ctx.handler(new Error(''))
    }
    const fileName = file.filepath.split(/\\|\//).reverse()[0];
    const movePath = path.join(this.config.baseDir, 'app/public/media', fileName);
    await fs.move(file.filepath, movePath);
    const media = await ctx.model.Media.create({
      type: file.mime,
      size: ctx.request.body.size,
      fileName
    });
    await ctx.handler(media);
  }

  async getList() {
    const { ctx } = this;
    ctx.validate({
      page: { type: 'int', min: 1, required: false, default: 1 },
      pagesize: { type: 'int', min: 1, required: false, default: 10 },
    });
    await ctx.handler(await ctx.service.media.getList(ctx.request.body));
  }

  // 删除媒体
  async remove() {
    const { ctx } = this;
    ctx.validate({
      medias: {
        type: 'array',
        itemType: 'string',
        min: 1,
      },
    });
    await ctx.handler(await ctx.service.media.remove(ctx.request.body.medias));
  }
}

module.exports = MediaController;
