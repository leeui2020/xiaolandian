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

    // 物流单号
    nu: {
      type: String,
      unique: true,
      sparse: true,
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

    // 支付方式
    payment: {
      ref: 'Paycode',
      type: mongoose.Schema.Types.ObjectId,
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
      const item = await this.findOne().sort({ cornet: -1 });
      const num = item ? Number(`0x${item.cornet.substr(1)}`) + 1 : 0;
      const total16 = num.toString(16);
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

  // 订单状态
  OrderSchema.virtual('status').get(function() {
    if (this.timeClosed) {
      if (this.timeRefund) return '已退款';
      if (this.timeConsign) return '已收货';
      return '已关闭';
    }

    if (this.timeRefund) return '退款中';
    if (this.timeConsign) return '已发货';
    if (this.timePayed) return '待发货';
    return '待支付';
  });

  return mongoose.model('Order', OrderSchema, 'Order');
};
