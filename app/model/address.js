'use strict';
/** @param {Egg.Application} param0 */
module.exports = ({ mongoose, model }) => {
  const AddressSchema = new mongoose.Schema({

    // 所属用户
    userId: {
      ref: 'User',
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    // 收货人
    name: {
      type: String,
      required: true,
    },

    // 手机号码
    phone: {
      type: String,
      required: true,
    },

    // 城市
    city: {
      type: [String],
      required: true,
    },

    // 详细地址
    address: {
      type: String,
      required: true,
    },

    // 设为默认地址
    isDefault: {
      type: Boolean,
      default: false,
    },
  }, {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  });

  AddressSchema.method({

    // 设为默认地址
    async setDefault() {
      await model.Address.updateMany({
        userId: this.userId
      }, { $set: { isDefault: false } });
      await this.updateOne({ isDefault: true });
      return this;
    },
  });

  return mongoose.model('Address', AddressSchema, 'Address');
};
