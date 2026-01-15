import { useState } from 'react';
import Navbar from "../components/Navbar";

function Incidents() {
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <div className="page">
      <Navbar />
      <h1>Gestion des incidents</h1>
      <br /><br />
      <button className="btn-primary" onClick={toggleForm}>
        {showForm ? 'Annuler' : 'Ajouter un incident'}
      </button>

      {showForm && (
        <div className="formulaire">
          <h3>Ajouter un incident</h3>
          <form>
            <label>Titre</label>
            <input type="text" placeholder="Titre de l'incident" />

            <label>Description</label>
            <input type="text" placeholder="Description" />

            <button type="submit">Enregistrer</button>
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
          <tr>
            <td>Problème réseau</td>
            <td>Connexion instable</td>
            <td>12/01/2026</td>
            <td>En cours</td>
            <td>
              <button className="btn-primary">Modifier</button>
              <button className="btn-danger">Supprimer</button>
            </td>
          </tr>

          <tr>
            <td>Panne serveur</td>
            <td>Serveur indisponible</td>
            <td>10/01/2026</td>
            <td>Résolu</td>
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

export default Incidents;


