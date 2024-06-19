<!-- eslint-disable vue/max-attributes-per-line -->
<!-- eslint-disable eqeqeq -->
<template>
  <CommonLayout>
    <a-layout
      :style="{
        width: '90%',
        margin: '0 auto',
        background: 'transparent',
        scrollBehavior: 'smooth'
      }"
    >
      <a-layout-header
        :style="{
          background: 'transparent',
          padding: '16px',
          height: 'auto',
        }"
      >
        <a-card
          :style="{
            background: 'rgba(0, 0, 0, 0.6)',
            border: '15px',
          }"
        >
          <div>
            <el-autocomplete
              placeholder="Nhập địa điểm bạn đang tìm kiếm..."
              v-model="selectedCategoriesParams.keyword"
              class="input-with-select"
              :fetch-suggestions="querySearch"
              autocomplete="on"
              :style="{
                width: '100%',
              }"
            >
              <el-select
                slot="prepend"
                placeholder="Chọn thành phố"
                v-model="selectedCategoriesParams.city"
                @change="onCityChange"
                :style="{
                  minWidth: '200px',
                  width: 'fit-content',
                }"
              >
                <el-option
                  v-for="city in cities"
                  :key="city.id"
                  :label="city.name"
                  :value="city.name"
                >
                </el-option>
              </el-select>
              <el-button
                slot="append"
                :style="{
                  background: '#e03c31',
                  color: 'white',
                  border: 'none',
                  fontWeight: 'bold',
                }"
              >
                Tìm kiếm
              </el-button>
            </el-autocomplete>
          </div>
          <div
            :style="{
              marginTop: '5px',
              display: 'flex',
              gap: '0px 10px',
            }"
          >
            <el-select
              multiple
              filterable
              :style="{
                minWidth: '200px',
                overflow: 'hidden',
              }"
              placeholder="Loại Nhà Đất"
              v-model="selectedCategoriesParams.LoaiBDS"
              @change="handleChange"
            >
              <el-option
                v-for="item in allCurrentRealEstateTypes"
                :key="item.id"
                :label="item.LoaiBDS"
                :value="item.id"
              >
              </el-option>
            </el-select>
            <el-select
              placeholder="Mức Giá"
              v-model="selectedCategoriesParams.price"
            >
              <el-option
                v-for="item in filterCateByPrice"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
            <el-select
              placeholder="Diện Tích"
              :style="{
                width: '150px',
              }"
              v-model="selectedCategoriesParams.area"
            >
              <el-option
                v-for="item in filterCateByArea"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
            <el-select
              placeholder="Số phòng ngủ"
              multiple
              :style="{
                minWidth: '100px',
              }"
              v-model="selectedCategoriesParams.bedrooms"
            >
              <el-option
                v-for="item in 20"
                :key="item"
                :label="item"
                :value="item"
              >
              </el-option>
            </el-select>
          </div>
        </a-card>
      </a-layout-header>
      <a-layout
        :style="{
          background: 'transparent',
          marginBottom: '40px',
        }"
      >
        <a-layout-content>
          <el-breadcrumb
            separator="/"
            :style="{
              marginLeft: '20px',
              marginBottom: '10px',
            }"
          >
            <el-breadcrumb-item>{{
              this.businessType ? "Bán" : "Cho Thuê"
            }}</el-breadcrumb-item>
            <el-breadcrumb-item>{{
              this.selectedCategoriesParams.city
                ? this.selectedCategoriesParams.city
                : "Toàn Quốc"
            }}</el-breadcrumb-item>
          </el-breadcrumb>
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
              marginLeft: '20px',
            }"
          >
            {{
              this.selectedCategoriesParams.city
                ? `Nhà đất ${this.businessType ? "bán" : "cho thuê"} tại
            ${this.selectedCategoriesParams.city}`
                : `Nhà đất ${this.businessType ? "bán" : "cho thuê"} toàn quốc`
            }}
          </h1>
          <p
            :style="{
              lineHeight: '32px',
              letterSpacing: '-0.2px',
              color: '#2C2C2C',
              display: 'block',
              textAlign: 'left',
              marginLeft: '20px',
            }"
          >
            Hiện đang có {{ this.realEstatesByParams.length }} bất động sản
          </p>
          <a-row>
            <a-col v-for="estate in paginatedRealEstates" :key="estate.id">
              <a-spin :spinning="fakeLoading">
                <EstateCardOnListPage
                  :estate="estate"
                  @goToEstateDetails="goToEstateDetails"
                />
              </a-spin>
            </a-col>
          </a-row>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="itemsPerPage"
            layout="total, prev, pager, next, jumper"
            :total="realEstatesByParams.length"
            background

          >
          </el-pagination>
        </a-layout-content>
        <a-layout-sider
          :style="{
            background: 'transparent',
          }"
        >
          <a-card
            :style="{
              border: '1px solid #f2f2f2',
              borderRadius: '8px',
              marginBottom: '16px',
            }"
          >
            <a-list item-layout="horizontal" :data-source="filterCateByPrice">
              <a-list-item
                slot="renderItem"
                slot-scope="item"
                :style="{
                  cursor: 'pointer',
                }"
                @click="selectedCategoriesParams.price = item.value"
              >
                {{ item.label }}
              </a-list-item>
            </a-list>
          </a-card>

          <a-card
            :style="{
              border: '1px solid #f2f2f2',
              borderRadius: '8px',
              marginBottom: '16px',
            }"
          >
            <a-list item-layout="horizontal" :data-source="filterCateByArea">
              <a-list-item
                slot="renderItem"
                slot-scope="item"
                :style="{
                  cursor: 'pointer',
                }"
                @click="selectedCategoriesParams.area = item.value"
              >
                {{ item.label }}
              </a-list-item>
            </a-list>
          </a-card>
        </a-layout-sider>
      </a-layout>
    </a-layout>
  </CommonLayout>
