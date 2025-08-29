const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, default: '' },
  price: { type: Number, required: true },
  category: { type: Schema.Types.ObjectId, ref: 'Category' },
  image: { type: String, default: '' },
  salesCount: { type: Number, default: 0 },
  isPromotional: { type: Boolean, default: false } // NEW: for promotional banners
}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);