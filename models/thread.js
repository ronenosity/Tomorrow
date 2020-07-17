const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ThreadSchema = new Schema({
  community: { type: Schema.Types.ObjectId, required: true },
  title: { type: String, required: true },
  date: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, required: true },
  content: { type: String, required: true },
  slug: { type: String, required: true, index: true, unique: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  likedBy: { type: Schema.Types.Array, default: [] },
  deslikedBy: { type: Schema.Types.Array, default: [] },
});
ThreadSchema.set('autoIndex', false);
ThreadSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  return next();
});

module.exports = mongoose.models.thread || mongoose.model('thread', ThreadSchema);
