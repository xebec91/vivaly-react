import LegalPageLayout from '../components/legal/LegalPageLayout';

function LivraisonPage() {
  return (
    <LegalPageLayout
      title="Politique de Livraison"
      intro="Chez Vivaly, nous faisons tout pour que vos produits vous parviennent rapidement et sans effort. Voici les détails de notre service de livraison."
    >
      <div className="legal-block">
        <h2>1. Livraison Offerte Partout :</h2>
        <ul>
          <li>La livraison est gratuite dans le monde entier, sans minimum d’achat ni frais cachés.</li>
          <li>Peu importe où vous êtes, nous livrons jusqu’à vous.</li>
        </ul>
      </div>

      <div className="legal-block">
        <h2>2. Délais d’Expédition et de Livraison :</h2>
        <ul>
          <li>Votre commande est préparée et expédiée sous 24 à 48 heures (jours ouvrés).</li>
          <li>Les délais de livraison dépendent de chaque produit, mais sont généralement de 7 à 14 jours.</li>
          <li>Un numéro de suivi vous est envoyé par e-mail à l’expédition pour suivre votre colis en direct.</li>
        </ul>
      </div>

      <div className="legal-block">
        <h2>3. Comment Ça Marche ?</h2>
        <ul>
          <li>Après validation de votre commande, nous la préparons avec soin.</li>
          <li>Nous travaillons avec des transporteurs fiables pour assurer une livraison sécurisée.</li>
          <li>Une confirmation d’expédition vous parvient avec toutes les informations nécessaires.</li>
        </ul>
      </div>

      <div className="legal-block">
        <h2>4. Problème Avec Votre Livraison ?</h2>
        <ul>
          <li>Colis perdu ou abîmé ? Contactez-nous à <a href="mailto:contact@vivaly.fr">contact@vivaly.fr</a>.</li>
          <li>Notre équipe, disponible 7 jours sur 7, vous répondra sous 24 heures pour tout régler.</li>
        </ul>
      </div>

      <div className="legal-block">
        <h2>5. Livraison Internationale :</h2>
        <p>
          Nous livrons partout ! Hors Europe, les délais peuvent s’étendre légèrement
          (jusqu’à 15-20 jours selon les destinations). Vérifiez sur la fiche produit.
        </p>
      </div>

      <div className="legal-block">
        <p>
          Avec Vivaly, profitez d’une livraison gratuite et d’un suivi pour un quotidien simplifié !
        </p>
      </div>
    </LegalPageLayout>
  );
}

export default LivraisonPage;