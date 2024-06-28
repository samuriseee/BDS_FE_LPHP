<template>
  <div class="container">
    <h1
      :style="{
        fontSize: '24px',
        lineHeight: '32px',
        fontWeight: '500',
        letterSpacing: '-0.2px',
        color: '#2C2C2C',
        display: 'block',
        textAlign: 'left',
        marginBottom: '10px',
      }"
    >
      Danh sách tin
    </h1>
    <el-tabs
      v-model="activeName"
      @tab-click="handleClick"
      :style="{
        width: '100%',
      }"
    >
      <el-tab-pane label="Tất cả" name="first">
        <a-spin :spinning="loading">
          <a-row>
            <a-col
              v-for="estate in allRealEstatesOfCurrentUser"
              :key="estate.id"
            >
              <RealEstateCardItem
                :estate="estate"
                @goToEstateDetails="goToEstateDetails"
                @hidePost="hidePost"
                @deletePost="deletePost"
              />
            </a-col>
          </a-row>
        </a-spin>
      </el-tab-pane>
      <el-tab-pane label="Chờ được duyệt" name="second">
        <a-spin :spinning="loading">
          <a-row>
            <a-col v-for="estate in waitingApproveRealEstates" :key="estate.id">
              <RealEstateCardItem
                :estate="estate"
                @goToEstateDetails="goToEstateDetails"
                @hidePost="hidePost"
                @deletePost="deletePost"
              />
            </a-col>
          </a-row>
        </a-spin>
      </el-tab-pane>
      <el-tab-pane label="Đang hiển thị" name="fourth">
        <a-spin :spinning="loading">
          <a-row>
            <a-col v-for="estate in showingRealEstates" :key="estate.id">
              <RealEstateCardItem
                :estate="estate"
                @goToEstateDetails="goToEstateDetails"
                @hidePost="hidePost"
                @deletePost="deletePost"
              />
            </a-col>
          </a-row>
        </a-spin>
      </el-tab-pane>
      <el-tab-pane label="Bài viết không duyệt / vi phạm" name="third">
        <a-spin :spinning="loading">
          <a-row>
            <a-col v-for="estate in expiredRealEstates" :key="estate.id">
              <RealEstateCardItem
                :estate="estate"
                @goToEstateDetails="goToEstateDetails"
                @hidePost="hidePost"
                @deletePost="deletePost"
              />
            </a-col>
          </a-row>
        </a-spin>
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
import { message } from "ant-design-vue";
export default {
  name: "UserPostManagement",
  data() {
    return {
      loading: false,
      activeName: "first",
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
      return this.allRealEstatesOfCurrentUser.filter(
        (estate) =>
          estate.bat_dong_san.TrangThai == RealEstatePostStatus.CHUA_DUYET
      );
    },
    expiredRealEstates() {
      // eslint-disable-next-line eqeqeq
      return this.allRealEstatesOfCurrentUser.filter(
        (estate) =>
          estate.bat_dong_san.TrangThai == RealEstatePostStatus.KHONG_DUYET ||
          estate.TrangThai === RealEstatePostStatus.VI_PHAM
      );
    },
    showingRealEstates() {
      // eslint-disable-next-line eqeqeq
      return this.allRealEstatesOfCurrentUser.filter(
        (estate) =>
          estate.bat_dong_san.TrangThai == RealEstatePostStatus.DA_DUYET
      );
    },
  },
  created() {
    this.getRealEstates();
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    goToEstateDetails(estate) {
      if (estate.bat_dong_san.TrangThai == RealEstatePostStatus.CHUA_DUYET) {
        message.error("Bất động sản này chưa được duyệt");
        return "";
      }
      if (estate.bat_dong_san.TrangThai == RealEstatePostStatus.KHONG_DUYET) {
        message.error("Bất động sản này không được duyệt bài");
        return "";
      }
      if (estate.bat_dong_san.TrangThai == RealEstatePostStatus.VI_PHAM) {
        message.error(
          "Bất động sản này vi phạm luật của trang đã gỡ xuống hệ thống"
        );
        return "";
      } else {
        this.$router.push(`/estate/${estate.bat_dong_san.id}`);
      }
    },
    async hidePost(id) {
      try {
        await RealEstateService.hidePost(id);
        this.getRealEstates();
      } catch (error) {
        console.log(error);
      }
    },
    async deletePost(id) {
      this.$confirm("Bạn có chắc chắn muốn xoá bài đăng này?", "Cảnh báo", {
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        type: "warning",
      })
        .then(async () => {
          await RealEstateService.deleteRealEstatePost(id);
          this.getRealEstates();
          this.$message({
            type: "success",
            message: "Xoá bài đăng thành công",
          });
        })
        .catch(() => {

        });
    },
    async getRealEstates() {
      try {
        this.loading = true;
        const response = await RealEstateService.getAllRealEstates({
          IDNguoiDung: this.currentUser.id,
        });
        const mappedRealEstates = response.data.map((estate) => {
          return {
            ...estate,
            bat_dong_san: {
              ...estate.bat_dong_san,
              HinhAnh: JSON.parse(estate.bat_dong_san.HinhAnh || ""),
            },
          };
        });
        this.allRealEstatesOfCurrentUser = mappedRealEstates;
        this.loading = false;
      } catch (error) {
        console.log(error);
      }
    },
  },
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
