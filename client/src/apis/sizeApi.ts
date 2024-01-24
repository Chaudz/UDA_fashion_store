import { SizeModel } from "../models/SizeModel";
import axiosClient from "./axiosClient";

class SizeApi {
  async getAllSize() {
    const url = "/sizes";
    const response: { Sizes: SizeModel[] } = await axiosClient.get(url);
    return response.Sizes;
  }

  addSize(sizeName: string) {
    const url = "/sizes";

    return axiosClient.post(url, sizeName);
  }

  getDSizeById(sizeId: string) {
    const url = `/${sizeId}`;

    return axiosClient.get(url);
  }

  deleteSize(sizeId: string) {
    const url = `/${sizeId}`;

    return axiosClient.delete(url);
  }

  updateCategory(sizeName: string) {
    const url = `/sizes`;

    return axiosClient.put(url, {
      sizeName,
    });
  }
}

export default new SizeApi();
