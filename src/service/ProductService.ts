import { Observable } from 'rxjs';
import Product from '../model/Product';

export const fetchProducts = (): Observable<Product[]> => {
  return new Observable((subscriber) => {
    fetch('http://localhost:8080/products')
      .then((response) => response.json())
      .then((products) => {
        subscriber.next(products);
        subscriber.complete();
      })
      .catch((error) => subscriber.error(error));
  });
};

export const addProduct = async (product: Product): Promise<Product> => {
  const response = await fetch('http://localhost:8080/products', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  });
  return await response.json();
};

export const deleteProduct = async (productId: number): Promise<void> => {
  await fetch(`http://localhost:8080/products/${productId}`, {
    method: 'DELETE',
  });
};

export const getProductsByCategory = async (category: string): Promise<Product[]> => {
  const response = await fetch(`http://localhost:8080/products/category/${category}`);
  return await response.json();
};

export const getProductsByPrice = async (maxPrice: number): Promise<Product[]> => {
  const response = await fetch(`http://localhost:8080/products/price?maxPrice=${maxPrice}`);
  return await response.json();
};

export const editProduct = async (productId: number, product: Product): Promise<Product> => {
  const response = await fetch(`http://localhost:8080/products/${productId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  });
  return await response.json();
};