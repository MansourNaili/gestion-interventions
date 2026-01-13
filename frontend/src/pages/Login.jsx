import '../assets/Login.css'
import { Link } from 'react-router-dom';

function Login() {
  return (
    <div className="login-container">
      <h2>Connexion</h2>

      <form>
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
       <p>Ou allez au <Link to="/dashboard">tableau de bord</Link> pour tester.</p>
    </div>
  )
}

export default Login
