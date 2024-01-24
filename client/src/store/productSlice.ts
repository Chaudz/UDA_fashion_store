import { ProductModel, PageInfoProductModel } from "./../models/ProductModel";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productApi from "../apis/productApi";

const initialState: { products: ProductModel[]; p: string; loading: boolean } =
  {
    products: [],
    p: "",
    loading: false,
  };

export const fetchProducts = createAsyncThunk(
  "products/getAllProduct",
  async () => {
    const response: PageInfoProductModel = await productApi.getAll();

    return response;
  }
);

export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (product: any) => {
    const response = await productApi.createProduct(product);

    return response;
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (productId: string) => {
    const response = await productApi.deleteProductById(productId);

    return response;
  }
);

const productSlice = createSlice({
  initialState,
  name: "products",
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      const products: ProductModel[] = action.payload.products;

      state.products = products;
    });
    builder.addCase(addProduct.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(addProduct.fulfilled, (state, action) => {
      const product: ProductModel = action.payload;
      const newProducts = [...state.products, product];

      state.products = newProducts;
      state.loading = false;
    });
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      console.log("fhdshfsdf", action.payload);
      const productIdToDelete = action.payload.product._id;
      state.products = state.products.filter(
        (product) => product.product._id !== productIdToDelete
      );
    });
  },
});

export default productSlice.reducer;
