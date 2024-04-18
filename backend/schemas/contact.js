var mongoose = require("mongoose");

var contactSchema = new mongoose.Schema(
    {
        name: String,
        email: String,
        message: String,


    },
    { timestamps: true }
);

module.exports = new mongoose.model("contact", contactSchema);
