<template>
  <CommonLayout>
    <a-layout :style="{
      width: '90%',
      margin: '0 auto',
      background: 'transparent',
    }">
      <a-layout :style="{
        background: 'transparent'
      }">
        <a-layout-content>
          <a-carousel class="imageBox" arrows dots-class="slick-dots slick-thumb">
            <div slot="prevArrow" class="custom-slick-arrow" style="left: 10px;zIndex: 1">
              <a-icon type="left-circle" />
            </div>
            <div slot="nextArrow" class="custom-slick-arrow" style="right: 10px">
              <a-icon type="right-circle" />
            </div>
            <div v-for="item in estateDetail.HinhAnh" :key="item">
              <a slot="customPaging">
                <img :src="estateDetail.HinhAnh" />
              </a>
              <el-img :src="item" :preview-src-list="estateDetail.HinhAnh" />
            </div>
          </a-carousel>
          <div class="detail__left--content">
            <div class="detail__left--title">
              <p class="breadcrumb">
                {{ (estateDetail.BanHayChoThue.data = 1 ? "Bán" : "Thuê") }} / {{
                  estateDetail.ThanhPho
                }} / {{ estateDetail.QuanHuyen }} /
                <span>{{ estateDetail.dia_chi_cu_the }}</span>
              </p>
              <h3>
                {{ estateDetail.TieuDe }}
              </h3>
              <p>
                {{ estateDetail.DiaChiCuThe }}
              </p>
            </div>

            <div class="detail__left--specifications">
              <div style="display: flex">
                <div class="left__specifications--item">
                  <p>Mức giá</p>
                  <h4>{{ formatCurrencyToVietnamese(estateDetail.MucGia) }} {{ estateDetail.DonVi }}
                  </h4>
                </div>

                <div class="left__specifications--item">
                  <p>Diện tích</p>
                  <h4>{{ estateDetail.DienTich }} m²</h4>
                </div>

                <div class="left__specifications--item">
                  <p>Phòng ngủ</p>
                  <h4>{{ estateDetail.SoPhongNgu }} PN</h4>
                </div>
              </div>

              <div class="left__specifications--icon">
                <p>
                  <a-icon type="share-alt"
                          :style="{
                            fontSize: '28px',
                            color: '#b3b3b3',
                            margin: '0 7px',
                          }" />
                </p>
                <p>
                  <a-icon type="phone"
                          :style="{
                            fontSize: '28px',
                            color: '#b3b3b3',
                            margin: '0 7px',
                          }" />
                </p>
                <p>
                  <a-icon type="heart"
                          :style="{
                            fontSize: '28px',
                            color: '#b3b3b3',
                            margin: '0 7px',
                          }" />
                </p>
              </div>
            </div>

            <div class="detail__left--description">
              <h4>Thông tin mô tả</h4>

              <div class="description__content">
                <p v-html="modifiedDescription"></p>
              </div>
            </div>
            <div class="detail__left--functional">
              <h4>Đặc điểm bất động sản</h4>
              <div class="functional_flex">
                <div class="functional-item">
                  <b>Diện tích</b>
                  <p>{{ estateDetail.DienTich }} m²</p>
                </div>
                <div class="functional-item">
                  <b>Mức giá</b>
                  <p>{{ estateDetail.MucGia }} {{ estateDetail.DonVi }}</p>
                </div>
                <div class="functional-item">
                  <b>Giấy tờ pháp lý</b>
                  <p>{{ estateDetail.GiayToPhapLy }}</p>
                </div>
                <div class="functional-item" v-if="estateDetail.SoPhongNgu != 0">
                  <b>Số phòng ngủ</b>
                  <p>{{ estateDetail.SoPhongNgu }}</p>
                </div>
                <div class="functional-item" v-if="estateDetail.SoPhongTam != 0">
                  <b>Số phòng tắm</b>
                  <p>{{ estateDetail.SoPhongTam }}</p>
                </div>
                <div class="functional-item" v-if="estateDetail.SoTang != 0">
                  <b>Số tầng</b>
                  <p>{{ estateDetail.SoTang }}</p>
                </div>
                <div class="functional-item" v-if="estateDetail.NoiThat != ''">
                  <b>Nội Thất</b>
                  <p>{{ estateDetail.NoiThat }}</p>
                </div>
                <div class="functional-item" v-if="estateDetail.HuongBanCong != ''">
                  <b>Hướng ban công</b>
                  <p>{{ estateDetail.HuongBanCong }}</p>
                </div>
                <div class="functional-item" v-if="estateDetail.HuongNha != ''">
                  <b>Hướng Nhà</b>
                  <p>{{ estateDetail.HuongNha }}</p>
                </div>
                <div class="functional-item" v-if="estateDetail.DuongVao != ''">
                  <b>Đường vào</b>
                  <p>{{ estateDetail.DuongVao }} m²</p>
                </div>
                <div class="functional-item" v-if="estateDetail.MatTien != ''">
                  <b>Mặt tiền</b>
                  <p>{{ estateDetail.MatTien }} m²</p>
                </div>
              </div>
            </div>
          </div>
        </a-layout-content>
        <a-layout-sider :style="{
          background: 'transparent',
        }">
          <a-card :style="{
            border: '1px solid #f2f2f2',
            borderRadius: '8px',
            marginBottom: '16px',
          }">
            <!-- <a-list item-layout="horizontal" :data-source="filterCateByPrice">
              <a-list-item slot="renderItem" slot-scope="item">
                {{ item.label }}
              </a-list-item>
            </a-list> -->
          </a-card>
        </a-layout-sider>
      </a-layout>
    </a-layout>
  </CommonLayout>

