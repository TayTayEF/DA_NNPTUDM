var mongoose = require("mongoose");

var cartShema = new mongoose.Schema(
    {
        id: Number,
        idUser: String,
        name: String,
        nameProduct: String,
        totalPrice: String,
        address: String,
        phone: String,

        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

module.exports = new mongoose.model("cart", cartShema);
