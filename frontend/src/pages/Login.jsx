import "../assets/Login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5000/api/auth/login";

function Login() {
  const navigate = useNavigate();
  
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, motDePasse }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Erreur de connexion");
        return;
      }

      localStorage.setItem("user", JSON.stringify(data));

      if (data.role === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/technicien");
      }
    } catch (err) {
      setError("Erreur serveur");
    }
  };

  return (
    <div className="login-container">
      <h2>Connexion</h2>

      <form onSubmit={handleLogin}>
        <div>
          <label>Email</label>
          <input
            type="text"
            placeholder="Entrer votre email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Mot de passe</label>
          <input
            type="password"
            placeholder="Entrer votre mot de passe"
            value={motDePasse}
            onChange={(e) => setMotDePasse(e.target.value)}
            required
          />
        </div>

        {error && <p className="error">{error}</p>}

        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
}

export default Login;