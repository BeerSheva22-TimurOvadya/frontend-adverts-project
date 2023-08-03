import React, { useState, useEffect, useRef } from 'react'; 
import { Box } from '@mui/material';
import { Subscription } from 'rxjs';
import ProductsTable from '../common/ProductsTable';
import { productService } from '../../config/service-config';
import Product from '../../model/Product';

const Products: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]); 
    const subscription = useRef<Subscription | null>(null);
    
    

    useEffect(() => {
        subscription.current = productService.getAllProducts().subscribe((fetchedProducts: Product[]) => {
            setProducts(fetchedProducts); 
        });
        return () => {
            subscription.current?.unsubscribe();
        };
    }, []);

    return (
        <Box>
            <ProductsTable products={products} />
        </Box>
    );
};

export default Products;
