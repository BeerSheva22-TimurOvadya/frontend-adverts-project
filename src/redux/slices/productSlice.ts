import { createSlice } from '@reduxjs/toolkit';
import Product from '../../model/Product';

const productSlice = createSlice({
  name: 'products',
  initialState: [] as Product[],
  reducers: {},
});

export const productActions = productSlice.actions;
export const productReducer = productSlice.reducer;
