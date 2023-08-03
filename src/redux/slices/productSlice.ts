import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import Product from '../../model/Product';

const productSlice = createSlice({
  name: 'products',
  initialState: [] as Product[],
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      state.push(action.payload);
    },
    deleteProduct: (state, action: PayloadAction<number>) => {
      const index = state.findIndex(product => product.id === action.payload);
      if (index > -1) {
        state.splice(index, 1);
      }
    },
    setProducts: (state, action: PayloadAction<Product[]>) => {
      return action.payload;
    }, 
    updateProduct: (state, action: PayloadAction<Product>) => {
      const index = state.findIndex(product => product.id === action.payload.id);
      if (index > -1) {
        state[index] = action.payload;
      }
    },
    
  },
});

export const productActions = productSlice.actions;
export const productReducer = productSlice.reducer;