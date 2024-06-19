<template>
  <div class="app-container">
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
      Quản lý tin đăng
    </h1>
    <div :style="{
      margin: '15px 0',
      display: 'flex',
      justifyContent: 'flex-start',
    }">
      <el-input
        prefix-icon="el-icon-search"
        v-model="searchParams.search"
        placeholder="Tìm kiếm"
        :style="{
          width: '500px',
        }"
      ></el-input>
      <el-select
        v-model="searchParams.status"
        placeholder="Trạng thái"
        style="margin-left: 10px"
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
      :data-source="filteredRealEstates"
      row-key="id"
      :loading="listLoading"
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
    <router-view></router-view>
  </div>
</template>

<script>
import { RealEstateService } from "@/services/real_estate.service";
import {
  RealEstatePostStatuses,
  RealEstatePostStatusTagStyle,
} from "@/constants/index";
import { formatCurrencyToVietnamese } from "@/services/util";

export default {
  name: "RealEstatePostManagement",
  data() {
    return {
      allRealEstates: [],
      listLoading: true,
      RealEstatePostStatuses,
      RealEstatePostStatusTagStyle,
      searchParams: {
        search: "",
        status: null,
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
    this.getAllRealEstates();
  },
  computed: {
    filteredRealEstates() {
      return this.allRealEstates.filter((realEstate) => {
        return (
          realEstate.bat_dong_san.TieuDe.toLowerCase().includes(
            this.searchParams.search.toLowerCase()
          ) &&
          (this.searchParams.status !== null
            ? realEstate.bat_dong_san.TrangThai == this.searchParams.status
            : true)
        );
      });
    },
  },
  methods: {
    formatCurrencyToVietnamese,
    getAllRealEstates() {
      RealEstateService.getAllRealEstates()
        .then((response) => {
          this.allRealEstates = response;
          console.log("allRealEstates", this.allRealEstates);
          this.listLoading = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    handleViewDetail(record) {
      this.$router.push(`/admin/post-management/${record.bat_dong_san.id}`);
    },
  },
};
</script>

<style scoped>
.app-container {
  padding: 20px;
  min-height: 100vh;
  font-family: "Lexend Medium", Roboto, Arial !important;
}
</style>
