import '../assets/Login.css'
import {useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };
  return (
    <div className="login-container">
      <h2>Connexion</h2>

      <form onSubmit={handleLogin}>
        <div>
          <label>Email</label>
          <input type="email" placeholder="Entrer votre email" />
        </div>

        <div>
          <label>Mot de passe</label>
          <input type="password" placeholder="Entrer votre mot de passe" />
        </div>

        <button type="submit">Se connecter</button>
      </form>
    </div>
  )
}

export default Login
