import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getProductById } from '../services/productService';
import { useCart } from '../context/CartContext';

function ProductPage() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedDepth, setSelectedDepth] = useState('');
  const [addedMessage, setAddedMessage] = useState('');

  useEffect(() => {
    getProductById(id)
      .then((data) => {
        setProduct(data);
        setSelectedImage(data.hero_image || '/assets/images/placeholder.png');
        setLoading(false);
      })
      .catch(() => {
        setError('Impossible de charger le produit.');
        setLoading(false);
      });
  }, [id]);

  function increaseQty() {
    setQuantity((prev) => prev + 1);
  }

  function decreaseQty() {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  }

  function handleAddToCart() {
    if (!product) return;

    addToCart(product, quantity);
    setAddedMessage('Produit ajouté au panier.');

    setTimeout(() => {
      setAddedMessage('');
    }, 2000);
  }

  if (loading) {
    return (
      <main className="product-page">
        <p>Chargement...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="product-page">
        <p>{error}</p>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="product-page">
        <p>Produit introuvable.</p>
      </main>
    );
  }

  return (
    <main className="product-page">
      <section className="product-detail-section">
        <div className="product-detail-layout">
          <div className="product-gallery-column">
            <div className="product-main-image-shell">
              <img
                src={selectedImage}
                alt={product.name}
                className="product-main-image"
              />
            </div>

            <div
              className={`product-thumbnails ${
                product.gallery.length > 8 ? 'product-thumbnails-nine' : ''
              }`}
            >
              {product.gallery.map((image, index) => (
                <button
                  key={image + index}
                  type="button"
                  className={`product-thumbnail-button ${
                    selectedImage === image ? 'is-active' : ''
                  }`}
                  onClick={() => setSelectedImage(image)}
                >
                  <img
                    src={image}
                    alt={`Vue ${index + 1}`}
                    className="product-thumbnail"
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="product-info-column">
            <h1 className="product-detail-title">{product.title}</h1>

            <div className="product-price-block">
              <p className="product-old-price">
                {Number(product.old_price).toFixed(2).replace('.', ',')} EUR
              </p>
              <p className="product-current-price">
                {Number(product.price).toFixed(2).replace('.', ',')} EUR
              </p>
            </div>

            {!!product.colors.length && (
              <div className="product-option-block">
                <span className="product-option-label">Couleur :</span>
                <div className="product-color-list">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      type="button"
                      className={`product-color-button ${
                        selectedColor === color.name ? 'is-active' : ''
                      }`}
                      style={{ backgroundColor: color.swatch }}
                      aria-label={color.name}
                      onClick={() => {
                        setSelectedColor(color.name);
                        setSelectedImage(color.image);
                      }}
                    />
                  ))}
                </div>
              </div>
            )}

            {!!product.sizes.length && (
              <div className="product-option-block">
                <span className="product-option-label">Taille :</span>
                <div className="product-choice-list">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      className={`product-choice-button ${
                        selectedSize === size ? 'is-active' : ''
                      }`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {!!product.depths.length && (
              <div className="product-option-block">
                <span className="product-option-label">Profondeur :</span>
                <div className="product-choice-list">
                  {product.depths.map((depth) => (
                    <button
                      key={depth}
                      type="button"
                      className={`product-choice-button ${
                        selectedDepth === depth ? 'is-active' : ''
                      }`}
                      onClick={() => setSelectedDepth(depth)}
                    >
                      {depth}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="product-option-block">
              <span className="product-option-label">Quantité :</span>
              <div className="product-quantity-box">
                <button type="button" onClick={decreaseQty}>
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(Math.max(1, Number(e.target.value) || 1))
                  }
                />
                <button type="button" onClick={increaseQty}>
                  +
                </button>
              </div>
            </div>

            <button
              type="button"
              className="product-add-button"
              onClick={handleAddToCart}
            >
              Ajouter au panier
            </button>

            {addedMessage && (
              <div className="product-added-alert">{addedMessage}</div>
            )}

            <p className="product-centered-text">{product.subtitle}</p>

            {!!product.benefits.length && (
              <ul className="product-bullet-list">
                {product.benefits.map((benefit) => (
                  <li key={benefit}>✅ {benefit}</li>
                ))}
              </ul>
            )}

            {!!product.specs.length && (
              <div className="product-specs">
                <h2>Spécifications :</h2>
                <ul>
                  {product.specs.map((spec) => (
                    <li key={spec}>🔸 {spec}</li>
                  ))}
                </ul>
              </div>
            )}

            <Link to="/catalogue" className="product-back-link">
              ← Retour à la boutique
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default ProductPage;