import React, { useState } from 'react';
import AdvertsTable from '../common/AdvertsTable';
import { Box, TextField, Button, Grid } from '@mui/material';
import { advertService } from '../../config/service-config';
import Advert from '../../model/Advert';

const SortByPrice: React.FC = () => {
    const [maxPrice, setMaxPrice] = useState<number | null>(null);
    const [adverts, setAdverts] = useState<Advert[]>([]);
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
            const filteredAdverts = await advertService.getAdvertsByPrice(maxPrice);
            setAdverts(filteredAdverts);
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
            <AdvertsTable adverts={adverts} />
        </Box>
    );
};

export default SortByPrice;
