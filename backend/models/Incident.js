const mongoose = require('mongoose');

const incidentSchema = new mongoose.Schema(
  {
    titre: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    statut: {
      type: String,
      enum: ['Ouvert', 'En cours', 'Résolu'],
      default: 'Ouvert'
    },
    dateDeclaration: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Incident', incidentSchema);
