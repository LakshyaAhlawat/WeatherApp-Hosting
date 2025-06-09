import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import weatherReducer from './slices/weatherSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    weather: weatherReducer
  }
});

export default store;