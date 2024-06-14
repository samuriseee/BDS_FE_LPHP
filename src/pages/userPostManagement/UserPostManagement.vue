<template>
  <div class="container">
    <h1 :style="{
      fontSize: '24px',
      lineHeight: '32px',
      fontWeight: '500',
      letterSpacing: '-0.2px',
      color: '#2C2C2C',
      display: 'block',
      textAlign: 'left',
      marginBottom: '10px',
    }">
      Danh sách tin
    </h1>
    <el-tabs v-model="activeName"
             @tab-click="handleClick"
             :style="{
               width: '100%',
             }">
      <el-tab-pane label="Tất cả" name="first">
        <a-row>
          <a-col v-for="estate in allRealEstatesOfCurrentUser" :key="estate.id">
            <RealEstateCardItem :estate="estate" @goToEstateDetails="goToEstateDetails" />
          </a-col>
        </a-row>
      </el-tab-pane>
      <el-tab-pane label="Chờ được duyệt" name="second">
        <a-row>
          <a-col v-for="estate in waitingApproveRealEstates" :key="estate.id">
            <RealEstateCardItem :estate="estate" @goToEstateDetails="goToEstateDetails" />
          </a-col>
        </a-row>
      </el-tab-pane>
      <el-tab-pane label="Đang hiển thị" name="fourth">
        <a-row>
          <a-col v-for="estate in showingRealEstates" :key="estate.id">
            <RealEstateCardItem :estate="estate" @goToEstateDetails="goToEstateDetails" />
          </a-col>
        </a-row>
      </el-tab-pane>
      <el-tab-pane label="Bài viết không duyệt / vi phạm" name="third">
        <a-row>
          <a-col v-for="estate in expiredRealEstates" :key="estate.id">
            <RealEstateCardItem :estate="estate" @goToEstateDetails="goToEstateDetails" />
          </a-col>
        </a-row>
      </el-tab-pane>
    </el-tabs>

  </div>
</template>

<script>
import { RealEstateService } from "@/services/real_estate.service";
import { RealEstatePostStatus } from "@/constants/index";
import RealEstateCardItem from "./RealEstateCardItem.vue";
import EstateCardOnListPage from "@/components/UserPageComponent/EstateCardOnListPage.vue";
import { mapGetters } from "vuex";
export default {
  name: "UserPostManagement",
  data() {
    return {
      loading: false,
      activeName: 'first',
      allRealEstatesOfCurrentUser: [],
    };
  },
  components: {
    RealEstateCardItem,
    EstateCardOnListPage,
  },
  computed: {
    ...mapGetters(["currentUser"]),
    waitingApproveRealEstates() {
      // eslint-disable-next-line eqeqeq
      return this.allRealEstatesOfCurrentUser.filter((estate) => estate.bat_dong_san.TrangThai == RealEstatePostStatus.CHUA_DUYET);
    },
    expiredRealEstates() {
      // eslint-disable-next-line eqeqeq
      return this.allRealEstatesOfCurrentUser.filter((estate) => estate.bat_dong_san.TrangThai == RealEstatePostStatus.KHONG_DUYET || estate.TrangThai === RealEstatePostStatus.VI_PHAM);
    },
    showingRealEstates() {
      // eslint-disable-next-line eqeqeq
      return this.allRealEstatesOfCurrentUser.filter((estate) => estate.bat_dong_san.TrangThai == RealEstatePostStatus.DA_DUYET);
    },
  },
  mounted() {
    this.getRealEstates();
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
     async getRealEstates() {
      try {
        const response = await RealEstateService.getAllRealEstates();
        const postOfCurrentUser = response.filter((estate) => estate.nguoi_dung.id === this.currentUser?.id);
        const mappedRealEstates = postOfCurrentUser.map((estate) => {
          return {
            ...estate,
            bat_dong_san: {
              ...estate.bat_dong_san,
              HinhAnh: JSON.parse(estate.bat_dong_san.HinhAnh || ""),
            },
          };
        });
        this.allRealEstatesOfCurrentUser = mappedRealEstates;
      } catch (error) {
        console.log(error);
      }
    },
  }
};
</script>

<style scoped>
.container {
  margin-top: 20px;
  padding: 30px;
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-family: "Lexend", sans-serif;
}
</style>