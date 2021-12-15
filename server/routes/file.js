const express = require("express");
const router = express.Router();

const { fileModel } = require("../models/file");
const { storage, uploader, getFile } = require("../uploader");

router.post("/api/files", storage, async (req, res) => {
  if (!req.file) {
    return res.status(400).send("empty file");
  }
  const file = await uploader(req.file);
  res.send(file);
});

router.get("/api/files", async (req, res) => {
  const items = await fileModel.find({}).sort({ createdAt: -1 });
  res.status(200).json({ items });
});

router.get("/files/:filename", (req, res) => {
  getFile(req.params.filename, res, (error) => {
    return res.status(500).send(error);
  });
});

module.exports = { fileRoute: router };
