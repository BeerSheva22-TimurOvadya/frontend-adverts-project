import { Observable } from 'rxjs';
import Product from '../model/Product';

const URL = 'http://localhost:8080/products';

export const fetchProducts = (): Observable<Product[]> => {
  return new Observable((subscriber) => {
    fetch(URL)
      .then((response) => response.json())
      .then((products) => {
        subscriber.next(products);
        subscriber.complete();
      })
      .catch((error) => subscriber.error(error));
  });
};

export const addProduct = async (product: Product): Promise<Product> => {
  const response = await fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  });
  return await response.json();
};

export const deleteProduct = async (productId: number): Promise<void> => {
  await fetch(`${URL}/${productId}`, {
    method: 'DELETE',
  });
};

export const getProductsByCategory = async (category: string): Promise<Product[]> => {
  const response = await fetch(`${URL}/category/${category}`);
  return await response.json();
};

export const getProductsByPrice = async (maxPrice: number): Promise<Product[]> => {
  const response = await fetch(`${URL}/price?maxPrice=${maxPrice}`);
  return await response.json();
};

export const editProduct = async (productId: number, product: Product): Promise<Product> => {
  const response = await fetch(`${URL}/${productId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  });
  return await response.json();
};