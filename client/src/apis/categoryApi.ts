import { CategoryModel } from "../models/CategoryModel";
import { ParentCategoryModel } from "../models/ParentCategoryModel";
import axiosClient from "./axiosClient";

class CategoryApi {
  async getAllCategory() {
    const url = "/categories";
    const response: { name: CategoryModel[] } = await axiosClient.get(url);

    return response;
  }

  addCategory(categoryName: string) {
    const url = "/categories";

    return axiosClient.post(url, {
      categoryName,
    });
  }

  getCategoryById(categoryId: string) {
    const url = `/categories/${categoryId}`;

    return axiosClient.get(url);
  }

  deleteCategory(categoryId: string) {
    const url = `/categories/${categoryId}`;

    return axiosClient.delete(url);
  }

  updateCategory(category: CategoryModel) {
    const url = `/categories/${category._id}`;

    return axiosClient.put(url, {
      categoryName: category.categoryName,
    });
  }

  async getAllParentCategory() {
    const url = "/parentCategories";
    const response: { name: ParentCategoryModel[] } = await axiosClient.get(
      url
    );

    return response;
  }

  async addParentCategory(parentCategoryName: string) {
    const url = "/parentCategories";
    const response = await axiosClient.post(url, {
      parentCategoryName,
    });

    return response;
  }

  getParentCategoryById(parentCategoryId: string) {
    const url = `/parentCategories/${parentCategoryId}`;

    return axiosClient.get(url);
  }

  deleteParentCategory(parentCategoryId: string) {
    const url = `/parentCategories/${parentCategoryId}`;

    return axiosClient.delete(url);
  }

  updateParentCategory(parentCategory: ParentCategoryModel) {
    console.log("okk", parentCategory._id);
    const url = `/parentCategories/${parentCategory._id}`;

    return axiosClient.put(url, {
      parentCategoryName: parentCategory.parentCategoryName,
    });
  }
}

export default new CategoryApi();
