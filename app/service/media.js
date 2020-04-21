'use strict';
const _ = require('lodash');
const Service = require('egg').Service;

class MediaService extends Service {

  async getList(opts = {}) {
    const { ctx } = this;
    const { page, pagesize } = opts;
    const data = await ctx.model.Media.find()
      .select('_id type size fileName description src createdAt')
      .skip((page - 1) * pagesize).limit(pagesize)
      .sort({ createdAt: -1 });
    const total = await ctx.model.Media.countDocuments();
    const list = _.map(data, media => {
      const src = media.src;
      media = media.toObject();
      media.src = src;
      return media;
    });
    return { page, pagesize, total, list };
  }

  // 删除媒体
  async remove(medias = []) {
    const { ctx } = this;
    const list = await ctx.model.Media.find({
      _id: { $in: medias },
    });
    for (const item of list) {
      await item.remove();
    }
  }
}

module.exports = MediaService;
