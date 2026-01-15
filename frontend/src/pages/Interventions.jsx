import { useState } from 'react';
import Navbar from "../components/Navbar";

function Interventions() {
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <div className="page">
      <Navbar />
      <h1>Gestion des interventions</h1>
      <br /><br />

      <button className="btn-primary" onClick={toggleForm}>
        {showForm ? 'Annuler' : 'Ajouter une intervention'}
      </button>

      {showForm && (
        <div className="formulaire">
          <h3>Ajouter une intervention</h3>
          <form>
            <label>Incident</label>
            <select>
              <option>Panne serveur</option>
              <option>Problème réseau</option>
            </select>

            <label>Technicien</label>
            <select>
              <option>Ahmed Ben Ali</option>
              <option>Mohamed Ben Mohamed</option>
            </select>

            <label>Date d’intervention</label>
            <input type="date" />

            <label>Statut</label>
            <select>
              <option value="en_cours">En cours</option>
              <option value="terminee">Terminée</option>
            </select>

            <label>Commentaire</label>
            <input type="text" placeholder="Ajouter un commentaire" />

            <button type="submit">Enregistrer</button>
          </form>
        </div>
      )}

      <table>
        <thead>
          <tr>
            <th>Incident</th>
            <th>Technicien</th>
            <th>Date</th>
            <th>Statut</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Panne serveur</td>
            <td>Ahmed Ben Ali</td>
            <td>13/01/2026</td>
            <td>Terminée</td>
            <td>
              <button className="btn-primary">Modifier</button>
              <button className="btn-danger">Supprimer</button>
            </td>
          </tr>

          <tr>
            <td>Problème réseau</td>
            <td>Mohamed Ben Mohamed</td>
            <td>14/01/2026</td>
            <td>En cours</td>
            <td>
              <button className="btn-primary">Modifier</button>
              <button className="btn-danger">Supprimer</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Interventions;
