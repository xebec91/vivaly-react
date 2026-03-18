import { Link } from 'react-router-dom';

function ProductCard({ product }) {
  return (
    <article className="catalog-card">
      <Link to={`/product/${product.id}`} className="catalog-card-link">
        <div className="catalog-card-media">
          <img
            src={product.hero_image}
            alt={product.name}
            className="catalog-card-image"
          />
          <div className="catalog-card-badge">Offre</div>
        </div>

        <div className="catalog-card-content">
          <h2>{product.name}</h2>

          <div className="catalog-card-prices">
            <p className="catalog-old-price">
              {Number(product.old_price).toFixed(2).replace('.', ',')} EUR
            </p>
            <p className="catalog-current-price">
              {Number(product.price).toFixed(2).replace('.', ',')} EUR
            </p>
          </div>

          <p className="catalog-description">{product.description}</p>
        </div>
      </Link>
    </article>
  );
}

export default ProductCard;