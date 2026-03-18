import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useCart } from '../context/CartContext';

function CheckoutSuccessPage() {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <main className="products-page">
      <h1>Paiement réussi</h1>
      <p>Merci pour votre commande. Votre paiement a bien été accepté.</p>
      <Link to="/">Retour à la boutique</Link>
    </main>
  );
}

export default CheckoutSuccessPage;