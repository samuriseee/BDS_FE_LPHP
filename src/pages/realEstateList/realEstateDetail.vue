<template>
  <CommonLayout>
    <a-layout
      :style="{
        width: '90%',
        margin: '0 auto',
        background: 'transparent',
      }"
    >
      <a-layout
        :style="{
          background: 'transparent',
          padding: '30px 20px'
        }"
      >
        <a-layout-content>
          <a-carousel
            class="imageBox"
            arrows
            dots-class="slick-dots slick-thumb"
          >
            <div
              slot="prevArrow"
              class="custom-slick-arrow"
              style="left: 10px; zindex: 1"
            >
              <a-icon type="left-circle" />
            </div>
            <div
              slot="nextArrow"
              class="custom-slick-arrow"
              style="right: 10px"
            >
              <a-icon type="right-circle" />
            </div>
            <a slot="customPaging" slot-scope="props">
              <img :src="getImgUrl(props.i)" />
            </a>
            <div v-for="url in estateDetail.bat_dong_san.HinhAnh" :key="url">
              <div>
                <img :src="url" style="cursor: pointer" />
              </div>
            </div>
          </a-carousel>
          <div class="detail__left--content">
            <div class="detail__left--title">
              <p class="breadcrumb">
                {{
                  (estateDetail.bat_dong_san.BanHayChoThue = 1 ? "Bán" : "Thuê")
                }}
                / {{ estateDetail.bat_dong_san.ThanhPho }} /
                {{ estateDetail.bat_dong_san.Quan }} /
                {{ estateDetail.bat_dong_san.Phuong }}
              </p>
              <h3>
                {{ estateDetail.bat_dong_san.TieuDe }}
              </h3>
              <p>{{ estateDetail.bat_dong_san.Duong }}</p>
              <p>
                {{ estateDetail.bat_dong_san.DiaChiCuThe }}
              </p>
            </div>

            <div class="detail__left--specifications">
              <div style="display: flex">
                <div class="left__specifications--item">
                  <p>Mức giá</p>
                  <h4>
                    {{ estateDetail.bat_dong_san.MucGia ?
                      formatCurrencyToVietnamese(
                        estateDetail.bat_dong_san.MucGia
                      ) : 'Thoả thuận'
                    }}
                    {{ estateDetail.bat_dong_san.DonVi }}
                  </h4>
                </div>

                <div class="left__specifications--item">
                  <p>Diện tích</p>
                  <h4>{{ estateDetail.bat_dong_san.DienTich }} m²</h4>
                </div>

                <div class="left__specifications--item">
                  <p>Phòng ngủ</p>
                  <h4>{{ estateDetail.bat_dong_san.SoPhongNgu }} PN</h4>
                </div>
              </div>

              <div class="left__specifications--icon">
                <p>
                  <a-icon
                    type="share-alt"
                    :style="{
                      fontSize: '28px',
                      color: '#b3b3b3',
                      margin: '0 7px',
                    }"
                  />
                </p>
                <p>
                  <a-icon
                    type="phone"
                    :style="{
                      fontSize: '28px',
                      color: '#b3b3b3',
                      margin: '0 7px',
                    }"
                  />
                </p>
                <p>
                  <a-icon
                    type="heart"
                    :style="{
                      fontSize: '28px',
                      color: '#b3b3b3',
                      margin: '0 7px',
                    }"
                  />
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
                  <div>
                    <img src="@/assets/Icon/functional/dien_tich.png" />
                    <b>Diện tích</b>
                  </div>
                  <p>{{ estateDetail.bat_dong_san.DienTich }} m²</p>
                </div>
                <div class="functional-item">
                  <div>
                    <img src="@/assets/Icon/functional/muc_gia.png" />
                    <b>Mức giá</b>
                  </div>
                  <p>
                    {{ formatCurrencyToVietnamese(estateDetail.bat_dong_san.MucGia) }}
                    {{ estateDetail.bat_dong_san.DonVi }}
                  </p>
                </div>
                <div class="functional-item">
                  <div>
                    <img src="@/assets/Icon/functional/phap_ly.png" />
                    <b>Giấy tờ pháp lý</b>
                  </div>
                  <p>{{ estateDetail.bat_dong_san.GiayToPhapLy }}</p>
                </div>
                <div
                  class="functional-item"
                  v-if="estateDetail.bat_dong_san.SoPhongNgu"
                >
                  <div>
                    <img src="@/assets/Icon/functional/phong_ngu.png" />
                    <b>Số phòng ngủ</b>
                  </div>
                  <p>{{ estateDetail.bat_dong_san.SoPhongNgu }}</p>
                </div>
                <div
                  class="functional-item"
                  v-if="estateDetail.bat_dong_san.SoPhongTam"
                >
                  <div>
                    <img src="@/assets/Icon/functional/toilet.png" />
                    <b>Số phòng tắm</b>

                  </div>
                  <p>{{ estateDetail.bat_dong_san.SoPhongTam }}</p>
                </div>
                <div
                  class="functional-item"
                  v-if="estateDetail.bat_dong_san.SoTang"
                >
                  <div>
                    <img src="@/assets/Icon/functional/noi_that.png" />
                    <b>Số tầng</b>

                  </div>
                  <p>{{ estateDetail.bat_dong_san.SoTang }}</p>
                </div>
                <div
                  class="functional-item"
                  v-if="estateDetail.bat_dong_san.NoiThat"
                >
                  <div>
                    <img src="@/assets/Icon/functional/noi_that.png" />
                    <b>Nội Thất</b>

                  </div>
                  <p>{{ estateDetail.bat_dong_san.NoiThat }}</p>
                </div>
                <div
                  class="functional-item"
                  v-if="estateDetail.bat_dong_san.HuongBanCong"
                >
                  <div>

                    <img src="@/assets/Icon/functional/ban_cong.png" />
                    <b>Hướng ban công</b>
                  </div>
                  <p>{{ estateDetail.bat_dong_san.HuongBanCong }}</p>
                </div>
                <div
                  class="functional-item"
                  v-if="estateDetail.bat_dong_san.HuongNha"
                >
                  <div>
                    <img src="@/assets/Icon/functional/huong_nha.png" />
                    <b>Hướng Nhà</b>

                  </div>
                  <p>{{ estateDetail.bat_dong_san.HuongNha }}</p>
                </div>
                <div
                  class="functional-item"
                  v-if="estateDetail.bat_dong_san.DuongVao"
                >
                  <div>
                    <img src="@/assets/Icon/functional/dien_tich.png" />
                    <b>Đường vào</b>

                  </div>
                  <p>{{ estateDetail.bat_dong_san.DuongVao }} m²</p>
                </div>
                <div
                  class="functional-item"
                  v-if="estateDetail.bat_dong_san.MatTien"
                >
                  <div>
                    <img src="@/assets/Icon/functional/dien_tich.png" />
                    <b>Mặt tiền</b>

                  </div>
                  <p>{{ estateDetail.bat_dong_san.MatTien }} m²</p>
                </div>
              </div>
            </div>

            <div class="detail__left--chartjs">
              <h1 :style="{
                fontSize: '24px',
                lineHeight: '32px',
                fontWeight: '500',
                letterSpacing: '-0.2px',
                color: '#2C2C2C',
                display: 'block',
                textAlign: 'left',
                marginBottom: '10px',
              }">Biểu đồ so sánh giá các bất động sản cùng loại trong khu vực</h1>
              <LineChartGenerator
                :chart-options="chartOptions"
                :chart-data="chartData"
                :chart-id="chartId"
                :dataset-id-key="datasetIdKey"
                :plugins="plugins"
                :css-classes="cssClasses"
                :styles="styles"
                :width="width"
                :height="height"
              />
            </div>

            <div class="detail__left--chartjs">
              <h1 :style="{
                fontSize: '24px',
                lineHeight: '32px',
                fontWeight: '500',
                letterSpacing: '-0.2px',
                color: '#2C2C2C',
                display: 'block',
                textAlign: 'left',
                marginBottom: '10px',
              }">Biểu đồ dự đoán giá tương lai</h1>
              <LineChartGenerator
                :chart-options="chartOptions"
                :chart-data="chartData2"
                :chart-id="chartId"
                :dataset-id-key="datasetIdKey"
                :plugins="plugins"
                :css-classes="cssClasses"
                :styles="styles"
                :width="width"
                :height="height"
              />
            </div>
          </div>
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
            class="re_card-author"
          >
            <div :style="{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '10px',
            }">
              <a-avatar

                :size="60"
                :style="{
                  backgroundColor: '#ffeceb',
                  color: '#74150f',
                  verticalAlign: 'middle',
                }"
              >
                {{ estateDetail.nguoi_dung.ho_ten.slice(0, 1) }}
              </a-avatar>
              <h3 :style="{
                fontSize: '18px',
              }"> {{ estateDetail.nguoi_dung.ho_ten }} </h3>
            </div>
            <div class="button-section">
              <el-button :style="{
                background: '#009ba1',
                color: 'white',
              }"> <font-awesome-icon icon="phone" /> {{ estateDetail.nguoi_dung.so_dien_thoai }} </el-button>
              <el-button> Nhắn tin qua zalo </el-button>
              <el-button> Gửi Email </el-button>
              <el-button> Yêu cầu liên hệ lại </el-button>
            </div>

          </a-card>
        </a-layout-sider>
      </a-layout>
    </a-layout>
  </CommonLayout>
