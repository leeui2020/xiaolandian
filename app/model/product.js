'use strict';
/** @param {Egg.Application} param0 */
module.exports = ({ mongoose }) => {
  const ProductSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    thumbnail: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Media',
    },
  }, {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  });

  return mongoose.model('Product', ProductSchema, 'Product');
};
