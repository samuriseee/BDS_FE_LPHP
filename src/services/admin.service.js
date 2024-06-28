import { BaseService } from "./base.service";
import { ErrorWrapper } from "./util";

export class AdminService extends BaseService {
  static get entity() {
    return "admin";
  }

  static async getAllUsers() {
    try {
      const response = await this.request({ auth: true }).get(
        `${this.entity}/nguoi_dung/`
      );
      return response.data;
    } catch (error) {
      console.log('error', error)
      const message = error.response.data
        ? error.response.data.error
        : error.response.statusText;
      throw new ErrorWrapper(error, message);
    }
  }

  static async getUserById(id) {
    try {
      const response = await this.request({ auth: true }).get(
        `${this.entity}/nguoi_dung/${id}`
      );
      return response.data;
    } catch (error) {
      const message = error.response.data
        ? error.response.data.error
        : error.response.statusText;
      throw new ErrorWrapper(error, message);
    }
  }

  static async createNewUser(data) {
    try {
      const response = await this.request({ auth: true }).post(
        `${this.entity}/nguoi_dung/`,
        data
      );
      return response;
    } catch (error) {
      const message = error.response.data
        ? error.response.data.error
        : error.response.statusText;
      throw new ErrorWrapper(error, message);
    }
  }

  static async updateUser(id, data) {
    try {
      const response = await this.request({ auth: true }).put(
        `${this.entity}/nguoi_dung/${id}`,
        data
      );
      return response;
    } catch (error) {
      const message = error.response.data
        ? error.response.data.error
        : error.response.statusText;
      throw new ErrorWrapper(error, message);
    }
  }
}
