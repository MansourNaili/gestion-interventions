const express = require("express");
const router = express.Router();
const Intervention = require("../models/Intervention");
const Incident = require("../models/Incident");

router.get("/", async (req, res) => {
  try {
    const interventions = await Intervention.find()
      .populate("incident")
      .populate("technicien");
    res.json(interventions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const intervention = new Intervention(req.body);
    await intervention.save();

    await Incident.findByIdAndUpdate(req.body.incident, {
      statut: "En cours",
    });

    res.status(201).json(intervention);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const intervention = await Intervention.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (req.body.statut === "Terminée") {
      await Incident.findByIdAndUpdate(intervention.incident, {
        statut: "Résolu",
      });
    }

    res.json(intervention);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


router.delete("/:id", async (req, res) => {
  await Intervention.findByIdAndDelete(req.params.id);
  res.json({ message: "Intervention supprimée" });
});

router.get("/technicien/:id", async (req, res) => {
  const interventions = await Intervention.find({
    technicien: req.params.id,
  })
    .populate("incident")
    .populate("technicien");

  res.json(interventions);
});

module.exports = router;