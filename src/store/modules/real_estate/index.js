import { RealEstateTypeService } from "@/services/real_estate_type.service";
import { AuthService } from "@/services/auth2.service";
import { RealEstateService } from "@/services/real_estate.service";

export default {
  state: {
    currentUser: null,
    allRealEstateType: [],
    allRealEstates: [],
  },
  getters: {
    currentUser(state) {
      return state.currentUser;
    },
    allRentTypes(state) {
      return state.allRealEstateType.filter((type) => !type.BanHayChoThue);
    },
    allBuyTypes(state) {
      return state.allRealEstateType.filter((type) => type.BanHayChoThue);
    },
    allRealEstateType(state) {
      return state.allRealEstateType;
    },
    allRealEstate(state) {
      return state.allRealEstates;
    },
  },
  mutations: {
    signout(state) {
      state.currentUser = null;
    },
    setCurrentUser(state, user) {
      state.currentUser = user;
    },
    setAllRealEstateType(state, allRealEstateType) {
      state.allRealEstateType = allRealEstateType;
    },
    setAllRealEstate(state, allRealEstates) {
      state.allRealEstates = allRealEstates;
    },
  },
  actions: {
    logout({ commit }) {
      localStorage.removeItem("token");

      commit("signout");
    },
    async getCurrentUserInfo({ commit }, token) {
      if (!token) return;
      const response = await AuthService.getCurrentUser(token);
      commit("setCurrentUser", response);
    },
    async getAllRealEstateType({ commit }) {
      const response = await RealEstateTypeService.getAllRealEstateTypes();
      commit("setAllRealEstateType", response.data);
    },
    async getAllRealEstate({ commit }) {
      const response = await RealEstateService.getAllRealEstate();
      const mappedRealEstates = response.map((estate) => {
        return {
          ...estate,
          bat_dong_san: {
            ...estate.bat_dong_san,
            HinhAnh: JSON.parse(estate.bat_dong_san.HinhAnh || ""),
          },
        };
      });
      commit("setAllRealEstate", mappedRealEstates);
    },
  },
  modules: {},
};
