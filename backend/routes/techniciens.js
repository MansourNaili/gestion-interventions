const express = require("express");
const router = express.Router();
const Technicien = require("../models/Technicien");


router.post("/", async (req, res) => {
  try {
    const technicien = new Technicien(req.body);
    await technicien.save();
    res.status(201).json(technicien);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const techniciens = await Technicien.find();
    res.json(techniciens);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const technicien = await Technicien.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(technicien);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Technicien.findByIdAndDelete(req.params.id);
    res.json({ message: "Technicien supprimé" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;