import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productSlice";
import sizeReducer from "./sizeSlice";
import categorySlice from "./categorySlice";

const store = configureStore({
  reducer: {
    productReducer,
    sizeReducer,
    categorySlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
