import { Link } from 'react-router-dom';

function CheckoutCancelPage() {
  return (
    <main className="products-page">
      <h1>Paiement annulé</h1>
      <p>Le paiement a été annulé. Votre panier est toujours disponible.</p>
      <Link to="/cart">Retour au panier</Link>
    </main>
  );
}

export default CheckoutCancelPage;