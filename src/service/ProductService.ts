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