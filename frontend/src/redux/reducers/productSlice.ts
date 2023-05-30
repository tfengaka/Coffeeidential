import { createSlice } from '@reduxjs/toolkit';
import { Product } from '~/types';

interface ProductState {
  products: Product[];
  product: Product | null;
}

const initialState: ProductState = {
  products: [],
  product: null,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setProduct: (state, action) => {
      state.product = action.payload;
    },
    updateStatus: (state, action) => {
      const { id, status } = action.payload;
      const index = state.products.findIndex((product) => product.id === id);
      if (index !== -1) {
        state.products[index].is_production = status;
      }
    },
  },
});

export const { setProducts, setProduct, updateStatus } = productSlice.actions;
export default productSlice.reducer;
