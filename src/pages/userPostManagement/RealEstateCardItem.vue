<template>
  <div class="real-estate-card-item">
    <el-carousel class="real-estate-card-item__image">
      <el-carousel-item v-for="(item, index) in estate.bat_dong_san.HinhAnh" :key="index">
        <img :src="item" />
      </el-carousel-item>
    </el-carousel>
    <div class="real-estate-card-item__content">
      <h3 class="real-estate-card-item__title">
        <a-tag :style="RealEstatePostStatusTagStyle[estate.bat_dong_san.TrangThai].style">
          {{ RealEstatePostStatusTagStyle[estate.bat_dong_san.TrangThai].text }}
        </a-tag>
        {{ estate.bat_dong_san.TieuDe }}
      </h3>
      <p class="real-estate-card-item__address">
        {{ estate.bat_dong_san.DiaChi }}
      </p>
      <div class="real-estate-card-item_date">
        <p>Ngày tạo: {{ moment(estate.bat_dong_san.created_at).format('DD/MM/YYYY, h:mm') }}</p>
        <p>Ngày cập nhật: {{ moment(estate.bat_dong_san.updated_at).format('DD/MM/YYYY, h:mm') }}</p>
      </div>
    </div>

    <div class="real-estate-card-item__static">
      <div :style="{
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
        alignItems: 'center',
        justifyContent: 'center',
        height: '60%',
        color: 'rgb(0, 155, 161)',
        fontSize: '14px',
        fontWeight: '500',
        letterSpacing: '-0.2px',
      }">
        <i class="el-icon-loading"></i>
        Tin này hiện tại chưa có số liệu
      </div>
      <el-button :style="{
        marginTop: '10px',
        position: 'relative',
        height: '32px',
        display: 'inline-block',
        borderRadius: '4px',
        cursor: 'pointer',
        whiteSpace: 'nowrap',
        width: 'fit-content',
        letterSpacing: '-0.2px',
        backgroundColor: 'rgb(255, 255, 255)',
        padding: '6px 12px',
        color: 'rgb(0, 155, 161)',
        opacity: 1,
        border: '1px solid rgb(0, 155, 161)'
      }"><i class="el-icon-edit"></i> Sửa tin</el-button>
    </div>
  </div>

</template>

<script>
// import { RealEstateService } from "@/services/real_estate.service";
// import { RealEstatePostStatus } from "@/constants/index";
import { RealEstatePostStatusTagStyle } from "@/constants/index";
import moment from "moment";
export default {
  name: "RealEstateCardItem",
  props: {
    estate: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
        RealEstatePostStatusTagStyle,
    };
  },
  computed: {

  },
  methods: {
    moment,
  },
};
</script>

<style scoped>

.real-estate-card-item {
  display: flex;
  padding: 10px;
  border: 1px solid #ebeef5;
  border-radius: 5px;
  margin: 20px;
  cursor: pointer;
}

.real-estate-card-item__image {
    width: 200px;
    height: 150px;
    img {
        width: 200px;
        height: 150px;
        object-fit: cover;
    }
}

.real-estate-card-item__content {
    text-align: left;
    padding: 0 20px;
}

.real-estate-card-item__title {
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 10px;
    line-height: 20px;
    letter-spacing: -0.2px;
}

.real-estate-card-item__address {
    font-size: 12px;
    line-height: 16px;
    font-weight: 400;
    color: rgb(80, 80, 80);
}

.real-estate-card-item__static {
    margin: 0 auto;
    border-left: 1px solid #ebeef5;
    padding: 0 0 0 50px;
}

</style>