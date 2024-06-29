import { assert } from "@/core";
import { BaseService } from "./base.service";
import { ErrorWrapper, formatParams } from "./util";
// import { stringify } from "qs";

export class RealEstateService extends BaseService {
  static get entity() {
    return "bat_dong_san";
  }

  static async getPostById(id) {
    try {
      const response = await this.request({ auth: true }).get(
        `${this.entity}/joined/${id}`
      );
      return response.data;
    } catch (error) {
      const message = error.response.data
        ? error.response.data.error
        : error.response.statusText;
      throw new ErrorWrapper(error, message);
    }
  }

  static async getAllRealEstates(params) {
    try {
      const response = await this.request().get(
        `${this.entity}/search_joined/?${formatParams(params)}`
      );
      return response.data;
    } catch (error) {
      console.log("error", error);
      const message = error.response.data
        ? error.response.data.error
        : error.response.statusText;
      throw new ErrorWrapper(error, message);
    }
  }

  static async getPredictedPrice(params) {
    try {
      const response = await this.request().get(
        `${this.entity}/du_doan_gia/?${formatParams(params)}`
      );
      return response.data;
    } catch (error) {
      console.log("error", error);
      const message = error.response.data
        ? error.response.data.error
        : error.response.statusText;
      throw new ErrorWrapper(error, message);
    }
  }

  static async createNewRealEstatePost(data) {
    assert.object(data, { required: true });

    try {
      const response = await this.request({ auth: true }).post(
        `${this.entity}/`,
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

  static async updateRealEstatePost(id, data) {
    assert.id(id, { required: true });
    assert.object(data, { required: true });

    try {
      const response = await this.request({ auth: true }).put(
        `${this.entity}/${id}`,
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

  static async deleteRealEstatePost(id) {
    assert.id(id, { required: true });

    try {
      const response = await this.request({ auth: true }).delete(
        `${this.entity}/${id}`
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
