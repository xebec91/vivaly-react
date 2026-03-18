import LegalPageLayout from '../components/legal/LegalPageLayout';

function RetourPage() {
  return (
    <LegalPageLayout
      title="Politique de Retour"
      intro="Chez Vivaly, votre satisfaction est notre priorité. Si un produit ne vous convient pas, nous avons rendu les retours simples et gratuits."
    >
      <div className="legal-block">
        <h2>CONDITIONS DE RETOUR :</h2>
        <ul>
          <li>Vous disposez de 30 jours à compter de la réception de votre commande pour changer d’avis.</li>
          <li>Les articles doivent être retournés dans leur état d’origine : non utilisés, non endommagés, avec leurs étiquettes et emballages d’origine.</li>
          <li>Les frais de retour sont offerts par Vivaly – vous n’avez rien à débourser.</li>
        </ul>
      </div>

      <div className="legal-block">
        <h2>COMMENT RETOURNER UN PRODUIT ?</h2>
        <ol>
          <li>Contactez-nous à <a href="mailto:contact@vivaly.fr">contact@vivaly.fr</a> en indiquant votre numéro de commande et le motif de votre retour.</li>
          <li>Nous vous enverrons une étiquette de retour prépayée à imprimer et à coller sur votre colis.</li>
          <li>Déposez votre colis dans un point relais ou une boîte aux lettres près de chez vous.</li>
          <li>Une fois votre retour reçu et vérifié (sous 5 à 7 jours ouvrés), nous procédons à votre remboursement ou échange, selon votre préférence.</li>
        </ol>
      </div>

      <div className="legal-block">
        <h2>REMBOURSEMENT OU ÉCHANGE :</h2>
        <ul>
          <li>Les remboursements sont effectués via le mode de paiement initial, sous 10 jours ouvrés après réception du retour.</li>
          <li>Si vous préférez un échange, indiquez-le lors de votre demande à <a href="mailto:contact@vivaly.fr">contact@vivaly.fr</a>. Les frais d’envoi du nouvel article sont également gratuits.</li>
        </ul>
      </div>

      <div className="legal-block">
        <h2>UNE QUESTION ?</h2>
        <p>
          Notre équipe est là pour vous aider 7 jours sur 7. Écrivez-nous à{' '}
          <a href="mailto:contact@vivaly.fr">contact@vivaly.fr</a>, et nous vous guiderons à chaque étape.
          <br />
          Avec Vivaly, acheter en toute tranquillité : nous sommes à vos côtés pour que tout se passe bien !
        </p>
      </div>
    </LegalPageLayout>
  );
}

export default RetourPage;