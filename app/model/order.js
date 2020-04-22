'use strict';
const md5 = require('md5');
const _ = require('lodash');
const moment = require('moment');

/** @param {Egg.Application} param0 */
module.exports = ({ mongoose, model }) => {

  const OrderSchema = new mongoose.Schema({

    // 单号
    no: {
      type: String,
      index: true,
      unique: true,
      required: true,
    },

    // 短号
    cornet: {
      type: String,
      index: true,
      unique: true,
      required: true,
    },

    // 用户ID
    userId: {
      ref: 'User',
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    // 产品ID
    productId: {
      ref: 'Product',
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    // 产品快照
    productSnapShot: {
      name: String,
      thumbnail: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Media',
      },
      price: Number,
    },

    // 收货地址ID
    addressId: {
      ref: 'Address',
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    // 收货地址快照
    addressSnapShot: {
      name: String,
      phone: String,
      city: [String],
      address: String,
    },

    // 购买数量
    count: {
      type: Number,
      default: 1,
    },

    // 结算价格
    priceSum: {
      type: Number,
      required: true,
    },

    // 实付价格
    totalFee: {
      type: Number,
      required: true,
    },

    // 支付时间
    timePayed: Date,
    // 发货时间
    timeConsign: Date,
    // 退款时间
    timeRefund: Date,
    // 关闭时间
    timeClosed: Date,
  }, {
    autoIndex: false,
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  });

  OrderSchema.static({

    // 短号生成器
    async genCornet() {
      const total = await this.countDocuments();
      const total16 = total.toString(16);
      return `a${_.padStart(total16, 4, 0)}`;
    },

    // 单号生成器
    async genNo(_id) {
      const cornet = await this.genCornet();
      const timePrefix = moment().format('YYYYMMDDHHmmss');
      const nonceStr = String(Math.random()).substr(2, 3);
      const userIdPrefix = md5(String(_id)).substr(0, 2);
      return [userIdPrefix, timePrefix, nonceStr, cornet].join('').toUpperCase();
    },
  });

  return mongoose.model('Order', OrderSchema, 'Order');
};
