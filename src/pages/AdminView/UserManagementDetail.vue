<template>
  <a-layout
    :style="{
      width: '90%',
      margin: '0 auto',
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
          <div>
            <el-tag type="success" v-if="currentUser.trang_thai">Hoạt động</el-tag>
            <el-tag type="danger" v-else>Cảnh cáo vi phạm</el-tag>
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

              <div>
                <a-popconfirm
                  title="Xác nhận dừng hoạt động người dùng này?"
                  ok-text="Xác nhận"
                  cancel-text="Không"
                  @confirm="confirmDeactivate()"
                  @cancel="()=>{}"
                >
                  <el-button type="danger">Đánh dấu người dùng vi phạm</el-button>
                </a-popconfirm>
              </div>
            </div>
          </el-card>
        </el-col>

      </el-row>
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
          :style="{
            margin: '15px 0',
            display: 'flex',
            justifyContent: 'flex-start',
          }"
        >
          <el-input
            prefix-icon="el-icon-search"
            v-model="searchParams.TieuDe"
            clearable
            placeholder="Tìm kiếm"
            :style="{
              width: '500px',
            }"
          ></el-input>
          <el-select
            v-model="searchParams.TrangThai"
            placeholder="Trạng thái"
            style="margin-left: 10px"
            clearable
          >
            <el-option
              v-for="item in RealEstatePostStatuses"
              :key="item.value"
              :label="item.text"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <a-table
          :columns="allColumns"
          :data-source="allRealEstates"
          row-key="id"
          :loading="loading"
          :pagination="{
            current: currentPage,
            pageSize: itemsPerPage,
            total: totalRecords,
            showSizeChanger: true,
            pageSizeOptions: ['5', '10', '20', '50'],
            showTotal: (total) => `Tổng số ${total} bài đăng`,
          }"
          @change="handleTableChange"
        >
          <span slot="DienTich" slot-scope="DienTich">
            <span>{{ Number(DienTich).toLocaleString("en-US") }} m2</span>
          </span>
          <span slot="MucGia" slot-scope="MucGia">
            <span>{{
              MucGia ? formatCurrencyToVietnamese(MucGia) : "Thoả Thuận"
            }}</span>
          </span>
          <span slot="TrangThai" slot-scope="TrangThai">
            <a-tag :style="RealEstatePostStatusTagStyle[TrangThai].style">
              {{ RealEstatePostStatusTagStyle[TrangThai].text }}
            </a-tag>
          </span>
          <span slot="action" slot-scope="text, record">
            <a-button type="primary" @click="handleViewDetail(record)">
              <i class="el-icon-s-operation"></i>
            </a-button>
          </span>
        </a-table>
      </div>
    </a-layout-content>
  </a-layout>

</template>

<script>
import { AdminService } from "@/services/admin.service";
import { RealEstateService } from "@/services/real_estate.service";
import { RealEstatePostStatuses, RealEstatePostStatusTagStyle } from "@/constants/index";
import { formatCurrencyToVietnamese } from "@/services/util";

export default {
  name: "UserManagementDetail",
  data() {
    return {
      userId: this.$route.params.id,
      currentUser: {},
      currentPage: 1,
      itemsPerPage: 5,
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
    this.getUserById();
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
    async confirmDeactivate() {
      try {
        await AdminService.updateUser(this.userId, {
          ...this.currentUser,
          trang_thai: !this.currentUser.trang_thai,
        });
        this.getUserById(this.currentUser.id);
      } catch (error) {
        console.log(error);
      }
    },
    async getUserById() {
      try {
        const response = await AdminService.getUserById(this.userId);
        this.currentUser = response;
      } catch (error) {
        console.log(error);
      }
    },
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
        this.allRealEstates = response.data;
        this.totalRecords = response.total_records;
        this.loading = false;
      } catch (error) {
        console.log(error);
      }
    },
    handleViewDetail(record) {
      this.$router.push(`/admin/post-management/${record.bat_dong_san.id}`);
    },
  },
  watch: {
    searchParams: {
      handler() {
        this.getRealEstates(this.searchParams);
      },
      deep: true,
    },
  },
}
</script>
<style scoped>
  p {
    font-size: 18px;
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
