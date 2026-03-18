export async function getProducts() {
  const response = await fetch('/api/product');

  if (!response.ok) {
    throw new Error('Erreur lors du chargement des produits');
  }

  return response.json();
}

export async function getProductById(id) {
  const response = await fetch(`/api/product/show/${id}`);

  if (!response.ok) {
    throw new Error('Erreur lors du chargement du produit');
  }

  return response.json();
}