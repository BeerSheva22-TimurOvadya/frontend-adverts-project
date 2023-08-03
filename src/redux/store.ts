import { configureStore } from '@reduxjs/toolkit';

import { advertReducer } from './slices/advertSlice';

export const store = configureStore({
    reducer: { 
        advert: advertReducer,        
    },
});

