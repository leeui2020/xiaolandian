'use strict';
const fs = require('fs-extra');
const path = require('path');
const url = require('url');

/** @param {Egg.Application} param0 */
module.exports = ({ mongoose, config }) => {
  const MediaSchema = new mongoose.Schema({
    type: {
      type: String,
      required: true,
    },

    fileName: {
      type: String,
      required: true,
    },

    description: String,

    size: {
      type: Number,
      required: true,
    },
  }, {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  });

  MediaSchema.virtual('src').get(function() {
    return url.resolve(config.siteDoname, `/media/${this.fileName}`);
  });

  MediaSchema.pre('remove', function(next) {
    try {
      fs.unlinkSync(path.join(config.mediaDir, this.fileName));
    } finally {
      next();
    }
  });

  return mongoose.model('Media', MediaSchema, 'Media');
};
