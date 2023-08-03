import { configureStore } from '@reduxjs/toolkit';

import { codeReducer} from './slices/codeSlice';

export const store = configureStore({
    reducer: { 
        products: codeReducer,        
    },
});