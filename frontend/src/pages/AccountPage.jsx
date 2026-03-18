import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function AccountPage() {
  const { user, isAuthenticated, authLoading, logout } = useAuth();

  if (authLoading) {
    return <p>Chargement...</p>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  async function handleLogout() {
    await logout();
  }

  return (
    <main className="account-page">
      <h1>Mon compte</h1>

      <div className="account-card">
        <p><strong>Prénom :</strong> {user.first_name}</p>
        <p><strong>Nom :</strong> {user.last_name}</p>
        <p><strong>Email :</strong> {user.email}</p>
        <p><strong>Rôle :</strong> {user.role}</p>

        <div className="account-actions">
          <Link to="/">Retour à la boutique</Link>
          <button onClick={handleLogout}>Se déconnecter</button>
        </div>
      </div>
    </main>
  );
}

export default AccountPage;