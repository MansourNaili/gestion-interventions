const mongoose = require("mongoose");

const interventionSchema = new mongoose.Schema(
  {
    incident: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Incident",
      required: true,
    },
    technicien: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Technicien",
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    commentaire: {
      type: String,
      default: "",
    },
    statut: {
      type: String,
      enum: ["En cours", "Terminée"],
      default: "En cours",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Intervention", interventionSchema);