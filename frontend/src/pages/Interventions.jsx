import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import {
  getInterventions,
  addIntervention,
  updateIntervention,
  deleteIntervention,
} from "../services/interventionApi";

function Interventions() {
  const [interventions, setInterventions] = useState([]);
  const [incidents, setIncidents] = useState([]);
  const [techniciens, setTechniciens] = useState([]);

  const [incident, setIncident] = useState("");
  const [technicien, setTechnicien] = useState("");
  const [description, setDescription] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchInterventions();
    fetchIncidents();
    fetchTechniciens();
  }, []);

  const fetchInterventions = async () => {
    const data = await getInterventions();
    setInterventions(data);
  };

  const fetchIncidents = async () => {
    const res = await fetch("http://localhost:5000/api/incidents");
    const data = await res.json();

    setIncidents(data.filter((i) => i.statut === "Ouvert"));
  };

  const fetchTechniciens = async () => {
    const res = await fetch("http://localhost:5000/api/techniciens");
    const data = await res.json();
    setTechniciens(data);
  };

  const handleIncidentChange = (e) => {
    const id = e.target.value;
    setIncident(id);

    const inc = incidents.find((i) => i._id === id);
    if (inc) setDescription(inc.description);
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (editId) {
    await updateIntervention(editId, {
      incident,
      technicien,
      description,
    });
  } else {
    await addIntervention({
      incident,
      technicien,
      description,
      statut: "En cours",
    });
  }

  setEditId(null);
  setIncident("");
  setTechnicien("");
  setDescription("");

  fetchInterventions();
  fetchIncidents();
};

const handleEdit = (id) => {
  const intervention = interventions.find((i) => i._id === id);
  if (!intervention) return;

  setEditId(id);

  setIncidents((prev) => {
    const exists = prev.find(
      (inc) => inc._id === intervention.incident?._id
    );
    if (exists) return prev;
    return [...prev, intervention.incident];
  });

  setIncident(intervention.incident?._id);
  setTechnicien(intervention.technicien?._id);
  setDescription(intervention.description);
};



  const handleDelete = async (id) => {
    await deleteIntervention(id);
    fetchInterventions();
  };

  return (
    <div className="page">
      <Navbar />
      <h1>Gestion des interventions</h1>

      <div className="formulaire">
        <h3>Nouvelle intervention</h3>

        <form onSubmit={handleSubmit}>
          <label>Incident</label>
          <select value={incident} onChange={handleIncidentChange} required disabled={editId !== null}>
            <option value="">-- Sélectionner un incident --</option>
            {incidents.map((i) => (
              <option key={i._id} value={i._id}>
                {i.titre}
              </option>
            ))}
          </select>

          <label>Technicien</label>
          <select
            value={technicien}
            onChange={(e) => setTechnicien(e.target.value)}
            required
          >
            <option value="">-- Sélectionner un technicien --</option>
            {techniciens.map((t) => (
              <option key={t._id} value={t._id}>
                {t.nom}
              </option>
            ))}
          </select>

          <label>Description</label>
          <input type="text" value={description} disabled />

          <button className="btn-primary">{editId ? "Modifier" : "Ajouter"}</button>
        </form>
      </div>

      <table>
        <thead>
          <tr>
            <th>Incident</th>
            <th>Technicien</th>
            <th>Description</th>
            <th>Statut</th>
            <th>Commentaire technicien</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {interventions.map((i) => (
            <tr key={i._id}>
              <td>{i.incident?.titre}</td>
              <td>{i.technicien?.nom}</td>
              <td>{i.description}</td>
              <td className="status-cell">
                <span className={`status ${i.statut?.toLowerCase().replace(" ", "-").replace("é", "e")}`}>{i.statut} </span>
              </td>
              <td>{i.commentaire || "-"}</td>
              <td className="actions-cell">
                <button className="btn-primary" onClick={() => handleEdit(i._id)}  disabled={i.statut === "Terminée"} 
                 title={i.statut === "Terminée" ? "Intervention déjà terminée" : ""}>Modifier</button>
                <button className="btn-danger" onClick={() => handleDelete(i._id)}> Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Interventions;