</template>

<script>
import { Line as LineChartGenerator } from 'vue-chartjs/legacy'
import CommonLayout from "@/layout/CommonLayout.vue";
import { RealEstateService } from "@/services/real_estate.service";
import { formatCurrencyToVietnamese } from "@/services/util";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement
} from 'chart.js'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement
)

export default {
  name: "RealEstateDetail",
  components: {
    CommonLayout,
    LineChartGenerator
  },
  data() {
    return {
      estateDetail: {},
      id: this.$route.params.id,
      selectedImagePreview: "",
      chartId: 'line-chart',
      datasetIdKey: 'label',
      cssClasses: '',
      styles: {},
      plugins: [],
      height: '400',
      width: '400',
      chartData: {
        labels: [
          'Q3/23',
          'Q4/23',
          'Q1/24',
          'Q2/24'
        ],
        datasets: [
          {
            label: 'Giá cao nhất',
            backgroundColor: '#C2C2C2',
            data: [40, 41, 42, 43]
          },
          {
            label: 'Giá phổ biến nhất',
            backgroundColor: '#f87979',
            data: [30, 31, 32, 34]
          },
          {
            label: 'Giá thấp nhất',
            backgroundColor: '#009BA1',
            data: [25, 25, 25, 26]
          },
          {
            label: 'Giá tin đang xem',
            backgroundColor: 'red',
            data: [34]
          }
        ]
      },
      chartData2: {
        labels: [
          'Q1/24',
          'Q2/24',
          'Q3/24',
          'Q4/24'
        ],
        datasets: [
          {
            label: 'Giá cao nhất',
            backgroundColor: '#C2C2C2',
            data: [41, 45, 50, 48]
          },
          {
            label: 'Giá phổ biến nhất',
            backgroundColor: '#f87979',
            data: [40, 39, 32, 40]
          },
          {
            label: 'Giá thấp nhất',
            backgroundColor: '#009BA1',
            data: [30, 35, 38, 39]
          },
          {
            label: 'Giá tin đang xem',
            backgroundColor: 'red',
            data: [34]
          }
        ]
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false
      }
    };
  },
  computed: {
    modifiedDescription() {
      return this.estateDetail.bat_dong_san.MoTa.replace(/\.\s/g, "<br>");
    },
  },
  created() {
    this.getEstateDetail(this.id);
  },
  methods: {
    formatCurrencyToVietnamese,
    async getEstateDetail(id) {
      try {
        const response = await RealEstateService.getPostById(id);
        this.estateDetail = {
          ...response,
          bat_dong_san: {
            ...response.bat_dong_san,
            HinhAnh: JSON.parse(response.bat_dong_san.HinhAnh),
          },
        };
      } catch (error) {
        console.log(error);
      }
    },
    getImgUrl(index) {
      return this.estateDetail.bat_dong_san.HinhAnh[index];
    },
    previewImage(url) {
      this.selectedImagePreview = url;
    },
  },
};
</script>

