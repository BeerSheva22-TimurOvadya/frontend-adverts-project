import { configureStore } from '@reduxjs/toolkit';

import { codeReducer} from './slices/codeSlice';

export const store = configureStore({
    reducer: { 
        adverts: codeReducer,        
    },
});