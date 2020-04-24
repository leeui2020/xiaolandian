'use strict';
/** @param {Egg.Application} param0 */
module.exports = ({ mongoose }) => {
  const PaycodeSchema = new mongoose.Schema({

    // 二维码
    qrcode: {
      ref: 'Media',
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    // 描述
    title: {
      type: String,
      required: true,
    },

    // 通知邮箱
    email: {
      type: String,
      required: true,
    },

    // 关闭使用
    isClosed: {
      type: Boolean,
      default: false,
    },
  }, {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  });

  return mongoose.model('Paycode', PaycodeSchema, 'Paycode');
};
