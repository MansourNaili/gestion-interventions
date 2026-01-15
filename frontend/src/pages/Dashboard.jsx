import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import '../assets/Dashboard.css'
import { FaBug, FaTools, FaUsers } from 'react-icons/fa'

function Dashboard() {
  return (
    <div className="dashboard">
      <Navbar />
      <h2>Tableau de bord</h2>

      <div className="cards">
        <div className="card">
          <FaBug className="icon" />
          <h3>Incidents</h3>
          <p className="number">12</p>
        </div>

        <div className="card">
          <FaTools className="icon" />
          <h3>Interventions</h3>
          <p className="number">8</p>
        </div>

        <div className="card">
          <FaUsers className="icon" />
          <h3>Techniciens</h3>
          <p className="number">5</p>
        </div>
      </div>
    </div>
  )
}

export default Dashboard


