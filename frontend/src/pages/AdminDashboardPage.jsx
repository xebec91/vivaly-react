import { Link } from 'react-router-dom';

function AdminDashboardPage() {
  return (
    <section className="admin-dashboard-page">
      <h1 className="admin-dashboard-title">Tableau de bord administrateur</h1>

      <div className="admin-welcome-box">
        <h2>Bienvenue sur votre espace d'administrateur !</h2>
        <p>
          Gérez les utilisateurs, surveillez l'activité du site et accédez
          rapidement aux fonctions essentielles.
        </p>
      </div>

      <div className="admin-dashboard-grid">
        <Link to="/admin/users" className="admin-dashboard-card admin-dashboard-card-users">
          <h2>
            <svg className="admin-dashboard-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m9-4a4 4 0 10-8 0 4 4 0 008 0z" />
            </svg>
            Gérer les utilisateurs
          </h2>
          <p>Ajouter, modifier, supprimer des comptes utilisateurs.</p>
        </Link>

        <Link to="/" className="admin-dashboard-card admin-dashboard-card-site">
          <h2>
            <svg className="admin-dashboard-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M13 5v6h6m-6 0H7m6 0v6m0 0H7m6 0h6" />
            </svg>
            Retour au site
          </h2>
          <p>Voir la boutique comme un client.</p>
        </Link>
      </div>
    </section>
  );
}

export default AdminDashboardPage;