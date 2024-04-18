var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});
router.use("/product", require("./product"));
router.use("/user", require("./users"));
router.use("/cart", require("./cart"));
router.use("/category", require("./category"));
router.use("/contact", require("./contact"));

module.exports = router;
