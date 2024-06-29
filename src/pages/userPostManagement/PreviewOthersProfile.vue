<template>
  <CommonLayout>
    <a-layout
      :style="{
        width: '90%',
        margin: '20px auto',
        background: 'transparent',
      }"
    >
      <a-layout-content>
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
          Thông tin người dùng
        </h1>
        <el-row :gutter="12">
          <el-col :span="6"
                  :style="{
                    marginTop: '50px'
                  }">
            <div
              :style="{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: '20px',
              }"
            >
              <a-avatar
                :size="70"
                :style="{
                  backgroundColor: '#ffeceb',
                  color: '#74150f',
                  verticalAlign: 'middle',
                  fontSize: '28px',
                  fontWeight: 'bold'
                }"
                :theme="'light'"
              >
                {{ spliceUsernameToMakeAvatar }}
              </a-avatar>
            </div>
            <div
              :style="{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }"
            >
              <h2
                :style="{
                  fontSize: '24px',
                  lineHeight: '32px',
                  fontWeight: '500',
                  letterSpacing: '-0.2px',
                  color: '#2C2C2C',
                  display: 'block',
                  textAlign: 'center',
                }"
              >
                {{ currentUser.ho_ten }}
              </h2>
            </div>
          </el-col>
          <el-col :span="18" >
            <el-card shadow="never">
              <div :style="{
                display: 'flex',
                justifyContent: 'space-between',
                textAlign: 'left'
              }">
                <div>
                  <h2
                    :style="{
                      fontSize: '24px',
                      lineHeight: '32px',
                      fontWeight: '500',
                      letterSpacing: '-0.2px',
                      color: '#2C2C2C',
                      display: 'block',
                    }"
                  >
                    Thông tin liên hệ
                  </h2>

                  <p>
                    <span class="label">Người đăng bài:  </span>
                    {{ currentUser.ho_ten }}
                  </p>
                  <p>
                    <span class="label">Email:  </span>
                    {{ currentUser.email }}
                  </p>
                  <p>
                    <span class="label">Số điện thoại:  </span>
                    {{ currentUser.so_dien_thoai }}
                  </p>
                </div>

              </div>
            </el-card>
          </el-col>

        </el-row>
        <a-spin :spinning="loading">
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
                marginTop: '10px'
              }"
            >
              Danh sách tin của {{ currentUser.ho_ten }}
            </h1>
            <div
              class="wrapper"
              :style="{
                marginBottom: '40px',
              }"
            >
              <div
                :style="{
                  display: 'flex',
                  gap: '20px',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                }"
              >
                <el-card
                  v-for="blog in allRealEstates"
                  :key="blog.bat_dong_san.id"
                  :style="{
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: '20px',
                    textAlign: 'left',
                    width: '23%',
                  }"
                  :body-style="{ padding: '0px' }"
                  shadow="hover"
                  @click.native="goToEstateDetails(blog.bat_dong_san.id)"
                >

                  <el-carousel trigger="click" direction="vertical"  height="150px">
                    <el-carousel-item v-for="item in blog.bat_dong_san.HinhAnh" :key="item">
                      <img
                        :style="{
                          width: '100%',
                          objectFit: 'cover',
                          marginBottom: '12px',
                          height: '200px',
                        }"
                        :src="item"
                        alt=""
                      />
                    </el-carousel-item>
                  </el-carousel>
                  <h3
                    :style="{
                      fontSize: '16px',
                      lineHeight: '24px',
                      letterSpacing: '-.2px',
                      marginBottom: '12px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: '3',
                      WebkitBoxOrient: 'vertical',
                      padding: '0 10px',
                    }"
                  >
                    {{ blog.bat_dong_san.TieuDe }}
                  </h3>
                  <div
                    :style="{
                      display: 'flex',
                      padding: '10px',
                      gap: '10px',
                    }"
                  >
                    <p
                      style="color: red; font-weight: 500"
                    >
                      {{ blog.bat_dong_san.MucGia ? formatCurrencyToVietnamese(blog.bat_dong_san.MucGia) : "Thoả Thuận" }}
                    </p>
                    <p style="color: red; font-weight: 500">
                      {{ blog.bat_dong_san.DienTich }} m²
                    </p>
                  </div>
                  <div
                    :style="{
                      display: 'flex',
                      padding: '10px',
                      gap: '10px',
                      fontSize: '14px',
                    }"
                  >
                    <i class="el-icon-location-outline"
                       :style="{
                         fontSize: '20px',
                       }"></i>
                    <p>
                      {{ blog.bat_dong_san.Quan }}, {{ blog.bat_dong_san.ThanhPho }}
                    </p>
                  </div>
                </el-card>
              </div>
            </div>
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-size="itemsPerPage"
              layout="total, prev, pager, next, jumper"
              :total="totalRecords"
              background
            >
            </el-pagination>
          </div>
        </a-spin>
      </a-layout-content>
    </a-layout>
  </CommonLayout>
