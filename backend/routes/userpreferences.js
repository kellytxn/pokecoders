const express = require("express");
const router = express.Router();
const UserPreference = require("../models/UserPreference");

// Create or Update user preferences
router.post("/", async (req, res) => {
  const { userId, preferences, fabricPreferences, dealBreakers } = req.body;

  if (!userId) {
    return res.status(400).json({ error: "userId is required" });
  }

  try {
    let userPref = await UserPreference.findOne({ userId });

    if (userPref) {
      // Update existing
      userPref.preferences = preferences || userPref.preferences;
      userPref.fabricPreferences = fabricPreferences || userPref.fabricPreferences;
      userPref.dealBreakers = dealBreakers || userPref.dealBreakers;

      await userPref.save();
      return res.status(200).json(userPref);
    } else {
      // Create new
      userPref = new UserPreference({
        userId,
        preferences,
        fabricPreferences,
        dealBreakers,
      });
      await userPref.save();
      return res.status(201).json(userPref);
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
});

// Get user preferences by userId
router.get("/:userId", async (req, res) => {
  try {
    const userPref = await UserPreference.findOne({ userId: req.params.userId });
    if (!userPref) {
      return res.status(404).json({ error: "User preferences not found" });
    }
    return res.json(userPref);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;