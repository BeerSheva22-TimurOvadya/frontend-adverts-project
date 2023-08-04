import React, { useState } from 'react';
import ProductsTable from '../common/ProductsTable';
import { Box, TextField, Button, Grid } from '@mui/material';
import { productService } from '../../config/service-config';
import Product from '../../model/Product';

const SortByPrice: React.FC = () => {
    const [maxPrice, setMaxPrice] = useState<number | null>(null);
    const [products, setProducts] = useState<Product[]>([]);
    const [errors, setErrors] = useState({
        maxPrice: '',
    });

    const handlePriceChange = (event: any) => {
        const price = event.target.value ? parseFloat(event.target.value) : null;
        let error = '';

        if (price !== null && price < 0) {
            error = 'Max Price must be 0 or greater';
        }

        setMaxPrice(price);
        setErrors({ ...errors, maxPrice: error });
    };

    const handleApply = async () => {
        if (maxPrice !== null && !errors.maxPrice) {
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
                <Grid container spacing={2} alignItems="center" justifyContent="center">
                    <Grid item style={{ height: '72px', width: '250px' }}>
                        <TextField
                            id="max-price"
                            label="Max Price"
                            type="number"
                            value={maxPrice || ''}
                            onChange={handlePriceChange}
                            variant="outlined"
                            error={!!errors.maxPrice}
                            helperText={errors.maxPrice}
                            fullWidth
                        />
                    </Grid>
                    <Grid item>
                        <Button
                            style={{
                                backgroundColor: '#63a4ff',
                                height: '56px',
                                width: '100px',
                            }}
                            variant="contained"
                            onClick={handleApply}
                        >
                            Apply
                        </Button>
                    </Grid>
                </Grid>
            </Box>
            <ProductsTable products={products} />
        </Box>
    );
};

export default SortByPrice;
