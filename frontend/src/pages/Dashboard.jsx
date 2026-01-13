import { Link } from 'react-router-dom';
function Dashboard() {
  return (
    <div>
      <h2>Tableau de bord</h2>
      <p>Bienvenue sur le tableau de bord !</p>
       <Link to="/">Retour à la connexion</Link>
    </div>
  );
}

export default Dashboard;
