import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import sizeApi from "../apis/sizeApi";
import { SizeModel } from "../models/SizeModel";

const initialState: { sizes: SizeModel[] } = {
  sizes: [],
};

export const fetchSizes = createAsyncThunk("size/getAllSize", async () => {
  const response: SizeModel[] = await sizeApi.getAllSize();

  return response;
});

const sizeSlice = createSlice({
  initialState,
  name: "sizes",
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchSizes.fulfilled, (state, action) => {
      const sizes = action.payload;
      state.sizes = sizes;
    });
  },
});

// export const {} = sizeSlice.actions;
export default sizeSlice.reducer;
