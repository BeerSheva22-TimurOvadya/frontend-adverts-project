import { Observable } from 'rxjs';
import Product from '../model/Product';

export default interface ProductService {
    fetchProducts(): Observable<Product[]>;
    addProduct(product: Product): Promise<Product>;
    deleteProduct(productId: number): Promise<void>;
    getProductsByCategory(category: string): Promise<Product[]>;
    getProductsByPrice(maxPrice: number): Promise<Product[]>;
    editProduct(productId: number, product: Product): Promise<Product>;
}
