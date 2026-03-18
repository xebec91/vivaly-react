import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { createCheckoutSession } from '../services/checkoutService';

function CartPage() {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
  } = useCart();

  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState('');

  async function handleCheckout() {
    try {
      setCheckoutLoading(true);
      setCheckoutError('');

      const data = await createCheckoutSession(cartItems);

      if (data.url) {
        window.location.href = data.url;
        return;
      }

      throw new Error('URL Stripe manquante.');
    } catch (err) {
      setCheckoutError(err.message);
      setCheckoutLoading(false);
    }
  }

  if (cartItems.length === 0) {
    return (
      <main className="cart-page">
        <h1>Mon panier</h1>
        <p>Votre panier est vide.</p>
        <Link to="/">Retour aux produits</Link>
      </main>
    );
  }

  return (
    <main className="cart-page">
      <h1>Mon panier</h1>

      <div className="cart-layout">
        <section className="cart-list">
          {cartItems.map((item) => (
            <article key={item.id} className="cart-item">
              <img
                src={item.image ? item.image : '/assets/images/placeholder.png'}
                alt={item.name}
              />

              <div className="cart-item-content">
                <h2>{item.name}</h2>
                <p>{item.description}</p>
                <p>{Number(item.price).toFixed(2)} €</p>

                <label>
                  Quantité :
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      updateQuantity(item.id, Number(e.target.value))
                    }
                  />
                </label>

                <button type="button" onClick={() => removeFromCart(item.id)}>
                  Supprimer
                </button>
              </div>
            </article>
          ))}
        </section>

        <aside className="cart-summary">
          <h2>Résumé</h2>
          <p>Articles : {totalItems}</p>
          <p>Total : {totalPrice.toFixed(2)} €</p>

          {checkoutError && <p className="auth-error">{checkoutError}</p>}

          <button
            type="button"
            onClick={handleCheckout}
            disabled={checkoutLoading}
          >
            {checkoutLoading ? 'Redirection...' : 'Payer avec Stripe'}
          </button>

          <button type="button" onClick={clearCart}>
            Vider le panier
          </button>
        </aside>
      </div>
    </main>
  );
}

export default CartPage;