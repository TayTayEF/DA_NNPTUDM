var mongoose = require("mongoose");

var categoryShema = new mongoose.Schema(
    {
        name: String,


    },
    { timestamps: true }
);

module.exports = new mongoose.model("category", categoryShema);
