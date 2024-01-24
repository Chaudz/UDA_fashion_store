import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import categoryApi from "../apis/categoryApi";
import { CategoryModel } from "../models/CategoryModel";
import { ParentCategoryModel } from "../models/ParentCategoryModel";

const initialState: {
  categories: CategoryModel[];
  parentCategories: ParentCategoryModel[];
  p: string;
} = {
  parentCategories: [],
  categories: [],
  p: "",
};

export const fetchCategories = createAsyncThunk(
  "category/getAllCategory",
  async () => {
    const categories: { name: CategoryModel[] } =
      await categoryApi.getAllCategory();

    return categories;
  }
);

export const fetchParentCategories = createAsyncThunk(
  "parentCategory/getAllParentCategory",
  async () => {
    const parentCategory: { name: ParentCategoryModel[] } =
      await categoryApi.getAllParentCategory();
    return parentCategory;
  }
);

// Thêm action và reducer cho việc thêm category
export const addCategory = createAsyncThunk(
  "category/addCategory",
  async (categoryName: string) => {
    const response = await categoryApi.addCategory(categoryName);
    return response;
  }
);

// Thêm action và reducer cho việc xoá category
export const deleteCategory = createAsyncThunk(
  "category/deleteCategory",
  async (categoryId: string) => {
    await categoryApi.deleteCategory(categoryId);
    return categoryId;
  }
);

// Thêm action và reducer cho việc sửa category
export const updateCategory = createAsyncThunk(
  "category/updateCategory",
  async (category: CategoryModel) => {
    const response = await categoryApi.updateCategory(category);
    return response;
  }
);

export const addParentCategory = createAsyncThunk(
  "parentCategory/addParentCategory",
  async (parentCategoryName: string) => {
    const response = await categoryApi.addParentCategory(parentCategoryName);
    return response;
  }
);

// Thêm action và reducer cho việc xoá parentCategory
export const deleteParentCategory = createAsyncThunk(
  "parentCategory/deleteParentCategory",
  async (parentCategoryId: string) => {
    await categoryApi.deleteParentCategory(parentCategoryId);
    return parentCategoryId;
  }
);

// Thêm action và reducer cho việc sửa parentCategory
export const updateParentCategory = createAsyncThunk(
  "parentCategory/updateParentCategory",
  async (parentCategory: ParentCategoryModel) => {
    const response = await categoryApi.updateParentCategory(parentCategory);
    return response;
  }
);

const categorySlice = createSlice({
  initialState,
  name: "categories",
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      const categories: CategoryModel[] = action.payload.name;
      state.categories = categories;
    });
    builder.addCase(fetchParentCategories.fulfilled, (state, action) => {
      const parentCategories: ParentCategoryModel[] = action.payload.name;
      state.parentCategories = parentCategories;
    });
    // Xử lý khi thêm category thành công
    builder.addCase(addCategory.fulfilled, (state, action) => {
      const newCategory: CategoryModel = action.payload;
      state.categories = [...state.categories, newCategory];
    });
    // Xử lý khi xoá category thành công
    builder.addCase(deleteCategory.fulfilled, (state, action) => {
      const categoryIdToDelete = action.payload;
      state.categories = state.categories.filter(
        (category) => category._id !== categoryIdToDelete
      );
    });
    // Xử lý khi sửa category thành công
    builder.addCase(updateCategory.fulfilled, (state, action) => {
      const updatedCategory: CategoryModel = action.payload.updatedCategory;
      state.categories = state.categories.map((category) =>
        category._id === updatedCategory._id ? updatedCategory : category
      );
    });
    builder.addCase(addParentCategory.fulfilled, (state, action) => {
      console.log("=-----------");
      const newParentCategory: ParentCategoryModel = action.payload;
      state.parentCategories = [...state.parentCategories, newParentCategory];
    });
    // Xử lý khi xoá parentCategory thành công
    builder.addCase(deleteParentCategory.fulfilled, (state, action) => {
      const parentCategoryIdToDelete = action.payload;
      state.parentCategories = state.parentCategories.filter(
        (parentCategory) => parentCategory._id !== parentCategoryIdToDelete
      );
    });
    // Xử lý khi sửa parentCategory thành công
    builder.addCase(updateParentCategory.fulfilled, (state, action) => {
      const updatedParentCategory: ParentCategoryModel =
        action.payload.updatedParentCategory;
      state.parentCategories = state.parentCategories.map((parentCategory) =>
        parentCategory._id === updatedParentCategory._id
          ? updatedParentCategory
          : parentCategory
      );
    });
  },
});

export default categorySlice.reducer;
