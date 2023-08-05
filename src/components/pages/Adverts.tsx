import React, { useState, useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import { Subscription } from 'rxjs';
import AdvertsTable from '../common/AdvertsTable';
import { advertService} from '../../config/service-config';
import Advert from '../../model/Advert';

const Adverts: React.FC = () => {
    const [adverts, setAdverts] = useState<Advert[]>([]);
    const subscription = useRef<Subscription | null>(null);

    useEffect(() => {
        subscription.current = advertService.getAllAdverts().subscribe((fetchedAdverts: Advert[]) => {
            setAdverts(fetchedAdverts);
        });
        return () => {
            subscription.current?.unsubscribe();
        };
    }, []);

    return (
        <Box>
            <AdvertsTable adverts={adverts} />
        </Box>
    );
};

export default Adverts;
