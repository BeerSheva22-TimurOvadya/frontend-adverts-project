import React, { useEffect, useState } from 'react';
import { Box, Select, MenuItem } from '@mui/material';
import AdvertsTable from '../common/AdvertsTable';
import { advertService } from '../../config/service-config';
import Advert from '../../model/Advert';

const SortByCategories: React.FC = () => {
    const [adverts, setAdverts] = useState<Advert[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('Cars');

    const handleCategoryChange = (event: any) => {
        setSelectedCategory(event.target.value as string);
    };

    useEffect(() => {
        advertService
            .getAdvertsByCategory(selectedCategory)
            .then((adverts: Advert[]) => {
                setAdverts(adverts);
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
            <AdvertsTable adverts={adverts} />
        </Box>
    );
};

export default SortByCategories;
