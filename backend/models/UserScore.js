const mongoose = require("mongoose");

const userScoreSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  productId: { type: String, required: true, unique: true },
  score: { type: Number, default: 0 }
});

userScoreSchema.index({ userId: 1, productId: 1 }, { unique: true, partialFilterExpression: { userId: { $exists: true } } });

module.exports = mongoose.model("UserScore", userScoreSchema);