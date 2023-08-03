import React, { useEffect, useState } from 'react';
import { Box, Select, MenuItem } from '@mui/material';
import ProductsTable from '../common/ProductsTable';
import { productService } from '../../config/service-config';
import Product from '../../model/Product';

const SortByCategories: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('Cars');

    const handleCategoryChange = (event: any) => {
        setSelectedCategory(event.target.value as string);
    };

    useEffect(() => {
        productService.getProductsByCategory(selectedCategory)
            .then((products: Product[]) => {
                setProducts(products);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [selectedCategory]);

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
                <Select value={selectedCategory || ''} onChange={handleCategoryChange} displayEmpty>
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
