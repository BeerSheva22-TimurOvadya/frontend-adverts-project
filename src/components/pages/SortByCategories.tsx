import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Select, MenuItem } from '@mui/material';

import ProductsTable from '../common/ProductsTable';
import { getProductsByCategory } from '../../service/ProductService';
import { productActions } from '../../redux/slices/productSlice';
import Product from '../../model/Product';

const SortByCategories: React.FC = () => {
  const dispatch = useDispatch();
  const products = useSelector((state: any) => state.products);
  const [selectedCategory, setSelectedCategory] = useState<string>("Cars");

  const handleCategoryChange = (event: any) => {
    setSelectedCategory(event.target.value as string);
  };

  useEffect(() => {
    
      getProductsByCategory(selectedCategory)
        .then((products: Product[]) => {
          dispatch(productActions.setProducts(products));
        })
        .catch((error) => {
          console.error(error);
        });
  
  }, [selectedCategory, dispatch]);

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
        <Select
          value={selectedCategory || ''}
          onChange={handleCategoryChange}
          displayEmpty
        >
          
          <MenuItem value="Cars">Cars</MenuItem>
          <MenuItem value="Electronics">Electronics</MenuItem>
          <MenuItem value="Housing">Housing</MenuItem>
        </Select>
      </Box>
      <ProductsTable products={products} />
    </Box>
  );
};

export default SortByCategories;
