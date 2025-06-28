const express = require("express");
const Category = require('../models/category')
const router = express.Router();

// POST /api/categories — Add a new category
router.post("/", async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: "Category name is required" });

    const existing = await Category.findOne({ name });
    if (existing) return res.status(409).json({ error: "Category already exists" });

    const newCategory = new Category({ name });
    await newCategory.save();

    res.status(201).json({ message: "Category added", category: newCategory });
  } catch (err) {
    res.status(500).json({ error: "Failed to add category" });
  }
});

// GET /api/categories — Get all categories
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch categories" });
  }
});

module.exports = router;