</template>

<script>
// import { AdminService } from "@/services/admin.service";
import { RealEstateService } from "@/services/real_estate.service";
import { RealEstatePostStatuses, RealEstatePostStatusTagStyle } from "@/constants/index";
import { formatCurrencyToVietnamese } from "@/services/util";
import CommonLayout from "@/layout/CommonLayout.vue";

export default {
  name: "UserManagementDetail",
  components: { CommonLayout },
  data() {
    return {
      userId: this.$route.params.id,
      currentUser: {},
      currentPage: 1,
      itemsPerPage: 8,
      totalRecords: 0,
      allRealEstates: [],
      loading: false,
      RealEstatePostStatuses,
      RealEstatePostStatusTagStyle,
      searchParams: {
        TieuDe: "",
        TrangThai: null,
      },
      allColumns: [
        {
          dataIndex: "bat_dong_san.TieuDe",
          title: "Tiêu đề",
          key: "TieuDe",
        },
        {
          dataIndex: "loai_bat_dong_san.LoaiBDS",
          title: "Loại bất động sản",
          key: "LoaiBDS",
        },
        {
          dataIndex: "bat_dong_san.DiaChi",
          title: "Địa chỉ",
          key: "DiaChi",
        },
        {
          dataIndex: "bat_dong_san.ThanhPho",
          title: "Thành phố",
          key: "ThanhPho",
        },
        {
          dataIndex: "bat_dong_san.DienTich",
          title: "Diện tích",
          slots: { title: "customDienTich" },
          scopedSlots: { customRender: "DienTich" },
        },
        {
          dataIndex: "bat_dong_san.MucGia",
          title: "Mức giá",
          slots: { title: "customMucGia" },
          scopedSlots: { customRender: "MucGia" },
        },
        {
          dataIndex: "bat_dong_san.TrangThai",
          title: "Trạng thái",
          slots: { title: "customTrangThai" },
          scopedSlots: { customRender: "TrangThai" },
        },
        {
          title: "Action",
          key: "action",
          scopedSlots: { customRender: "action" },
        },
      ],
    };
  },
  created() {
    this.getRealEstates(this.searchParams);
    // this.getUserById();
  },
  computed: {
    spliceUsernameToMakeAvatar() {
      if (this.currentUser) {
        return this.currentUser?.ho_ten?.slice(0, 1).toUpperCase();
      }
      return "A";
    },
  },
  methods: {
    formatCurrencyToVietnamese,
    handleSizeChange(val) {
      this.itemsPerPage = val;
    },
    async handleCurrentChange(val) {
      this.currentPage = val;
    },
    handleTableChange(pagination, filters, sorter) {
      this.currentPage = pagination.current;
      this.itemsPerPage = pagination.pageSize;
      this.getRealEstates(this.searchParams);
    },
    // async getUserById() {
    //   try {
    //     const response = await AdminService.getUserById(this.userId);
    //     this.currentUser = response;
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },
    async getRealEstates(params) {
      try {
        this.loading = true;
        const offset = (this.currentPage - 1) * this.itemsPerPage;
        const limit = this.itemsPerPage;
        const response = await RealEstateService.getAllRealEstates({
          ...params,
          IDNguoiDung: this.userId,
          offset,
          limit,
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
        this.currentUser = mappedRealEstates[0].nguoi_dung;
        this.allRealEstates = mappedRealEstates;
        this.totalRecords = response.total_records;
        this.loading = false;
      } catch (error) {
        console.log(error);
      }
    },
    goToEstateDetails(id) {
      this.$router.push(`/estate/${id}`);
    },
  },
  watch: {
    currentPage() {
      this.getRealEstates(this.selectedCategoriesParams);
    },
  },
}
</script>
<style scoped>
p {
  font-size: 15px;
}
.container {
  margin-top: 20px;
}
.label {
  font-weight: bold;
}
.avatarAndName {
  text-align: center;
}
</style>
