import React, { useState } from 'react';
import ProductsTable from '../common/ProductsTable';
import { Box, TextField } from '@mui/material';
import { useSelector } from 'react-redux';

const SortByPrice: React.FC = () => {
    const [maxPrice, setMaxPrice] = useState<number | null>(null);
    const products = useSelector((state: any) => state.products);

    const handlePriceChange = (event: any) => {
        const price = event.target.value ? parseFloat(event.target.value) : null;
        setMaxPrice(price);
    };

    const filteredProducts =
        maxPrice !== null ? products.filter((product: any) => product.price <= maxPrice) : products;

    return (
        <Box>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: '1rem',
                }}
            >
                <TextField
                    id="max-price"
                    label="Max Price"
                    type="number"
                    value={maxPrice || ''}
                    onChange={handlePriceChange}
                    variant="outlined"
                />
            </Box>
            <ProductsTable products={filteredProducts} />
        </Box>
    );
};

export default SortByPrice;
