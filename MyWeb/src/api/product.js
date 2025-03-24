import { get, post, remove } from './httpClient.js';

export async function getProducts(signal) {
  return await get('products', signal);
}

export async function getProductsByCategory(category, signal) {
  return await get(`products?category=${category}`, signal);
}

export async function createProductApi(signal, productData) {
  return await post('products', signal, productData);
}

export async function deleteProductApi(productId, signal) {
  return await remove(`products/${productId}`, signal);
}
