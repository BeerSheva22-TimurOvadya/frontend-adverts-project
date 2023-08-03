import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import { Subscription } from 'rxjs';

import ProductsTable from '../common/ProductsTable';
import { productService } from '../../config/service-config';
import { productActions } from '../../redux/slices/productSlice';
import Product from '../../model/Product';

const Products: React.FC = () => {
    const dispatch = useDispatch();
    const products = useSelector((state: any) => state.products);
    const subscription = useRef<Subscription | null>(null);

    useEffect(() => {
        subscription.current = productService.fetchProducts().subscribe((fetchedProducts: Product[]) => {
            dispatch(productActions.setProducts(fetchedProducts));
        });
        return () => {
            subscription.current?.unsubscribe();
        };
    }, [dispatch]);

    return (
        <Box>
            <ProductsTable products={products} />
        </Box>
    );
};

export default Products;
