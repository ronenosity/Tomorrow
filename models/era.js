const mongoose = require('mongoose');

const { Schema } = mongoose;

const EraSchema = new Schema({
    name: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.models.category || mongoose.model('era', EraSchema);
