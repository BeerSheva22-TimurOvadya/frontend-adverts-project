import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, Select, MenuItem } from '@mui/material';

import ProductsTable from '../common/ProductsTable';

const SortByCategories: React.FC = () => {
  
  const products = useSelector((state: any) => state.products);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
 
  const handleCategoryChange = (event: any) => {
    setSelectedCategory(event.target.value as string);
  };

  const filteredProducts = selectedCategory
    ? products.filter((product: any) => product.category === selectedCategory)
    : products;

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
        <Select
          value={selectedCategory || ''}
          onChange={handleCategoryChange}
          displayEmpty
        >
          <MenuItem value="">All Categories</MenuItem>
          <MenuItem value="Car">Car</MenuItem>
          <MenuItem value="Electronics">Electronics</MenuItem>
          <MenuItem value="Housing">Housing</MenuItem>
        </Select>
      </Box>
      <ProductsTable products={filteredProducts}  />
    </Box>
  );
};

export default SortByCategories;