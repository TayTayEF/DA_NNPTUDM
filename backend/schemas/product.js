var mongoose = require("mongoose");

var productShema = new mongoose.Schema(
  {
    name: String,
    price: Number,
    imageUrl: String,
    describe: String,
      categoryId: String,
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = new mongoose.model("product", productShema);
