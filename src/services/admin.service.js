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
}
