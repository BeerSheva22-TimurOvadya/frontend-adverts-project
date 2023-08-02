import { Box } from '@mui/material';
import { useEffect, useState, useRef } from 'react'; 
import {  Subscription } from 'rxjs';

import ProductsTable from '../common/ProductsTable';
import { fetchProducts } from '../../service/ProductService';
import Product from '../../model/Product';

const Products: React.FC = () => {  
  const [products, setProducts] = useState<Product[]>([]);
  const subscription = useRef<Subscription | null>(null); 

  useEffect(() => {
    subscription.current = fetchProducts().subscribe((fetchedProducts) => { 
      setProducts(fetchedProducts);
    });
    return () => {
      subscription.current?.unsubscribe(); 
    }
  }, []);

  return (
    <Box>
      <ProductsTable products={products} />
    </Box>
  );
};

export default Products;
