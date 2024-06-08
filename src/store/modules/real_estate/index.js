// import { RealEstateService } from "@/services/real_estate.service";
import { RealEstateTypeService } from "@/services/real_estate_type.service";
import { AuthService } from "@/services/auth2.service";

export default ({
  state: {
    currentUser: null,
    allRealEstateType: [],
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
  },
  modules: {},
});
