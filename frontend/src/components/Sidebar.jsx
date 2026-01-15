import { Link } from "react-router-dom";
import "../assets/Sidebar.css";

function Sidebar(){
    return (
        <aside className="sidebar">
            <ul>
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li><Link to="/incidents">Incidents</Link></li>
                <li><Link to="/interventions">Interventions</Link></li>
                <li><Link to="/techniciens">Techniciens</Link></li>
            </ul>
        </aside>
    );
}
export default Sidebar;