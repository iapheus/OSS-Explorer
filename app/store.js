import { configureStore } from "@reduxjs/toolkit";
import apiCordinatesReducer from "./slices/apiCordinatesSlice";
import themeReducer from './slices/themeSlice';

export const store = configureStore({
  reducer: {
    apiCordinates: apiCordinatesReducer,
    themeReducer: themeReducer,
  }
});
