import { Link } from 'react-router-dom';
import LegalPageLayout from '../components/legal/LegalPageLayout';

function UtilisationPage() {
  return (
    <LegalPageLayout
      title="Conditions d'Utilisation"
      intro="Bienvenue sur Vivaly ! En utilisant notre site, vous acceptez les conditions décrites ci-dessous. Elles régissent votre accès et votre utilisation de notre boutique en ligne. Lisez-les attentivement."
    >
      <div className="legal-block">
        <h2>1. Acceptation des Conditions :</h2>
        <ul>
          <li>En naviguant ou en passant commande sur Vivaly, vous vous engagez à respecter ces conditions.</li>
          <li>Si vous n’êtes pas d’accord, nous vous invitons à ne pas utiliser notre site.</li>
        </ul>
      </div>

      <div className="legal-block">
        <h2>2. Utilisation du Site :</h2>
        <ul>
          <li>Le site est destiné à un usage personnel et non commercial.</li>
          <li>Vous vous engagez à ne pas :</li>
          <ul>
            <li>Copier ou reproduire nos contenus sans autorisation.</li>
            <li>Utiliser le site de manière illégale ou nuisible.</li>
          </ul>
        </ul>
      </div>

      <div className="legal-block">
        <h2>3. Commandes et Paiements :</h2>
        <ul>
          <li>Toute commande passée sur Vivaly est soumise à disponibilité des stocks.</li>
          <li>Les prix affichés incluent les taxes applicables, mais la livraison est offerte partout.</li>
          <li>Les paiements sont sécurisés via un cryptage SSL et traités par nos partenaires de confiance.</li>
        </ul>
      </div>

      <div className="legal-block">
        <h2>4. Propriété Intellectuelle :</h2>
        <ul>
          <li>Tous les éléments du site Vivaly sont notre propriété ou celle de nos partenaires.</li>
          <li>Toute reproduction ou utilisation sans accord écrit est interdite.</li>
        </ul>
      </div>

      <div className="legal-block">
        <h2>5. Responsabilité :</h2>
        <ul>
          <li>Nous mettons tout en œuvre pour que les informations sur Vivaly soient exactes, mais des erreurs peuvent survenir.</li>
          <li>Nous ne sommes pas responsables des dommages liés à une mauvaise utilisation des produits ou des interruptions du site.</li>
        </ul>
      </div>

      <div className="legal-block">
        <h2>6. Retours et Remboursements :</h2>
        <ul>
          <li>Vous disposez de 30 jours pour retourner un produit gratuitement, selon notre <Link to="/retour">Politique de Retour</Link>.</li>
          <li>Les détails sont disponibles dans la section dédiée.</li>
        </ul>
      </div>

      <div className="legal-block">
        <h2>7. Modifications des Conditions :</h2>
        <ul>
          <li>Nous pouvons mettre à jour ces conditions à tout moment. Les changements s’appliquent dès leur publication sur le site.</li>
          <li>Consultez cette page régulièrement pour rester informé.</li>
        </ul>
      </div>

      <div className="legal-block">
        <h2>8. Droit Applicable :</h2>
        <p>Ces conditions sont régies par le droit français. Tout litige sera soumis aux tribunaux compétents en France.</p>
      </div>

      <div className="legal-block">
        <h2>9. Nous Contacter :</h2>
        <p>
          Une question ou un problème ? Écrivez-nous à{' '}
          <a href="mailto:contact@vivaly.fr">contact@vivaly.fr</a>.
          <br />
          Notre équipe est disponible 7 jours sur 7 pour vous répondre.
        </p>
      </div>

      <div className="legal-block">
        <p>
          En choisissant Vivaly, vous optez pour une expérience simple et fiable. Merci de votre confiance !
        </p>
      </div>
    </LegalPageLayout>
  );
}

export default UtilisationPage;