import { Link } from 'react-router-dom';
import LegalPageLayout from '../components/legal/LegalPageLayout';

function CgvPage() {
  return (
    <LegalPageLayout
      title="Conditions Générales de Vente"
      intro="Les présentes Conditions Générales de Vente (CGV) régissent les transactions effectuées sur Vivaly. En passant commande, vous acceptez ces termes dans leur intégralité. Lisez-les attentivement."
    >
      <div className="legal-block">
        <h2>1. Informations sur l’Entreprise :</h2>
        <p>
          Vivaly est une boutique en ligne accessible à tous. Pour toute question,
          contactez-nous à <a href="mailto:contact@vivaly.fr">contact@vivaly.fr</a>.
        </p>
      </div>

      <div className="legal-block">
        <h2>2. Produits et Prix :</h2>
        <ul>
          <li>Les produits proposés sur Vivaly sont décrits avec soin. Des erreurs mineures peuvent survenir, sans engagement de notre part.</li>
          <li>Les prix sont affichés en euros (€), taxes comprises (TTC). La livraison est offerte dans le monde entier.</li>
        </ul>
      </div>

      <div className="legal-block">
        <h2>3. Processus de Commande :</h2>
        <ul>
          <li>Pour commander : sélectionnez vos articles, ajoutez-les au panier, puis validez votre paiement.</li>
          <li>Une confirmation vous est envoyée par e-mail à la validation.</li>
        </ul>
      </div>

      <div className="legal-block">
        <h2>4. Paiement :</h2>
        <ul>
          <li>Les paiements sont sécurisés via un cryptage SSL.</li>
          <li>La transaction est débitée à la validation de la commande.</li>
        </ul>
      </div>

      <div className="legal-block">
        <h2>5. Livraison :</h2>
        <ul>
          <li>Les colis sont expédiés sous 24 à 48 heures après validation.</li>
          <li>La livraison est gratuite partout dans le monde.</li>
        </ul>
      </div>

      <div className="legal-block">
        <h2>6. Droit de Rétractation et Retours :</h2>
        <ul>
          <li>Vous avez 30 jours à compter de la réception pour vous rétracter et retourner vos articles gratuitement.</li>
          <li>Les produits doivent être non utilisés, dans leur emballage d’origine.</li>
          <li>Le remboursement ou l’échange est traité sous 10 jours ouvrés après réception du colis.</li>
          <li>Voir notre <Link to="/retour">Politique de Retour</Link>.</li>
        </ul>
      </div>

      <div className="legal-block">
        <h2>7. Garanties :</h2>
        <ul>
          <li>Les produits bénéficient de la garantie légale de conformité (2 ans) et contre les vices cachés.</li>
          <li>En cas de défaut, contactez <a href="mailto:contact@vivaly.fr">contact@vivaly.fr</a>.</li>
        </ul>
      </div>

      <div className="legal-block">
        <h2>8. Responsabilité :</h2>
        <ul>
          <li>Vivaly s’engage à fournir des produits de qualité mais ne peut être tenu responsable des dommages dus à une mauvaise utilisation.</li>
          <li>Les descriptions et photos sont indicatives et non contractuelles.</li>
        </ul>
      </div>

      <div className="legal-block">
        <h2>9. Données Personnelles :</h2>
        <p>
          Vos informations sont protégées selon notre{' '}
          <Link to="/confidentialite">Politique de Confidentialité</Link>.
          Elles servent uniquement à traiter votre commande et améliorer votre expérience.
        </p>
      </div>

      <div className="legal-block">
        <h2>10. Litiges et Droit Applicable :</h2>
        <p>
          Ces CGV sont régies par le droit français. En cas de litige, une solution amiable est privilégiée via{' '}
          <a href="mailto:contact@vivaly.fr">contact@vivaly.fr</a>.
        </p>
      </div>

      <div className="legal-block">
        <h2>11. Contact :</h2>
        <p>
          Pour toute question, notre équipe est disponible à{' '}
          <a href="mailto:contact@vivaly.fr">contact@vivaly.fr</a>.
        </p>
      </div>

      <div className="legal-block">
        <p>
          En commandant sur Vivaly, vous profitez d’un service fiable et transparent. Merci de votre confiance !
        </p>
      </div>
    </LegalPageLayout>
  );
}

export default CgvPage;