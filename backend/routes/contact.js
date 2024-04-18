const express = require('express');
const router = express.Router();
const Contact = require('../schemas/contact');



router.post("/add", async (req, res) => {
    try {
        const newItem = await Contact.create(req.body);
        res.status(201).json(newItem);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



router.get("/", async (req, res) => {
    try {
        const contact = await Contact.find({});
        res.json(contact);
    } catch (error) {
        console.error("Error fetching categories:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});






module.exports = router;
