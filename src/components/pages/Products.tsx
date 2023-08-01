import {  useSelector } from 'react-redux';
import { Box } from '@mui/material';

import ProductsTable from '../common/ProductsTable';

const Products: React.FC = () => {  
  const products = useSelector((state: any) => state.products);

  return (
    <Box>
      <ProductsTable products={products} />
    </Box>
  );
};

export default Products;
