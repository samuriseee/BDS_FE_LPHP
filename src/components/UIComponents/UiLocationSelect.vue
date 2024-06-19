<template>
  <div class="Address">
    <div class="form-group">
      <label for="title">Tỉnh, thành phố</label>
      <el-select
        required
        v-model="selectedCity"
        placeholder="Chọn tỉnh, thành phố"
        @change="onCityChange"
      >
        <el-option
          v-for="city in cities"
          :key="city.id"
          :label="city.name"
          :value="city.name"
        >
        </el-option>
      </el-select>
    </div>

    <div class="form-group">
      <label for="title">Quận, huyện</label>
      <el-select
        required
        v-model="selectedDistrict"
        placeholder="Chọn quận, huyện"
        :disabled="!selectedCity"
        @change="onDistrictChange"
      >
        <!-- <a-select-option
          v-for="district in districts"
          :value="district.name"
          :key="district.id"
        >
          {{ district.name }}
        </a-select-option> -->
        <el-option
          v-for="district in districts"
          :key="district.id"
          :label="district.name"
          :value="district.name"
        >
        </el-option>
      </el-select>
    </div>

    <div class="form-group">
      <label for="title">Phường</label>
      <el-select
        required
        placeholder="Chọn phường"
        v-model="selectedWard"
        @change="onWardChange"
        :disabled="!selectedDistrict"
      >
        <!-- <a-select-option v-for="ward in wards" :value="ward.name" :key="ward.id">
          {{ ward.name }}
        </a-select-option> -->
        <el-option
          v-for="ward in wards"
          :key="ward.id"
          :label="ward.name"
          :value="ward.name"
        >
        </el-option>
      </el-select>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      cities: [],
      districts: [],
      wards: [],
      selectedCity: "",
      selectedDistrict: "",
      selectedWard: "",
    };
  },
  props: {
    ThanhPho: {
      type: String,
      default: "",
    },
    Quan: {
      type: String,
      default: "",
    },
    Phuong: {
      type: String,
      default: "",
    },
  },
  watch: {
    ThanhPho: {
      handler(newValue) {
        this.selectedCity = newValue;
      },
      immediate: true,
    },
    Quan: {
      handler(newValue) {
        this.selectedDistrict = newValue;
      },
      immediate: true,
    },
    Phuong: {
      handler(newValue) {
        this.selectedWard = newValue;
      },
      immediate: true,
    },
  },
  mounted() {
    this.getAPI();
  },
  methods: {
    getAPI() {
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
    onCityChange() {
      const selectedCity = this.cities.find(
        (city) => city.name === this.selectedCity
      );
      this.districts = selectedCity ? selectedCity.districts : [];
      this.selectedDistrict = "";
      this.wards = [];
      this.selectedWard = "";
    },
    onDistrictChange() {
      const selectedCity = this.cities.find(
        (city) => city.name === this.selectedCity
      );
      const selectedDistrict = selectedCity
        ? selectedCity.districts.find(
            (district) => district.name === this.selectedDistrict
          )
        : null;
      this.wards = selectedDistrict ? selectedDistrict.wards : [];
      this.selectedWard = "";
    },
    onWardChange() {
      this.$emit("locationUpdate", {
        city: this.selectedCity,
        district: this.selectedDistrict,
        ward: this.selectedWard,
      });
    },
  },
};
</script>

<style>
/* Your shared CSS styles here */
</style>

<style scoped>
.Address .form-group {
  width: 47%;
}
.form-group {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 10px;
}

.form-group label {
  margin-bottom: 8px;
  color: rgb(44, 44, 44);
  display: flex;
  -webkit-box-align: center;
  align-items: center;
}

.form-group select {
  background: transparent;
  width: 268px;
  padding: 5px;
  font-size: 16px;
  line-height: 1;
  border: 0;
  border-radius: 0;
  height: 34px;
}

select option {
  padding: 6px 12px;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  color: rgb(44, 44, 44);
  background-color: rgb(242, 242, 242);
  cursor: pointer;
}

.form-group .form-control {
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-size: 14px;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  width: 100%;
  color: rgb(44, 44, 44);
  outline: none;
  caret-color: rgb(0, 0, 0);
  background-color: rgb(255, 255, 255);
  font-size: 14px !important;
  line-height: 20px !important;
  min-height: 20px !important;
}

</style>
