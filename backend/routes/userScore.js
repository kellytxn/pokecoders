const express = require("express");
const router = express.Router();
const UserScore = require("../models/UserScore");

router.post("/updateScore", async (req, res) => {
  try {
    const { userId, productId, scoreValue } = req.body;

    if (!userId || !productId || scoreValue === undefined) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    //update score for original product
    const updatedScore = await UserScore.findOneAndUpdate(
      { userId, productId },
      { $inc: { score: scoreValue } },
      { upsert: true, new: true }
    );

    res.status(200).json(updatedScore);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});