<style scoped>
.imageBox {
  margin: 0 auto;
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

.ant-carousel >>> .slick-dots {
  height: auto;
}

.ant-carousel >>> .slick-slider {
  display: flex;
  align-items: center;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0) 59%,
    rgba(0, 0, 0, 0.65) 100%
  );
}

.ant-carousel >>> .slick-slide img {
  display: block;
  margin: auto;
  height: 500px;
  max-width: 100%;
  object-fit: cover;
}

.ant-carousel >>> .slick-thumb {
  bottom: -35%;
}

.ant-carousel >>> .slick-thumb li {
  width: 107px;
  height: 80px;
}

.ant-carousel >>> .slick-thumb li img {
  width: 100%;
  height: 100%;
  filter: grayscale(100%);
}

.ant-carousel >>> .slick-thumb li.slick-active img {
  filter: grayscale(0%);
}

.ant-carousel >>> .custom-slick-arrow {
  width: 25px;
  height: 25px;
  font-size: 25px;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.11);
  opacity: 0.3;
}

.ant-carousel >>> .custom-slick-arrow:before {
  display: none;
}

.ant-carousel >>> .custom-slick-arrow:hover {
  opacity: 0.5;
}

.ant-carousel >>> .slick-slide h3 {
  color: #000000;
}

.detail__left--content {
  margin-top: 30%;
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
.functional_flex {
    display: flex;
    flex-wrap: wrap;
    gap: 25px 50px;
}
.functional-item {
    min-width: 333px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    border-bottom: 1px solid #f2f2f2;
    padding: 5px 0;
}
.functional-item img {
    width: 25px;
    height: 25px;
    object-fit: cover;
    margin-right: 20px;
}
.functional-item p {
  width: fit-content;
  min-width: 100px;
  text-align: right;
  margin: 0;
}
.re_card-author {
  width: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
}
.re_card-author .button-section {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 0;
}
.re_card-author .button-section button {
  min-width: 200px;
  margin: 0;
  font-style: normal;
  color: #020000;
  outline: none;
  display: inline-block;
  text-align: center;
  cursor: pointer;
  box-shadow: none !important;
  letter-spacing: -0.2px;
  border-radius: 4px;
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: space-evenly;
}
.detail__left--chartjs {
  margin: 40px auto;
}
</style>
