
import ProductService from '../service/ProductService';
import ProductServiceRest from '../service/ProductServiceRest';


export const productService: ProductService = new ProductServiceRest(
    'http://localhost:8080/products',
); 


