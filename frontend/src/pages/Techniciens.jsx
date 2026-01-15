import { useState } from "react";
import Navbar from "../components/Navbar";

function Techniciens() {

  const [techniciens, setTechniciens] = useState([
    {
      nom: "Ahmed Ben Ali",
      specialite: "Réseaux",
      email:"ahmed@exemple.com",
      password: "111",
      telephone: "21 345 678",
    },
    {
      nom: "Mohamed Ben Mohamed ",
      specialite: "Systèmes",
      email:"mohamed@exemple.com",
      password: "123",
      telephone: "25 987 654",
    }
  ]);

  const [form, setForm] = useState({
    nom: "",
    specialite: "",
    email:"",
    password: "",
    telephone: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setTechniciens([...techniciens, form]);

    setForm({
      nom: "",
      specialite: "",
      email: "",
      password: "",
      telephone: "",
    });
  };

  const handleDelete = (indexToDelete) => {
  const newList = techniciens.filter((_, index) => index !== indexToDelete);
  setTechniciens(newList);
};


  return (
    <div className="page">
      <Navbar />
      <h1>Gestion des techniciens</h1>
      
      <form className="formulaire" onSubmit={handleSubmit}>
        <h3>Ajouter un technicien</h3>

        <input
          type="text"
          name="nom"
          placeholder="Nom"
          value={form.nom}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="specialite"
          placeholder="Spécialité"
          value={form.specialite}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Mot de passe"
          value={form.password}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="telephone"
          placeholder="Téléphone"
          value={form.telephone}
          onChange={handleChange}
          required
        />


        <button className="btn-primary">Ajouter</button>
      </form>

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
          {techniciens.map((tech, index) => (
            <tr key={index}>
              <td>{tech.nom}</td>
              <td>{tech.specialite}</td>
              <td>{tech.email}</td>
              <td>{tech.password}</td>
              <td>{tech.telephone}</td>
              <td>
                <button className="btn-danger"onClick={() => handleDelete(index)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Techniciens;

