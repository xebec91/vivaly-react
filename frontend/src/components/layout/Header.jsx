import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

function Header() {
  const { totalItems } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const isAdmin = user?.role === 'admin';

  async function handleLogout() {
    await logout();
    navigate('/login');
  }

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <div className="site-header-logo">
          <Link to="/" aria-label="Retour à l'accueil">
            <img
              src="/assets/images/logo_white.png"
              alt="Logo Vivaly"
              className="site-logo-image"
            />
          </Link>
        </div>

        <nav className="site-header-nav" aria-label="Navigation principale">
          <Link to="/">Page d'accueil</Link>
          <Link to="/catalogue">Catalogue</Link>
          <Link to="/histoire">Notre Histoire</Link>
          <Link to="/faq">FAQ - Questions fréquentes</Link>
          <Link to="/suivi">Suivre ma commande</Link>
          <Link to="/contact">Contactez-nous</Link>
        </nav>

        <div className="site-header-actions">
          <Link to="/cart" className="header-icon-link" title="Panier" aria-label="Panier">
            <svg className="header-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            {totalItems > 0 && <span className="header-badge">{totalItems}</span>}
          </Link>

          {isAuthenticated ? (
            <>
              {isAdmin && (
                <Link
                  to="/admin"
                  className="header-icon-link"
                  title="Tableau de bord admin"
                  aria-label="Tableau de bord admin"
                >
                  <img
                    src="/assets/images/admin.png"
                    alt="Admin"
                    className="header-image-icon"
                  />
                </Link>
              )}

              <Link to="/account" className="header-icon-link" title="Mon compte" aria-label="Mon compte">
                <svg className="header-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                className="header-icon-button"
                title="Se déconnecter"
                aria-label="Se déconnecter"
              >
                <svg className="header-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1"
                  />
                </svg>
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="header-icon-link" title="Connexion" aria-label="Connexion">
                <img
                  src="/assets/images/connexion.png"
                  alt="Connexion"
                  className="header-image-icon"
                />
              </Link>

              <Link to="/register" className="header-icon-link" title="Inscription" aria-label="Inscription">
                <img
                  src="/assets/images/inscription.png"
                  alt="Inscription"
                  className="header-image-icon"
                />
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;