</template>

<script>
import CommonLayout from "@/layout/CommonLayout.vue";
import SearchBarOnEstateList from "@/components/UserPageComponent/SearchBarOnEstateList.vue";
import { RealEstateService } from "@/services/real_estate.service";
import EstateCardOnListPage from "@/components/UserPageComponent/EstateCardOnListPage.vue";
import { mapGetters } from "vuex/dist/vuex.common";
import { RealEstatePostStatus } from "@/constants/index";
import axios from "axios";
import { formatCurrencyToVietnamese } from "@/services/util";

export default {
  components: {
    CommonLayout,
    SearchBarOnEstateList,
    EstateCardOnListPage,
  },
  created() {
    this.getRealEstates();
    this.getAllCities();
  },
  data() {
    return {
      fakeLoading: false,
      currentPage: 1,
      itemsPerPage: 5,
      cities: [],
      districts: [],
      allRealEstates: [],
      searchQuery: "",
      filterCateByPrice: [
        { value: [], label: "Tất cả" },
        {
          value: [0, 500000000],
          label: `Dưới ${formatCurrencyToVietnamese(500000000)}`,
        },
        {
          value: [500000000, 800000000],
          label: `${formatCurrencyToVietnamese(
            500000000
          )} - ${formatCurrencyToVietnamese(800000000)}`,
        },
        {
          value: [800000000, 1000000000],
          label: `${formatCurrencyToVietnamese(
            800000000
          )} - ${formatCurrencyToVietnamese(1000000000)}`,
        },
        {
          value: [1000000000, 3000000000],
          label: `${formatCurrencyToVietnamese(
            1000000000
          )} - ${formatCurrencyToVietnamese(3000000000)}`,
        },
        {
          value: [3000000000, 5000000000],
          label: `${formatCurrencyToVietnamese(
            3000000000
          )} - ${formatCurrencyToVietnamese(5000000000)}`,
        },
        {
          value: [5000000000, 7000000000],
          label: `${formatCurrencyToVietnamese(
            5000000000
          )} - ${formatCurrencyToVietnamese(7000000000)}`,
        },
        {
          value: [7000000000, 10000000000],
          label: `${formatCurrencyToVietnamese(
            7000000000
          )} - ${formatCurrencyToVietnamese(10000000000)}`,
        },
        {
          value: [10000000000, 100000000000],
          label: `Trên ${formatCurrencyToVietnamese(10000000000)}`,
        },
      ],
      filterCateByArea: [
        { value: [], label: "Tất cả" },
        { value: [0, 30], label: "Dưới 30 m2" },
        { value: [0, 50], label: "30 - 50 m2" },
        { value: [50, 80], label: "50 - 80 m2" },
        { value: [80, 100], label: "80 - 100 m2" },
        { value: [100, 150], label: "100 - 150 m2" },
        { value: [150, 200], label: "150 - 200 m2" },
      ],
      selectedCategoriesParams: {
        keyword: "",
        price: [],
        area: [],
        city: "",
        district: [],
        LoaiBDS: [],
        bedrooms: [],
      },
    };
  },
  computed: {
    ...mapGetters(["allRealEstateType"]),
    businessType() {
      return this.$route.params.businessType;
    },
    allCurrentRealEstateTypes() {
      return this.allRealEstateType
        ? // eslint-disable-next-line eqeqeq
          this.allRealEstateType.filter(
            (item) => item.BanHayChoThue == Boolean(this.businessType)
          )
        : [];
    },
    realEstateType() {
      return this.$route.params.realEstateType;
    },
    paginatedRealEstates() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.realEstatesByParams.slice(start, end);
    },
    realEstatesByParams() {
      return this.allRealEstates?.filter((estate) => {
        const { price, area, city, district, LoaiBDS, bedrooms } =
          this.selectedCategoriesParams;
        // eslint-disable-next-line eqeqeq
        const isMatchBusinessTypeAndBeenApproved =
          estate.bat_dong_san.TrangThai == RealEstatePostStatus.DA_DUYET &&
          estate.loai_bat_dong_san.BanHayChoThue ==
            Boolean(this.businessType) &&
          (this.realEstateType == null ||
            this.realEstateType == undefined ||
            estate.loai_bat_dong_san.id == this.realEstateType);
        const isPriceMatch =
          price.length === 0 ||
          (estate.bat_dong_san.MucGia >= price[0] &&
            estate.bat_dong_san.MucGia <= price[1]);
        const isAreaMatch =
          area.length === 0 ||
          (estate.bat_dong_san.DienTich >= area[0] &&
            estate.bat_dong_san.DienTich <= area[1]);
        const isCityMatch =
          city === "" ||
          estate.bat_dong_san.ThanhPho == this.onlyGetNameOfCity(city);
        const isDistrictMatch =
          district.length === 0 || district === estate.bat_dong_san.Quan;
        const isLoaiBDSMatch =
          LoaiBDS.length === 0 || LoaiBDS.includes(estate.loai_bat_dong_san.id);
        const isBedroomsMatch =
          bedrooms.length === 0 ||
          bedrooms.includes(estate.bat_dong_san.SoPhongNgu);
        return (
          isMatchBusinessTypeAndBeenApproved &&
          isPriceMatch &&
          isAreaMatch &&
          isCityMatch &&
          isDistrictMatch &&
          isLoaiBDSMatch &&
          isBedroomsMatch
        );
      });
    },
  },
  methods: {
    handleSizeChange(val) {
      this.itemsPerPage = val;
    },
    async handleCurrentChange(val) {
      this.fakeLoading = true;
      await new Promise(resolve => setTimeout(resolve, 1000));
      this.currentPage = val;
      this.fakeLoading = false;
      window.scrollTo(0, 150);
    },
    onCityChange(city) {
      this.selectedCategoriesParams.city = city;
      const selectedCity = this.cities.find((c) => c.name === city);
      this.districts = selectedCity.districts;
    },
    querySearch(queryString, cb) {
      if (this.selectedCategoriesParams.city) {
        const results = queryString
          ? this.districts.filter((district) =>
              district.name.toLowerCase().includes(queryString.toLowerCase())
            )
          : this.districts;
        const mappedResult = results.map((district) => {
          return {
            value: district.name,
            label: district.name,
          };
        });
        cb(mappedResult);
      } else {
        cb(this.cities.map((city) => ({ value: city.name, label: city.name })));
      }
    },
    handleSelect(item) {
      this.selectedCategoriesParams.district = item;
    },
    goToEstateDetails(id) {
      this.$router.push({ name: "estate", params: { id: id } });
    },
    updateSearchQuery(searchQuery) {
      this.searchQuery = searchQuery;
    },
    async getRealEstates() {
      try {
        const response = await RealEstateService.getAllRealEstates();
        const mappedRealEstates = response.map((estate) => {
          return {
            ...estate,
            bat_dong_san: {
              ...estate.bat_dong_san,
              HinhAnh: JSON.parse(estate.bat_dong_san.HinhAnh || ""),
            },
          };
        });
        this.allRealEstates = mappedRealEstates;
      } catch (error) {
        console.log(error);
      }
    },
    // input: Thành Phố Hà Nội => output: Hà Nội
    // input: Tỉnh Hoà Khánh => output: Hoà Khánh
    onlyGetNameOfCity(city) {
      if (city.includes("Tỉnh")) {
        return city.replace("Tỉnh", "").trim();
      } else if (city.includes("Thành phố")) {
        return city.replace("Thành phố", "").trim();
      } else {
        return city;
      }
    },
    async getAllCities() {
      const API = `https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json`;
      axios
        .get(API)
        .then((res) => {
          const jsonData = res.data;
          const cities = jsonData.map((city) => ({
            id: city.Id,
            name: city.Name,
            districts: city.Districts.map((district) => ({
              id: district.Id,
              name: district.Name,
              wards: district.Wards.map((ward) => ({
                id: ward.Id,
                name: ward.Name,
              })),
            })),
          }));
          this.cities = cities;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
.el-select .el-input {
  width: 110px;
}

.el-pagination.is-background .el-pager li.active {
  background-color: #e03c31 !important;
  color: #FFF;
}

.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
</style>
