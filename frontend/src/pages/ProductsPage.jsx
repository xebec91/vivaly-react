import { useEffect, useState } from 'react';
import ProductGrid from '../components/product/ProductGrid';
import { getProducts } from '../services/productService';

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getProducts()
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Impossible de charger les produits.');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <main className="products-page">
        <p>Chargement...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="products-page">
        <p>{error}</p>
      </main>
    );
  }

  return (
    <main className="products-page">
      <section className="catalog-page" aria-labelledby="offres-titre">
        <h1 id="offres-titre" className="catalog-title">
          Nos Meilleures Offres
        </h1>

        <ProductGrid products={products} />
      </section>
    </main>
  );
}

export default ProductsPage;