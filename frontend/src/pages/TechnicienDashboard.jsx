import { useEffect, useState } from "react";
import TechnicienHeader from "../components/TechnicienHeader";

const API_URL = "http://localhost:5000/api/interventions";

function TechnicienDashboard() {
  const [interventions, setInterventions] = useState([]);
  const [commentaires, setCommentaires] = useState({});
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchInterventions();
  }, []);

  const fetchInterventions = async () => {
    const res = await fetch(`${API_URL}/technicien/${user._id}`);
    const data = await res.json();
    setInterventions(data);
  };

  const terminerIntervention = async (id) => {
    await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        statut: "Terminée",
        commentaire: commentaires[id] || "",
      }),
    });
    
    setCommentaires({});
    fetchInterventions();
  };

  return (
    <div className="page">
      <TechnicienHeader user={user} />
      <h1>Mes interventions</h1>

      <table>
        <thead>
          <tr>
            <th>Incident</th>
            <th>Description</th>
            <th>Date</th>
            <th>Statut</th>
            <th>Commentaire</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {interventions.map((i) => (
            <tr key={i._id}>
              <td>{i.incident?.titre}</td>
              <td>{i.description}</td>
              <td>{new Date(i.createdAt).toLocaleDateString()}</td>
              <td className="status-cell">
              <span className={`status ${i.statut?.toLowerCase().replace(" ", "-").replace("é", "e")}`}>{i.statut}</span>
              </td>

              <td>
                {i.statut === "En cours" ? (
                  <input type="text" placeholder="Commentaire" value={commentaires[i._id] || ""}
                   onChange={(e) =>setCommentaires({ ...commentaires, [i._id]: e.target.value, })} /> )
                    : ( i.commentaire || "-" )}
              </td>
              <td>
                  <button className="btn-primary" onClick={() => terminerIntervention(i._id)} disabled={i.statut === "Terminée"}
                   title={i.statut === "Terminée" ? "Intervention déjà terminée" : ""}> Terminer </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TechnicienDashboard;