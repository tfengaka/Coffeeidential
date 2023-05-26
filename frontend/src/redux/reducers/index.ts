import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './authSlice';
import diaryReducer from './diarySlice';
import productReducer from './productSlice';

const persistConfig = {
  key: 'coffee',
  storage,
  blacklist: ['auth'],
};

const rootReducer = persistReducer(
  persistConfig,
  combineReducers({
    auth: authReducer,
    product: productReducer,
    diary: diaryReducer,
  })
);

export default rootReducer;
