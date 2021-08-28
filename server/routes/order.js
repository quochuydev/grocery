const express = require("express");

const router = express.Router();
const { orderModel } = require("../models/order");

router.get("/api/orders", async (req, res) => {
  const limit = req.query.limit ? Number(req.query.limit) : 20;
  const page = req.query.page ? Number(req.query.page) : 1;
  const skip = limit * (page - 1);

  const items = await orderModel
    .find({})
    .sort({ created_at: -1 })
    .limit(limit)
    .skip(skip);
  res.send({ items });
});

router.post("/api/orders", async (req, res) => {
  const data = req.body;

  const order = await orderModel.create(data);
  res.json(order);
});

router.put("/api/orders/:id", async (req, res) => {
  const data = req.body;

  const order = await orderModel.findByIdAndUpdate(
    req.params.id,
    { $set: data },
    { new: true, lean: true }
  );

  res.json(order);
});

module.exports = { orderRoute: router };
