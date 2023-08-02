import { Box } from '@mui/material';
import { useEffect, useState, useRef } from 'react'; 
import {  Subscription } from 'rxjs';

import ProductsTable from '../common/ProductsTable';
import { fetchProducts } from '../../service/ProductService';
import Product from '../../model/Product';

const Products: React.FC = () => {  
  const [products, setProducts] = useState<Product[]>([]);
  const [reload, setReload] = useState(false);
  const subscription = useRef<Subscription | null>(null); 

  useEffect(() => {
    subscription.current = fetchProducts().subscribe((fetchedProducts) => { 
      setProducts(fetchedProducts);
    });
    return () => {
      subscription.current?.unsubscribe(); 
    }
  }, [reload]);

  const handleProductDelete = () => {
    setReload(!reload);
  }

  return (
    <Box>
      <ProductsTable products={products} onDelete={handleProductDelete} />
    </Box>
  );
};

export default Products;
