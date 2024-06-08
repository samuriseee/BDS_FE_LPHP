import { BaseService } from "./base.service";
import { ErrorWrapper } from "./util";

export class RealEstateTypeService extends BaseService {
  static get entity() {
    return "loai_bat_dong_san";
  }

  static async getAllRealEstateTypes() {
    try {
      const response = await this.request(
        { auth: true }
      ).get(
        `${this.entity}`
      );
      //   return new ResponseWrapper(response, response.data.data);
      return response;
    } catch (error) {
      const message = error?.response?.data
        ? error.response?.data?.error
        : error.response?.statusText;
      throw new ErrorWrapper(error, message);
    }
  }
}
