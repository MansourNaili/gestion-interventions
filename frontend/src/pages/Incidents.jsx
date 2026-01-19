import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

const API_URL = "http://localhost:5000/api/incidents";

function Incidents() {
  const [incidents, setIncidents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");

  // READ : charger les incidents
  useEffect(() => {
    fetchIncidents();
  }, []);

  const fetchIncidents = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setIncidents(data);
  };

  const toggleForm = () => {
    setShowForm(!showForm);
    setIsEditing(false);
    setTitre("");
    setDescription("");
  };

  // CREATE / UPDATE
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isEditing) {
      // PUT : Modifier incident
      await fetch(`${API_URL}/${editId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          titre,
          description,
        }),
      });
    } else {
      // POST : Ajouter incident
      await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          titre,
          description,
          statut: "En cours",
        }),
      });
    }

    setTitre("");
    setDescription("");
    setShowForm(false);
    setIsEditing(false);
    fetchIncidents();
  };

  // Préparer la modification
  const handleEdit = (incident) => {
    setShowForm(true);
    setIsEditing(true);
    setEditId(incident._id);
    setTitre(incident.titre);
    setDescription(incident.description);
  };

  // DELETE
  const handleDelete = async (id) => {
    if (!window.confirm("Voulez-vous supprimer cet incident ?")) return;

    await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    fetchIncidents();
  };

  return (
    <div className="page">
      <Navbar />

      <h1>Gestion des incidents</h1>
      <br />

      <button className="btn-primary" onClick={toggleForm}>
        {showForm ? "Annuler" : "Ajouter un incident"}
      </button>

      {showForm && (
        <div className="formulaire">
          <h3>{isEditing ? "Modifier l'incident" : "Ajouter un incident"}</h3>

          <form onSubmit={handleSubmit}>
            <label>Titre</label>
            <input
              type="text"
              value={titre}
              onChange={(e) => setTitre(e.target.value)}
              required
            />

            <label>Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />

            <button type="submit" className="btn-primary">
              {isEditing ? "Modifier" : "Enregistrer"}
            </button>
          </form>
        </div>
      )}

      <table>
        <thead>
          <tr>
            <th>Titre</th>
            <th>Description</th>
            <th>Date</th>
            <th>Statut</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {incidents.map((incident) => (
            <tr key={incident._id}>
              <td>{incident.titre}</td>
              <td>{incident.description}</td>
              <td>{new Date(incident.createdAt).toLocaleDateString()}</td>
              <td>
                  <span className={`status ${incident.statut.toLowerCase().replace(' ', '-')}`}>{incident.statut}</span>
              </td>
              <td>
                <button
                  className="btn-primary"
                  onClick={() => handleEdit(incident)}
                >
                  Modifier
                </button>

                <button
                  className="btn-danger"
                  onClick={() => handleDelete(incident._id)}
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Incidents;
