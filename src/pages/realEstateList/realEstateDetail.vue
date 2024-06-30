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
          padding: '30px 20px',
        }"
      >
        <a-layout-content>
          <SliderLightBox :images="estateDetail.bat_dong_san.HinhAnh" />
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
                    {{
                      estateDetail.bat_dong_san.MucGia
                        ? formatCurrencyToVietnamese(
                            estateDetail.bat_dong_san.MucGia
                          )
                        : "Thoả thuận"
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
                    {{
                      formatCurrencyToVietnamese(
                        estateDetail.bat_dong_san.MucGia
                      )
                    }}
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
                 Dự đoán giá bất động sản trong tương lai
              </h1>
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
                borderWidth="13"

              />
            </div>

            <!-- <div class="detail__left--chartjs">
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
                Dự đoán giá bất động sản trong tương lai
              </h1>
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
            </div> -->
          </div>
        </a-layout-content>
        <a-layout-sider
          :style="{
            background: 'transparent',
            padding: '0 20px',
          }"
        >
          <a-card
            :style="{
              border: '1px solid #f2f2f2',
              borderRadius: '8px',
              marginBottom: '16px',
              cursor: 'pointer',
            }"
            class="re_card-author"
            @click="viewProfile(estateDetail.nguoi_dung.id)"
          >
            <div
              :style="{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '10px',
              }"
            >
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
              <h3
                :style="{
                  fontSize: '18px',
                }"
              >
                {{ estateDetail.nguoi_dung.ho_ten }}
              </h3>
              <p
                :style="{
                  fontSize: '14px',
                  color: '#b3b3b3',
                  marginTop: '-10px'
                }"
              >
               xem thêm {{ estateDetail.nguoi_dung.ho_ten }} bất động sản
               </p>
            </div>
            <div class="button-section">
              <el-button
                :style="{
                  background: '#009ba1',
                  color: 'white',
                }"
              >
                <font-awesome-icon icon="phone" />
                {{ estateDetail.nguoi_dung.so_dien_thoai }}
              </el-button>
              <el-button> Nhắn tin qua zalo </el-button>
              <el-button> Gửi Email </el-button>
              <el-button> Yêu cầu liên hệ lại </el-button>
            </div>
          </a-card>
          <a-card
            :style="{
              border: '1px solid #f2f2f2',
              borderRadius: '8px',
              marginBottom: '16px',
              width: '250px'
            }"
            class="re_card-author"
          >
            <div :style="{
              display: 'flex',
              flexDirection: 'row',
              gap: '20px',
              textAlign: 'justify',
            }">
              <i class="el-icon-bell"
                 :style="{
                fontSize: '30px',
                color: 'red',
                marginTop: '10px'
              }"></i>
              <p>Không nên đặt cọc, giao dịch trước khi xem nhà và xác minh thông tin của người cho thuê. </p>
            </div>
          </a-card>
        </a-layout-sider>
      </a-layout>
    </a-layout>
  </CommonLayout>
</template>

<script>
import SliderLightBox from "@/components/SliderLightBox.vue";
import { Line as LineChartGenerator } from "vue-chartjs/legacy";
import CommonLayout from "@/layout/CommonLayout.vue";
import { RealEstateService } from "@/services/real_estate.service";
import { formatCurrencyToVietnamese, formatDate } from "@/services/util";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement
);

export default {
  name: "RealEstateDetail",
  components: {
    CommonLayout,
    LineChartGenerator,
    SliderLightBox,
    // Swiper,
    // SwiperSlide,
  },
  data() {
    return {
      estateDetail: {},
      id: this.$route.params.id,
      selectedImagePreview: "",
      chartId: "line-chart",
      datasetIdKey: "label",
      cssClasses: "",
      styles: {},
      plugins: [],
      height: "400",
      width: "400",
      chartData: {
        labels: ["Q3/24", "Q4/24", "Q1/25", "Q2/25"],
        datasets: [],
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
      },
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
    viewProfile(id) {
      this.$router.push(`/profile/${id}`);
    },
    async getChartData(params) {
      try {
        const response = await RealEstateService.getPredictedPrice({
          ...params
        })
        if (response) {
          this.chartData = {
            labels: ["Q3/24", "Q4/24", "Q1/25", "Q2/25"],
            datasets: [
              {
                label: "Giá dự đoán",
                backgroundColor: "#C2C2C2",
                data: response,
                borderColor: 'rgb(75, 192, 192)',
                borderWidth: 4,
              },
              {
                label: "Giá tin đang xem",
                backgroundColor: "red",
                data: [this.estateDetail.bat_dong_san.MucGia],
                borderWidth: 15,
                pointRadius: 15,
                pointBackgroundColor: 'red'
              },
            ],
          };
        }
      } catch (error) {
        console.log(error);
      }
    },
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
         
        this.getChartData({
          MucGia: this.estateDetail.bat_dong_san.MucGia,
          LoaiBDS: this.estateDetail.bat_dong_san.LoaiBDS,
          DienTich: this.estateDetail.bat_dong_san.DienTich,
          Lat: this.estateDetail.bat_dong_san.Lat,
          Long: this.estateDetail.bat_dong_san.Long,
          NgayDang: formatDate(this.estateDetail.bat_dong_san.created_at),
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
.detail__left--content {
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
