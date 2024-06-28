<!-- eslint-disable vue/max-attributes-per-line -->
<template>
  <div class="re_card-full" @click="$router.push('/estate/' + estate.bat_dong_san.id)">
    <div class="re_card-image">
      <div v-for="(HinhAnh, index) in getFirst4Images" :key="index">
        <img :src="HinhAnh" alt="" :style="{
          maxHeight: '300px'
        }" />
      </div>
    </div>
    <div class="re_card-info">
      <h3>{{ estate.bat_dong_san.TieuDe }}</h3>
      <div class="re_card-physicalInfo">
        <p
          style="color: red; font-weight: 500"
        >
          {{ estate.bat_dong_san.MucGia ? formatCurrencyToVietnamese(estate.bat_dong_san.MucGia) : "Thoả Thuận" }}
        </p>
        <p style="color: red; font-weight: 500">
          {{ estate.bat_dong_san.DienTich }} m²
        </p>
        <p :style="{
          maxWidth: '250px',
        }">{{ estate.bat_dong_san.DiaChi }}</p>
        <p>
          <font-awesome-icon icon="bathtub" />
          {{ estate.bat_dong_san.SoPhongTam }}
        </p>
        <p>
          <font-awesome-icon icon="bed" /> {{ estate.bat_dong_san.SoPhongNgu }}
        </p>
        <p>
          {{ estate.bat_dong_san.Quan }}, {{ estate.bat_dong_san.ThanhPho }}
        </p>
      </div>
      <div class="re_card-descript"
           :style="{
             fontWeight: '300',
           }">{{ spliceDescription }}</div>
      <div class="re_card-contact">
        <div class="re_card-author">
          <a-avatar
            :size="40"
            :style="{
              backgroundColor: '#ffeceb',
              color: '#74150f',
              verticalAlign: 'middle',
              marginRight: '10px',
            }"
          >
            {{ estate.nguoi_dung.ho_ten.slice(0, 1) }}
          </a-avatar>
          {{ estate.nguoi_dung.ho_ten }}
        </div>
        <div class="re_card-number">
          <font-awesome-icon icon="phone" />
          {{ estate.nguoi_dung.so_dien_thoai || "Chưa cập nhật" }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { formatCurrencyToVietnamese } from "@/services/util";
export default {
  name: "EstateCardOnListPage",
  props: {
    estate: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {};
  },
  computed: {
    getFirst4Images() {
      return this.estate.bat_dong_san.HinhAnh.slice(0, 4);
    },
    spliceDescription() {
      if (!this.estate.bat_dong_san.MoTa) return this.estate.bat_dong_san.MoTa;
      else return this.estate.bat_dong_san.MoTa.slice(0, 300) + "...";
    },
  },
  methods: {
    formatCurrencyToVietnamese,
  },
};
</script>

<style lang="scss" scoped>
.re_card-full {
  box-sizing: border-box;
  box-shadow: rgba(44, 44, 44, 0.04) 0px 4px 6px 0px;
  border-radius: 4px;
  border-width: 1px;
  border-style: solid;
  border-color: rgb(242, 242, 242);
  border-image: initial;
  text-align: left;
  margin: 0 auto 20px;
  width: 95%;
  cursor: pointer;
}
.re_card-info {
  line-height: 1.2;
  padding: 20px 20px 0 20px;
  h3 {
    font-family: "Lexend Medium", Roboto, Arial !important;
    font-size: 14px;
    line-height: 20px;
    font-weight: bold !important;
    letter-spacing: -0.2px;
    color: #2c2c2c;
    text-transform: uppercase;
  }
}
.re_card-info .re_card-physicalInfo {
  display: flex;
  padding: 10px 0;
  p {
    font-size: 14px;
    font-weight: 400;
    margin: 0 15px 0 0;
  }
}
.re_card-contact {
  display: flex;
  justify-content: space-between;
  position: relative;
  border-top: 1px solid #f2f2f2;
  width: 100%;
  padding: 15px 0;
  margin-top: 15px;
  .re_card-author {
    display: flex;
    align-items: center;
    font-weight: bold;
  }
  .re_card-number {
    font-style: normal;
    color: #fff;
    background: #009ba1;
    outline: none;
    display: inline-block;
    text-align: center;
    cursor: pointer;
    box-shadow: none !important;
    letter-spacing: -0.2px;
    padding: 0px 11px;
    border-radius: 4px;
    display: flex;
    align-content: center;
    align-items: center;
    justify-content: space-evenly;
    width: 150px;
  }
}
.re_card-image {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(2, 200);
  grid-gap: 5px;
  position: relative;
  img {
    width: 150px;
    height: 150px;
    object-fit: cover;
  }
  &::after {
    position: absolute;
    width: 100%;
    height: 40px;
    left: 0px;
    bottom: 0px;
    background: linear-gradient(
      180deg,
      rgba(44, 44, 44, 0) 0%,
      #2c2c2c 108.75%
    );
    content: "";
    z-index: 1;
    border-bottom-left-radius: 4px;
  }
}
.re_card-image div:nth-child(1) {
  grid-column: 1/4;
  grid-row: 1/3;
}
.re_card-image div:nth-child(1) img {
  width: 100%;
  height: auto;
}
.re_card-image div:nth-child(2) {
  grid-column: 4/6;
  grid-row: 1/2;
}
.re_card-image div:nth-child(2) img {
  width: 100%;
  height: 100%;
}
.re_card-image div:nth-child(3) {
  grid-column: 4/5;
  grid-row: 2/3;
}
.re_card-image div:nth-child(4) {
  grid-column: 5/6;
  grid-row: 2/3;
}
.re_card-image div:nth-child(3) img,
.re_card-image div:nth-child(4) img {
  width: 100%;
  height: 100%;
}
</style>
