import "../assets/app.css"
function TechnicienHeader({ user }) {
  return (
    <div className="tech-header">
      <h2>Espace Technicien</h2>
      <div className="tech-info">
        <span>Bienvenue, {user.nom}</span>
      </div>
      <button
          className="logout-button"
          onClick={() => {
            localStorage.removeItem("user");
            window.location.href = "/"; 
            }} >Déconnexion
        </button>
    </div>
  );
}

export default TechnicienHeader;