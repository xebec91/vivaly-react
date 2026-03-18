import LegalPageLayout from '../components/legal/LegalPageLayout';

function ConfidentialitePage() {
  return (
    <LegalPageLayout
      title="Politique de Confidentialité"
      intro="Chez Vivaly, nous prenons la protection de vos données personnelles très au sérieux. Cette politique explique comment nous collectons, utilisons et protégeons vos informations lorsque vous visitez notre site ou passez une commande."
    >
      <div className="legal-block">
        <h2>1. Quelles données collectons-nous ?</h2>
        <p>Nous recueillons uniquement les informations nécessaires pour vous offrir la meilleure expérience :</p>
        <ul>
          <li><strong>Identité</strong> : nom, prénom, adresse e-mail.</li>
          <li><strong>Coordonnées</strong> : adresse de livraison, numéro de téléphone (facultatif).</li>
          <li><strong>Paiement</strong> : données de transaction (via nos partenaires sécurisés, pas stockées par nous).</li>
          <li><strong>Navigation</strong> : cookies pour améliorer votre visite (ex. : préférences, panier).</li>
        </ul>
      </div>

      <div className="legal-block">
        <h2>2. Pourquoi utilisons-nous ces données ?</h2>
        <ul>
          <li>Pour traiter vos commandes : expédition, suivi, retours.</li>
          <li>Pour vous informer : confirmations, mise à jour sur votre livraison, ou newsletter (si vous vous abonnez).</li>
          <li>Pour améliorer notre site : analyser les tendances et optimiser votre expérience.</li>
        </ul>
      </div>

      <div className="legal-block">
        <h2>3. Comment protégeons-nous vos données ?</h2>
        <ul>
          <li>Elles sont sécurisées via un cryptage SSL sur notre site.</li>
          <li>Nous ne vendons ni ne partageons vos informations avec des tiers, sauf pour les besoins logistiques ou légaux.</li>
          <li>Vos données de paiement sont gérées par des prestataires certifiés et ne transitent pas par nos serveurs.</li>
        </ul>
      </div>

      <div className="legal-block">
        <h2>4. Combien de temps conservons-nous vos données ?</h2>
        <ul>
          <li>Les données de commande sont gardées 5 ans pour des raisons comptables.</li>
          <li>Les données de navigation (cookies) sont conservées 13 mois maximum.</li>
          <li>Si vous vous désabonnez de notre newsletter, votre e-mail est supprimé immédiatement de cette liste.</li>
        </ul>
      </div>

      <div className="legal-block">
        <h2>5. Vos droits :</h2>
        <p>Conformément à la loi, vous pouvez :</p>
        <ul>
          <li>Accéder à vos données.</li>
          <li>Demander leur modification ou suppression.</li>
          <li>Refuser les cookies non essentiels.</li>
          <li>Pour exercer ces droits, écrivez-nous à <a href="mailto:contact@vivaly.fr">contact@vivaly.fr</a>. Nous répondons sous 30 jours.</li>
        </ul>
      </div>

      <div className="legal-block">
        <h2>6. Cookies :</h2>
        <p>Nous utilisons des cookies pour :</p>
        <ul>
          <li>Assurer le bon fonctionnement du site (ex. : panier).</li>
          <li>Analyser les visites (anonymisées).</li>
          <li>Vous proposer vos préférences dans les paramètres de votre navigateur.</li>
        </ul>
      </div>

      <div className="legal-block">
        <h2>7. Une question ou réclamation ?</h2>
        <p>
          Contactez-nous à <a href="mailto:contact@vivaly.fr">contact@vivaly.fr</a>. Notre équipe est disponible pour vous aider.
          <br />
          Si besoin, vous pouvez adresser une réclamation à l’autorité de protection des données.
          <br />
          Chez Vivaly, vos données sont entre de bonnes mains. Merci de nous faire confiance !
        </p>
      </div>
    </LegalPageLayout>
  );
}

export default ConfidentialitePage;