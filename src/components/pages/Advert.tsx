import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import { Subscription } from 'rxjs';

import AdvertsTable from '../common/AdvertsTable';
import { fetchAdverts } from '../../service/AdvertService';
import { advertActions } from '../../redux/slices/advertSlice';
import Advert from '../../model/Advert';

const Adverts: React.FC = () => {
    const dispatch = useDispatch();
    const adverts = useSelector((state: any) => state.adverts);
    const subscription = useRef<Subscription | null>(null);

    useEffect(() => {
        subscription.current = fetchAdverts().subscribe((fetchedAdverts: Advert[]) => {
            dispatch(advertActions.setAdverts(fetchedAdverts));
        });
        return () => {
            subscription.current?.unsubscribe();
        };
    }, [dispatch]);

    return (
        <Box>
            <AdvertsTable adverts={adverts} />
        </Box>
    );
};

export default Adverts;
