const express = require("express");
const { Order } = require("../models/order.model");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const orders = await Order.find();
    const count = await Order.countDocuments();

    res.json({ orders, count });
  } catch (e) {
    next(e);
  }
});
router.post("/", async (req, res, next) => {
  try {
    const body = req.body;
    const result = await Order.create(body);

    res.json({ result });
  } catch (e) {
    next(e);
  }
});
router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Order.findOneAndRemove({ _id: id });

    res.json({ result });
  } catch (error) {
    next(e);
  }
});
router.patch("/:id/status", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const result = await Order.findOneAndUpdate(
      { _id: id },
      { status },
      { new: true }
    );

    res.json({ result });
  } catch (error) {
    next(e);
  }
});
module.exports = router;
