'use strict';
const md5 = require('md5');
const qs = require('querystring');

/** @param {Egg.Application} app */
module.exports = ({ mongoose, config, redis }) => {
  const { userRole } = config;
  const UserSchema = new mongoose.Schema({
    email: {
      type: String,
      index: true,
      unique: true,
      sparse: true,
    },

    nickName: String,

    password: {
      type: String,
      set: md5,
    },

    role: {
      type: String,
      enum: [
        userRole.YOUKE,
        userRole.NORMAL,
        userRole.EDITOR,
        userRole.ADMINISTRATOR,
      ],
      default: userRole.NORMAL,
    },
  }, {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  });

  UserSchema.method({
    checkPassword(value) {
      return md5(value) === this.password;
    },

    async genToken() {
      const lastToken = await redis.get(`TOKEN/${this.email}`);
      if (lastToken) {
        await redis.del([`TOKEN/${this.email}`, lastToken]);
      }

      const token = md5(qs.stringify({
        email: this.email,
        timestamps: Date.now(),
        noceStr: String(Math.random()).substr(2),
      }));
      await redis.set(token, this.email);
      await redis.set(`TOKEN/${this.email}`, token);
      return token;
    },
  });

  UserSchema.static({
    async auth(token) {
      const email = await redis.get(token);
      const user = await this.findOne({ email });
      if (!user) return new Error('验证失败');
      return user;
    },
  })
  return mongoose.model('User', UserSchema, 'User');
};
