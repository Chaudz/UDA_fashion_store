import { PageInfoProductModel, ProductModel } from "./../models/ProductModel";
import axiosClient from "./axiosClient";

class ProductApi {
  async getAll() {
    const url: string = "/products";
    const response: PageInfoProductModel = await axiosClient.get(url);
    return response;
  }

  async createProduct(product: ProductModel) {
    const url: string = "/products";
    const response = await axiosClient.post(url, {
      ...product,
    });

    return response;
  }

  getProductById(productId: string) {
    const url = `/products/${productId}`;

    return axiosClient.get(url);
  }

  deleteProductById(productId: string) {
    const url = `/products/${productId}`;

    return axiosClient.delete(url);
  }
}

export default new ProductApi();