</template>

<script>
import CommonLayout from "@/layout/CommonLayout.vue";
import { RealEstateService } from "@/services/real_estate.service";

export default {
    components: {
        CommonLayout,
    },
    data() {
        return {
            estateDetail: {},
            id: this.$route.params.id,
        };
    },
    computed: {
        modifiedDescription() {
            return this.estateDetail.MoTa.replace(/\.\s/g, "<br>");
        },
    },
    created() {
        this.getEstateDetail(this.id);
    },
    methods: {
        formatCurrencyToVietnamese(value) {
            if (!value) return "";

            const units = [
                { threshold: 1000000000, unit: "tỷ" },
                { threshold: 1000000, unit: "triệu" },
                { threshold: 1000, unit: "nghìn" },
            ];

            for (let i = 0; i < units.length; i++) {
                if (value >= units[i].threshold) {
                    return (value / units[i].threshold).toFixed(3) + " " + units[i].unit;
                }
            }

            return value.toString();
        },
        async getEstateDetail(id) {
            try {
                const response = await RealEstateService.getPostById(id);
                this.estateDetail = response[0];
                console.log(this.estateDetail);
            } catch (error) {
                console.log(error);
            }
        },
    },
};
</script>

<style scoped>
.imageBox {
    position: relative;
    width: 100%;
    max-width: 700px;
    height: auto;
    z-index: 1;
    display: flex;
    transition-property: transform;
    box-sizing: content-box;
    background: #f2f2f2;
}

.ant-carousel>>>.slick-dots {
    height: auto;
}

.ant-carousel>>>.slick-slider {
    display: flex;
    align-items: center;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 59%, rgba(0, 0, 0, 0.65) 100%);
}

.ant-carousel>>>.slick-slide img {
    display: block;
    margin: auto;
    height: 500px;
    max-width: 100%;
    object-fit: cover;
}

.ant-carousel>>>.slick-thumb {
    bottom: -88px;
}

.ant-carousel>>>.slick-thumb li {
    width: 107px;
    height: 80px;
}

.ant-carousel>>>.slick-thumb li img {
    width: 100%;
    height: 100%;
    filter: grayscale(100%);
}

.ant-carousel>>>.slick-thumb li.slick-active img {
    filter: grayscale(0%);
}

.ant-carousel>>>.custom-slick-arrow {
    width: 25px;
    height: 25px;
    font-size: 25px;
    color: #fff;
    background-color: rgba(0, 0, 0, 0.11);
    opacity: 0.3;
}

.ant-carousel>>>.custom-slick-arrow:before {
    display: none;
}

.ant-carousel>>>.custom-slick-arrow:hover {
    opacity: 0.5;
}

.ant-carousel>>>.slick-slide h3 {
    color: #000000;
}

.detail__left--content {
    margin-top: 100px;
    text-align: start;
}

.detail__left--title {
    margin-top: 5px;
}

.detail__left--title p {
    font-size: 15px;
    color: #848484;
}

.detail__left--title p span {
    font-size: 15px;
    color: #000000;
}

.detail__left--title h3 {
    font-family: "Lexend Medium", Roboto, Arial !important;
    font-size: 24px;
    line-height: 32px;
    font-weight: normal !important;
    letter-spacing: -0.2px;
    color: #2c2c2c;
    display: block;
}

.detail__left--specifications {
    display: flex;
    margin: 20px 0;
    border-top: 1px solid #f2f2f2;
    border-bottom: 1px solid #f2f2f2;
    padding: 15px 0px;
    box-sizing: border-box;
    justify-content: space-between;
    align-items: center;
}

.left__specifications--item {
    margin-right: 50px;
}

.left__specifications--item p {
    font-size: 15px;
    font-weight: 500;
    color: #b3b3b3;
}

h4 {
    font-size: 16px;
    font-weight: 700;
}

.left__specifications--item span {
    font-size: 10px;
    color: #b3b3b3;
}

.left__specifications--icon {
    display: flex;
}

.left__specifications--icon p {
    margin: 0 7px;
}

.detail__left--description h4,
.detail__left--functional h4 {
    font-family: "Lexend Medium", Roboto, Arial !important;
    font-size: 18px;
    line-height: 28px;
    font-weight: bold;
    letter-spacing: -0.2px;
    color: #2c2c2c;
    display: block;
    margin-bottom: 10px;
}

.description__content {
    font-family: "Roboto Regular", Roboto, Arial !important;
    font-size: 16px;
    line-height: 30px;
    font-weight: normal !important;
}

.description__content span {
    font-weight: 700;
    font-size: 14px;
    padding: 7px;
    background: #ccc;
    border-radius: 5px;
    margin-right: 5px;
}

.description__content span::after {
    content: "Hiện số";
    color: white;
    font-size: 13px;
    font-weight: 700;
    border: 1px solid #000000;
    padding: 5px;
    margin-left: 7px;
    background: #2c2c2c;
    margin-top: 10px;
    border-radius: 5px;
    cursor: pointer;
}
</style>