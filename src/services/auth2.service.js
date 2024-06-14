/* eslint-disable camelcase */
import { BaseService } from "./base.service";
import { ErrorWrapper } from "./util";

export class AuthService extends BaseService {
  static get entity() {
    return "auth";
  }

  static async login({ email, mat_khau }) {
    try {
      const response = await this.request().post(`${this.entity}/login`, {
        email,
        mat_khau,
      });
      return response.data;
    } catch (error) {
      const message = error.response.data
        ? error.response.data.error
        : error.response.statusText;
      throw new ErrorWrapper(error, message);
    }
  }

  static async register(newUser) {
    try {
      const response = await this.request().post(`${this.entity}/signup`, newUser);
      return response.data;
    } catch (error) {
      const message = error.response.data
        ? error.response.data.error
        : error.response.statusText;
      throw new ErrorWrapper(error, message);
    }
  }

  static async getCurrentUser(token) {
    try {
      const response = await this.request().get(`${this.entity}/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      const message = error.response.data
        ? error.response.data.error
        : error.response.statusText;
      throw new ErrorWrapper(error, message);
    }
  }
}
