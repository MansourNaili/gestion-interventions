import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import FilterBar from "../components/FilterBar";
import {
  getIncidents,
  addIncident,
  updateIncident,
  deleteIncident,
} from "../services/incidentsApi";

function Incidents() {
  const [incidents, setIncidents] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [editId, setEditId] = useState(null);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    loadIncidents();
  }, []);

  const loadIncidents = async () => {
    const data = await getIncidents();
    setIncidents(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editId) {
      await updateIncident(editId, { titre, description });
    } else {
      await addIncident({ titre, description });
    }

    setTitre("");
    setDescription("");
    setEditId(null);
    setShowForm(false);
    loadIncidents();
  };

  const handleEdit = (incident) => {
    setTitre(incident.titre);
    setDescription(incident.description);
    setEditId(incident._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    await deleteIncident(id);
    loadIncidents();
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const filteredIncidents = incidents.filter((i) => {
    const matchTitre = i.titre
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchStatut = status ? i.statut === status : true;

    return matchTitre && matchStatut;
  });

  const sortedIncidents = [...filteredIncidents].sort((a, b) => {
    if (!sortField) return 0;

    let valA = a[sortField];
    let valB = b[sortField];

    if (sortField === "createdAt") {
      valA = new Date(valA);
      valB = new Date(valB);
    }

    if (valA < valB) return sortOrder === "asc" ? -1 : 1;
    if (valA > valB) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  return (
    <div className="page">
      <Navbar />
      <h1>Gestion des incidents</h1>

      <FilterBar
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
      />

      <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
        {showForm ? "Annuler" : "Ajouter un incident"}
      </button>

      {showForm && (
        <div className="formulaire">
          <h3>{editId ? "Modifier l'incident" : "Ajouter un incident"}</h3>

          <form onSubmit={handleSubmit}>
            <label>Titre</label>
            <input type="text" value={titre} onChange={(e) => setTitre(e.target.value)} required />

            <label>Description</label>
            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />

            <button className="btn-primary" type="submit">Enregistrer</button>
          </form>
        </div>
      )}

      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort("titre")} className="sortable">
              Titre {sortField === "titre" && (sortOrder === "asc" ? "▲" : "▼")}
            </th>
            <th>Description</th>
            <th onClick={() => handleSort("createdAt")} className="sortable">
              Date {sortField === "createdAt" && (sortOrder === "asc" ? "▲" : "▼")}
            </th>
            <th onClick={() => handleSort("statut")} className="sortable">
              Statut {sortField === "statut" && (sortOrder === "asc" ? "▲" : "▼")}
            </th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {sortedIncidents.map((i) => (
            <tr key={i._id}>
              <td>{i.titre}</td>
              <td>{i.description}</td>
              <td>{new Date(i.createdAt).toLocaleDateString()}</td>
              <td className="status-cell">
                <span className={`status ${i.statut?.toLowerCase()}`}>
                  {i.statut}
                </span>
              </td>
              <td className="actions-cell">
                <button
                  className="btn-primary"
                  onClick={() => handleEdit(i)}
                  disabled={i.statut === "Résolu"}
                >
                  Modifier
                </button>

                <button
                  className="btn-danger"
                  onClick={() => handleDelete(i._id)}
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