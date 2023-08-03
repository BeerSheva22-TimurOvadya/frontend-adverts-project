import React, { useState } from 'react';
import ProductsTable from '../common/ProductsTable';
import { Box, TextField, Button } from '@mui/material';
import { productService } from '../../config/service-config';
import Product from '../../model/Product';

const SortByPrice: React.FC = () => {
    const [maxPrice, setMaxPrice] = useState<number | null>(null);
    const [products, setProducts] = useState<Product[]>([]);

    const handlePriceChange = (event: any) => {
        const price = event.target.value ? parseFloat(event.target.value) : null;
        setMaxPrice(price);
    };

    const handleApply = async () => {
        if (maxPrice !== null) {
            const filteredProducts = await productService.getProductsByPrice(maxPrice);
            setProducts(filteredProducts);
        }
    };

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

                <Button
                    style={{
                        backgroundColor: '#63a4ff',
                        height: '56px',
                        width: '100px',
                        marginLeft: '1rem', 
                    }}
                    variant="contained"
                    onClick={handleApply}
                >
                    Apply
                </Button>
            </Box>
            <ProductsTable products={products} />
        </Box>
    );
};

export default SortByPrice;
