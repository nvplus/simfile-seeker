const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const packSchema = new Schema({
  author: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  banner_url: { type: String, required: true },
  download_url: { type: String, required: true },
  tags: {type: Array, required: false}
},{
  timestamps: true,
});

const Pack = mongoose.model('Pack', packSchema);

module.exports = Pack;