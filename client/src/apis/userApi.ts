// import { userModel } from "../models/userModel";
import axiosClient from "./axiosClient";
import { ApiRegisterResponse } from "./ApiRegisterResponse";

type UserInfo = {
  firstName: string;
  lastName: string;
  gender: string;
  dob: Date;
  email: string;
  password: string;
  phoneNumber: string;
  address: string;
  message?: string;
  // status:string;
  // async login(email: string, password: string): Promise<ApiResponse> {
  //     const url: string = "/auth/login";
  //     return axiosClient.post(url, {
  //       email,
  //       password,
  //     });
  //   }
};

class UserApi {
  async create(user: UserInfo): Promise<ApiRegisterResponse> {
    const url: string = "/users";
    return axiosClient.post(url, user);
  }

  async getAll() {
    const url: string = "/users";
    const response: { user: UserInfo } = await axiosClient.get(url);

    return response;
  }
  async getUserById(userId: string) {
    const url = `/users/${userId}`;
    const response: { user: UserInfo } = await axiosClient.get(url);

    return response;
  }
}

export default new UserApi();
