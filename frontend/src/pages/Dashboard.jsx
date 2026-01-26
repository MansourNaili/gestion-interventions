import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "../assets/Dashboard.css";
import { FaBug, FaTools, FaUsers } from "react-icons/fa";


import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar, Doughnut } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

function Dashboard() {
  const [incidents, setIncidents] = useState([]);
  const [interventions, setInterventions] = useState([]);
  const [techniciens, setTechniciens] = useState([]);

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    const resIncidents = await fetch("http://localhost:5000/api/incidents");
    const resInterventions = await fetch("http://localhost:5000/api/interventions");
    const resTechniciens = await fetch("http://localhost:5000/api/techniciens");

    setIncidents(await resIncidents.json());
    setInterventions(await resInterventions.json());
    setTechniciens(await resTechniciens.json());
  };

  const incidentsOuverts = incidents.filter(i => i.statut === "Ouvert").length;
  const incidentsEnCours = incidents.filter(i => i.statut === "En cours").length;
  const incidentsResolus = incidents.filter(i => i.statut === "Résolu").length;

  const interventionsEnCours = interventions.filter(i => i.statut === "En cours").length;
  const interventionsTerminees = interventions.filter(i => i.statut === "Terminée").length;

  const incidentsChartData = {
    labels: ["Ouverts", "En cours", "Résolus"],
    datasets: [
      {
        data: [incidentsOuverts, incidentsEnCours, incidentsResolus],
        backgroundColor: ["#0d6efd", "#fd7e14", "#198754"],
      },
    ],
  };

  const interventionsChartData = {
    labels: ["En cours", "Terminées"],
    datasets: [
      {
        label: "Interventions",
        data: [interventionsEnCours, interventionsTerminees],
        backgroundColor: ["#fd7e14", "#198754"],
      },
    ],
  };

  return (
    <div className="page">
      <Navbar />

      <h1>Dashboard Administrateur</h1>

      <div className="dashboard-grid">
  <div className="card">
    <div className="card-header">
      <FaBug className="card-icon incident" />
      <h3>Incidents</h3>
    </div>
    <p>Total : {incidents.length}</p>
    <p className="status ouvert">Ouverts : {incidentsOuverts}</p>
    <p className="status en-cours">En cours : {incidentsEnCours}</p>
    <p className="status resolu">Résolus : {incidentsResolus}</p>
  </div>

  <div className="card">
    <div className="card-header">
      <FaTools className="card-icon intervention" />
      <h3>Interventions</h3>
    </div>
    <p>Total : {interventions.length}</p>
    <p className="status en-cours">En cours : {interventionsEnCours}</p>
    <p className="status terminee">Terminées : {interventionsTerminees}</p>
  </div>

  <div className="card">
    <div className="card-header">
      <FaUsers className="card-icon technicien" />
      <h3>Techniciens</h3>
    </div>
    <p>Total techniciens : {techniciens.length}</p>
  </div>
</div>


      <div className="dashboard-grid">
        <div className="card">
          <h3>Répartition des incidents</h3>
          <Doughnut data={incidentsChartData} />
        </div>

        <div className="card">
          <h3>État des interventions</h3>
          <Bar data={interventionsChartData} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;