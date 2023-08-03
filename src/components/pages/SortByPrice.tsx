import React, { useState } from 'react';
import ProductsTable from '../common/ProductsTable';
import { Box, TextField, Button } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { productActions } from '../../redux/slices/productSlice';
import { getProductsByPrice } from '../../service/ProductService';

const SortByPrice: React.FC = () => {
    const [maxPrice, setMaxPrice] = useState<number | null>(null);
    const products = useSelector((state: any) => state.products);
    const dispatch = useDispatch();

    const handlePriceChange = (event: any) => {
        const price = event.target.value ? parseFloat(event.target.value) : null;
        setMaxPrice(price);
    };

    const handleApply = async () => {
        if (maxPrice !== null) {
            const filteredProducts = await getProductsByPrice(maxPrice);
            dispatch(productActions.setProducts(filteredProducts));
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
                <Button onClick={handleApply}>Apply</Button>
            </Box>
            <ProductsTable products={products} />
        </Box>
    );
};

export default SortByPrice;