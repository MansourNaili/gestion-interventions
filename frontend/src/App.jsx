import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Incidents from './pages/Incidents';
import Interventions from './pages/Interventions';
import Techniciens from './pages/Techniciens';
import TechnicienDashboard from "./pages/TechnicienDashboard";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/incidents" element={<Incidents />} />
        <Route path="/interventions" element={<Interventions />} />
        <Route path="/techniciens" element={<Techniciens />} />
        <Route path="/technicien" element={<TechnicienDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;


