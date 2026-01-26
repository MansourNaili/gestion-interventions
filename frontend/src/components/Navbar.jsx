import { Link } from "react-router-dom";
import "../assets/Navbar.css"

function Navbar(){
    const handleLogout=()=>{
        window.location.href="/login";
    };
    return (
        <nav className="navbar">
            <h3>Gestion des incidents</h3>
        <ul>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/incidents">Incidents</Link></li>
            <li><Link to="/interventions">Interventions</Link></li>
            <li><Link to="/techniciens">Techniciens</Link></li>
        </ul>
        <button onClick={handleLogout} className="logout-button">Déconnexion</button>
        </nav>
    );
}
export default Navbar;