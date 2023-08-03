import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import Advert from '../../model/Advert';

const advertSlice = createSlice({
    name: 'adverts',
    initialState: [] as Advert[],
    reducers: {
        addAdvert: (state, action: PayloadAction<Advert>) => {
            state.push(action.payload);
        },
        deleteAdvert: (state, action: PayloadAction<number>) => {
            const index = state.findIndex((advert) => advert.id === action.payload);
            if (index > -1) {
                state.splice(index, 1);
            }
        },
        setAdverts: (state, action: PayloadAction<Advert[]>) => {
            return action.payload;
        },
        updateAdvert: (state, action: PayloadAction<Advert>) => {
            const index = state.findIndex((advert) => advert.id === action.payload.id);
            if (index > -1) {
                state[index] = action.payload;
            }
        },
    },
});

export const advertActions = advertSlice.actions;
export const advertReducer = advertSlice.reducer;
