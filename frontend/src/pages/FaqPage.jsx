const faqItems = [
  {
    q: '1. Comment puis-je contacter votre service client si j’ai une question ?',
    a: 'Besoin d’aide ? Notre équipe est à votre service. Contactez-nous par e-mail ou sur le formulaire de la page d’accueil, et nous vous répondrons avec plaisir dans les plus brefs délais.',
  },
  {
    q: '2. Vos paiements en ligne sont-ils vraiment sécurisés ?',
    a: 'Oui, sans aucun doute. Nous utilisons un cryptage SSL de haute technologie pour garantir des paiements en toute sécurité, où que vous soyez.',
  },
  {
    q: '3. Que se passe-t-il si je ne suis pas satisfait de mon achat ?',
    a: 'Pas de souci ! Vous avez 30 jours pour changer d’avis et nous retourner votre article gratuitement, avec un remboursement ou un échange selon votre choix.',
  },
  {
    q: '4. La livraison est-elle vraiment gratuite partout ?',
    a: 'Oui, totalement ! Nous offrons la livraison gratuite dans le monde entier, sans frais cachés, pour que vous profitiez de vos produits où que vous soyez.',
  },
  {
    q: '5. Combien de temps faut-il pour recevoir ma commande ?',
    a: 'Nous expédions votre colis sous 24 à 48 heures. Pour les délais exacts, consultez les informations de livraison sur chaque fiche produit. Un suivi vous est fourni pour tout tracer !',
  },
  {
    q: '6. Vos produits tiennent-ils leurs promesses ?',
    a: 'Absolument. Chaque article est choisi pour sa qualité et son efficacité, testé pour durer et rendre votre quotidien plus agréable. Des clients ravis en parlent déjà !',
  },
  {
    q: '7. Que faire si un produit est en rupture de stock ?',
    a: 'Pas de panique, notre catalogue se renouvelle souvent. Abonnez-vous à notre newsletter pour être informé des retours en stock et des nouveaux arrivages.',
  },
  {
    q: '8. Proposez-vous des promotions ou des avantages exclusifs ?',
    a: 'Oui, tout le temps ! Inscrivez-vous à notre newsletter pour découvrir nos réductions spéciales, nouveaux produits et offres réservées à nos abonnés.',
  },
  {
    q: '9. Comment être sûr que ma commande est bien enregistrée ?',
    a: 'Dès validation, vous recevez un e-mail de confirmation avec tous les détails et un lien de suivi. Vous ne perdez jamais le fil !',
  },
  {
    q: '10. Puis-je commander depuis l’étranger sans problème ?',
    a: 'Bien sûr ! Avec la livraison offerte dans le monde entier et des paiements sécurisés, Vivaly s’adapte à vous, où que vous soyez.',
  },
];

function FaqPage() {
  return (
    <section className="faq-page" aria-labelledby="faq-titre">
      <h1 id="faq-titre" className="faq-title">
        FAQ - Questions Fréquentes
      </h1>

      <div className="faq-list" role="list" aria-label="Liste des questions fréquemment posées">
        {faqItems.map((item) => (
          <div key={item.q} className="faq-item" role="listitem">
            <h2>{item.q}</h2>
            <p>{item.a}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default FaqPage;