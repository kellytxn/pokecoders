const express = require("express");
const router = express.Router();
const UserScore = require("../models/UserScore");
const AllProducts = require("../../context/products");


router.post("/updateScore", async (req, res) => {
  try {
    const { userId, productId, scoreValue } = req.body;

    if (!userId || !productId || scoreValue === undefined) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    //update score for original product
    const updateScore = await UserScore.findOneAndUpdate(
      { userId, productId },
      { $inc: { score: scoreValue } },
      { upsert: true, new: true }
    );

    const originalProduct = AllProducts.find(p => p.id === productId);        

    //update score for similar products
    const similarProducts = AllProducts.filter(product => {
        const ogProd = originalProduct.name.toLowerCase().match(/\b\w+\b/g) || [];
        const chkProd = product.name.toLowerCase().match(/\b\w+\b/g) || [];

        const chkProdSet = new Set(chkProd);

        return product.id !== productId && ogProd.some(word => chkProdSet.has(word));
    });

    const updateOtherScore = similarProducts.map(product => ({
        updateOne: {
            filter: { userId, productId: product.id },
            update: { $inc: { score: scoreValue * 0.6 } },
            upsert: true
        }
    }));

    if (updateOtherScore.length > 0) {
        await UserScore.bulkWrite(updateOtherScore);
    }

    res.status(200).json({
      message: "Scores updated successfully",
      originalScore: updateScore,
      similarProductsUpdated: similarProducts.length
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/products/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    let productsWithScores = [...AllProducts];
    
    // get all product scores for this user
    const userScores = await UserScore.find({ userId });
    
    // create quick score lookup: { productId: score }
    const scoreMap = new Map();
    userScores.forEach(score => {
      scoreMap.set(score.productId, score.score);
    });
    
    // merge products with scores
    productsWithScores = AllProducts.map(product => ({
      ...product,
      userScore: scoreMap.get(product.id) || 0
    }));
    
    // sort by userScore descending
    productsWithScores.sort((a, b) => b.userScore - a.userScore);
    
    res.status(200).json(productsWithScores);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;