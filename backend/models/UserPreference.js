const mongoose = require("mongoose");

const validPreferences = [
  "Fair Labor",
  "Carbon Footprint",
  "Supply Chain Transparency",
  "Animal Welfare",
  "Recycled Materials",
];

const validFabricPreferences = [
  "Organic Cotton",
  "Recycled Polyester",
  "Hemp",
  "Linen",
  "Conventional Cotton",
  "Polyester",
  "Wool",
  "Leather",
];

const validDealBreakers = [
  "Animal Products",
  "Synthetic Virgin Polyester",
  "Non-transparent Sourcing",
];

const UserPreferenceSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  preferences: {
    type: [String],
    enum: validPreferences,
    default: [],
  },
  fabricPreferences: {
    type: [String],
    enum: validFabricPreferences,
    default: [],
  },
  dealBreakers: {
    type: [String],
    enum: validDealBreakers,
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update updatedAt on save
UserPreferenceSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("UserPreference", UserPreferenceSchema);