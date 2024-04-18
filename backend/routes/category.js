const express = require('express');
const router = express.Router();
const Category = require('../schemas/category');
const { ObjectId } = require("mongodb");

router.post('/add', async (req, res) => {
    try {
        const { name } = req.body;
        const newCategory = new Category({
            name: name
        });
        const savedCategory = await newCategory.save();
        res.status(201).json(savedCategory);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get("/", async (req, res) => {
    try {
        const categories = await Category.find({});
        res.json(categories);
    } catch (error) {
        console.error("Error fetching categories:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});


router.delete('/:id/delete', async (req, res) => {
    try {
        const categoryId = req.params.id;

        if (!ObjectId.isValid(categoryId)) {
            return res.status(400).json({ message: "Invalid category ID" });
        }

        const deletedCategory = await Category.findByIdAndDelete(categoryId);

        if (!deletedCategory) {
            return res.status(404).json({ message: "Category not found" });
        }

        res.json({ message: "Category deleted successfully" });
    } catch (error) {
        console.error("Error deleting category:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.put('/:id/update', async (req, res) => {
    try {
        const categoryId = req.params.id;
        const { name } = req.body;

        if (!ObjectId.isValid(categoryId)) {
            return res.status(400).json({ message: "Invalid category ID" });
        }

        const updatedCategory = await Category.findByIdAndUpdate(categoryId, { name }, { new: true });

        if (!updatedCategory) {
            return res.status(404).json({ message: "Category not found" });
        }

        res.json(updatedCategory);
    } catch (error) {
        console.error("Error updating category:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
