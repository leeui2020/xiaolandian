'use strict';
/** @param {Egg.Application} param0 */
module.exports = ({ mongoose }) => {
  const CodeSchema = new mongoose.Schema({
    // 类型
    type: {
      type: String,
      required: true,
    },

    // 邮箱
    email: {
      type: String,
      required: true,
    },

    // 验证码
    value: {
      type: String,
      required: true,
    },

    // 过期时间
    timeExpires: {
      type: Date,
      default() {
        const now = new Date();
        now.setMinutes(now.getMinutes() + 5);
        return now;
      },
    },

    // 使用时间
    timeUsed: Date,
  }, {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  });

  return mongoose.model('Code', CodeSchema, 'Code');
};
