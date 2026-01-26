import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import {getTechniciens,addTechnicien,updateTechnicien,deleteTechnicien,} from "../services/techniciensApi";

function Techniciens() {
  const [techniciens, setTechniciens] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [idEdit, setIdEdit] = useState(null);

  const [nom, setNom] = useState("");
  const [specialite, setSpecialite] = useState("");
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [telephone, setTelephone] = useState("");

  useEffect(() => {
    fetchTechniciens();
  }, []);

  const fetchTechniciens = async () => {
    const data = await getTechniciens();
    setTechniciens(data);
  };

  const toggleForm = () => {
    setShowForm(!showForm);
    resetForm();
  };

  const resetForm = () => {
    setNom("");
    setSpecialite("");
    setEmail("");
    setMotDePasse("");
    setTelephone("");
    setIsEdit(false);
    setIdEdit(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isEdit) {
      await updateTechnicien(idEdit, {
        nom,
        specialite,
        email,
        telephone,
      });
    } else {
      await addTechnicien({
        nom,
        specialite,
        email,
        motDePasse,
        telephone,
      });
    }

    resetForm();
    setShowForm(false);
    fetchTechniciens();
  };

  const handleDelete = async (id) => {
    await deleteTechnicien(id);
    fetchTechniciens();
  };

  const handleEdit = (tech) => {
    setNom(tech.nom);
    setSpecialite(tech.specialite);
    setEmail(tech.email);
    setTelephone(tech.telephone);

    setIsEdit(true);
    setIdEdit(tech._id);
    setShowForm(true);
  };

  return (
    <div className="page">
      <Navbar />
      <h1>Gestion des techniciens</h1>
      <br />
      <button className="btn-primary" onClick={toggleForm}>
        {showForm ? "Annuler" : "Ajouter un technicien"}
      </button>

      {showForm && (
        <div className="formulaire">
          <h3>{isEdit ? "Modifier le technicien" : "Ajouter un technicien"}</h3>

          <form onSubmit={handleSubmit}>
            <label>Nom</label>
            <input value={nom} onChange={(e) => setNom(e.target.value)} required />

            <label>Spécialité</label>
            <input value={specialite} onChange={(e) => setSpecialite(e.target.value)} required />

            <label>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

            {!isEdit && (
              <>
                <label>Mot de passe</label>
                <input value={motDePasse} onChange={(e) => setMotDePasse(e.target.value)} required />
              </>
            )}

            <label>Téléphone</label>
            <input value={telephone} onChange={(e) => setTelephone(e.target.value)} />

            <button type="submit" className="btn-primary">
              {isEdit ? "Modifier" : "Enregistrer"}
            </button>
          </form>
        </div>
      )}

      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Spécialité</th>
            <th>Email</th>
            <th>Mot de passe</th>
            <th>Téléphone</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {techniciens.map((tech) => (
            <tr key={tech._id}>
              <td>{tech.nom}</td>
              <td>{tech.specialite}</td>
              <td>{tech.email}</td>
              <td>{tech.motDePasse}</td>
              <td>{tech.telephone}</td>
              <td className="actions-cell">
                <button className="btn-primary" onClick={() => handleEdit(tech)}> Modifier </button>
                <button className="btn-danger" onClick={() => handleDelete(tech._id)}> Supprimer </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Techniciens;