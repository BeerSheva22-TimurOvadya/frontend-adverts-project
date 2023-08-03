import React, { useState } from 'react';
import AdvertsTable from '../common/AdvertsTable';
import { Box, TextField, Button } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { advertActions } from '../../redux/slices/advertSlice';
import { getAdvertsByPrice } from '../../service/AdvertService';

const SortByPrice: React.FC = () => {
    const [maxPrice, setMaxPrice] = useState<number | null>(null);
    const adverts = useSelector((state: any) => state.adverts);
    const dispatch = useDispatch();

    const handlePriceChange = (event: any) => {
        const price = event.target.value ? parseFloat(event.target.value) : null;
        setMaxPrice(price);
    };

    const handleApply = async () => {
        if (maxPrice !== null) {
            const filteredAdverts = await getAdvertsByPrice(maxPrice);
            dispatch(advertActions.setAdverts(filteredAdverts));
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
            <AdvertsTable adverts={adverts} />
        </Box>
    );
};

export default SortByPrice;
