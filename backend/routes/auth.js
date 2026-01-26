const express = require("express");
const router = express.Router();
const Technicien = require("../models/Technicien");

router.post("/login", async (req, res) => {
  const { email, motDePasse } = req.body;

  try {
    if (email === "admin" && motDePasse === "admin") {
      return res.json({
        role: "admin",
        nom: "Administrateur",
        email: "admin",
      });
    }

    const technicien = await Technicien.findOne({ email, motDePasse });

    if (!technicien) {
      return res.status(401).json({
        message: "Email ou mot de passe incorrect",
      });
    }

    res.json({
      _id: technicien._id,
      nom: technicien.nom,
      email: technicien.email,
      role: "technicien",
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;