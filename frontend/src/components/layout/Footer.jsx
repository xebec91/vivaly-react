import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="footer-grid">
          <div className="footer-column">
            <img
              src="/assets/images/logo_black.png"
              alt="Vivaly Logo"
              className="footer-logo"
            />
            <p>
              Chez Vivaly, chaque produit est soigneusement conçu pour conjuguer
              style, confort et élégance à votre vie.
            </p>
          </div>

          <div className="footer-column">
            <h3>Menu Principal</h3>
            <ul>
              <li><Link to="/">Page d'accueil</Link></li>
              <li><Link to="/catalogue">Catalogue</Link></li>
              <li><Link to="/histoire">Notre Histoire</Link></li>
              <li><Link to="/faq">FAQ - Questions fréquentes</Link></li>
              <li><Link to="/suivi">Suivre ma commande</Link></li>
              <li><Link to="/contact">Contactez-nous</Link></li>
            </ul>
          </div>

          <div className="footer-column">
            <h3>Mentions Légales</h3>
            <ul>
              <li><Link to="/retour">Politique de Retour</Link></li>
              <li><Link to="/confidentialite">Politique de Confidentialité</Link></li>
              <li><Link to="/livraison">Politique de Livraison</Link></li>
              <li><Link to="/utilisation">Conditions d'Utilisation</Link></li>
              <li><Link to="/cgv">Conditions Générales de Ventes</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-payments-wrapper">
          <div className="footer-payments">
            <img src="/assets/images/amex.png" alt="American Express" />
            <img src="/assets/images/applepay.png" alt="Apple Pay" />
            <img src="/assets/images/mastercard.png" alt="Mastercard" />
            <img src="/assets/images/visa.png" alt="Visa" />
          </div>
          <p className="footer-copy">© 2026, Vivaly</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;