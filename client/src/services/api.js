const BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export async function getCategories() {
  const res = await fetch(`${BASE}/categories/tree`);
  if (!res.ok) throw new Error('Failed to load categories');
  return res.json();
}

export async function getProducts(categoryId = null) {
  const url = categoryId ? `${BASE}/products?categoryId=${categoryId}` : `${BASE}/products`;
  const res = await fetch(`${BASE}/${url.replace(/^http:\/\/localhost:5000\/api\//, '')}`);
  if (!res.ok) throw new Error('Failed to load products');
  return res.json();
}

// Trending product always returns an array
export async function getTrendingProduct() {
  const res = await fetch(`${BASE}/products/trending`);
  if (!res.ok) throw new Error('Failed to load trending product');

  const data = await res.json();

  // Normalize response: always return an array
  if (!data) return [];
  return Array.isArray(data) ? data : [data];
}
