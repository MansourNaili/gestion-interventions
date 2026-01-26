const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/db'); 

const incidentRoutes = require('./routes/incident.routes');
const technicienRoutes = require("./routes/techniciens");
const interventionRoutes = require("./routes/interventionRoutes");
const authRoutes = require("./routes/auth");

const app = express();

connectDB(); 

app.use(cors());
app.use(express.json());
app.use('/api/incidents', incidentRoutes);
app.use("/api/techniciens", technicienRoutes);
app.use("/api/interventions", interventionRoutes);
app.use("/api/auth", authRoutes);


app.get('/', (req, res) => {
  res.send('API backend en cours de développement');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur lancé sur le port ${PORT}`);
});