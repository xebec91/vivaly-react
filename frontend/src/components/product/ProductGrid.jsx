import ProductCard from './ProductCard';

function ProductGrid({ products }) {
  if (!products.length) {
    return <p>Aucun produit disponible.</p>;
  }

  return (
    <div className="catalog-grid" role="list">
      {products.map((product) => (
        <div key={product.id} role="listitem">
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
}

export default ProductGrid;