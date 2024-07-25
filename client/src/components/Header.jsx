import { useContext } from 'react';
import './Header.css';
import { Link, useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie';
import { AuthContext } from '../store/AuthContext';

const Header = () => {
  const { currentUser } = useContext(AuthContext);
  const [cookies, setCookie, removeCookie] = useCookies();
  const navigate = useNavigate("")

  const handleSignOut = () => {
    removeCookie("token")
    navigate('/auth')
  }

  return (
    <header className="headerhead">
      <h1>Garage Auto</h1>
      {!currentUser && <Link to="/auth">
        <button className="login-button">Connexion</button>
      </Link>}
      {currentUser && <div className='logout-button' onClick={handleSignOut}>Se deconnecter</div>}
    </header>
  );
};

export default Header;
