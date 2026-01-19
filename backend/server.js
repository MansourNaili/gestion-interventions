const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/db'); // AJOUT

const incidentRoutes = require('./routes/incident.routes');

const app = express();

connectDB(); // AJOUT

app.use(cors());
app.use(express.json());
app.use('/api/incidents', incidentRoutes);

app.get('/', (req, res) => {
  res.send('API backend en cours de développement');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur lancé sur le port ${PORT}`);
});
