import HomePage from './components/HomePage';
import { BrowserRouter as Router, Route, Routes, Navigate, Outlet } from 'react-router-dom';
import AuthPage from './components/AuthPage';
import './App.css';
import { useContext } from 'react';
import { AuthContext } from './store/AuthContext';
import Dashboard from './components/Dashboard';


const ProtectedRoute = () => {
  const { currentUser } = useContext(AuthContext);

  //Si on a pas de currentUser (si le user n'est pas connecté)
  // retour a la page de connexion
  if (!currentUser) {
    return <Navigate to="/auth" replace />;
  }

  //Sinon on affiche la page souhaitée
  return <Outlet />;
};

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<AuthPage />} />

          {/* Création des routes protégées (accessible que quand on est connecté) */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>

        </Routes>
      </div>
    </Router>
  );
}

export default App;