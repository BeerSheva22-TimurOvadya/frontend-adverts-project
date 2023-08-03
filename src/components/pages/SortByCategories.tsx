import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Select, MenuItem } from '@mui/material';

import AdvertsTable from '../common/AdvertsTable';
import { getAdvertsByCategory } from '../../service/AdvertService';
import { advertActions } from '../../redux/slices/advertSlice';
import Advert from '../../model/Advert';

const SortByCategories: React.FC = () => {
    const dispatch = useDispatch();
    const adverts = useSelector((state: any) => state.adverts);
    const [selectedCategory, setSelectedCategory] = useState<string>('Cars');

    const handleCategoryChange = (event: any) => {
        setSelectedCategory(event.target.value as string);
    };

    useEffect(() => {
        getAdvertsByCategory(selectedCategory)
            .then((adverts: Advert[]) => {
                dispatch(advertActions.setAdverts(adverts));
            })
            .catch((error: any) => {
                console.error(error);
            });
    }, [selectedCategory, dispatch]);

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
                <Select value={selectedCategory || ''} onChange={handleCategoryChange} displayEmpty>
                    <MenuItem value="Cars">Cars</MenuItem>
                    <MenuItem value="Electronics">Electronics</MenuItem>
                    <MenuItem value="Housing">Housing</MenuItem>
                </Select>
            </Box>
            <AdvertsTable adverts={adverts} />
        </Box>
    );
};

export default SortByCategories;
