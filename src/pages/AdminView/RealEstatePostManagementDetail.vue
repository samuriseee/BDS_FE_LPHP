<template>
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
        margin: '20px 0',
      }"
    >
      <a-layout-content>
        <div
          :style="{
            display: 'flex',
          }"
        >
          <SliderLightBox
            :images="estateDetail.bat_dong_san.HinhAnh"
            :style="{
              width: '80%',
            }"
          />
          <el-card
            shadow="never"
            :style="{
              textAlign: 'start',
              width: '20%',
            }"
          >
              <p>
                <span class="label">Được đăng bài ngày: </span>
                {{
                  moment(estateDetail.bat_dong_san.created_at || "").format(
                    "DD/MM/YYYY, h:mm"
                  )
                }}
              </p>
            <p>
              <span class="label">Người đăng bài:  </span>
              {{ estateDetail.nguoi_dung.ho_ten }}
            </p>
            <p>
              <span class="label">Email:  </span>
              {{ estateDetail.nguoi_dung.email }}
            </p>
            <p>
              <span class="label">Số điện thoại:  </span>
              {{ estateDetail.nguoi_dung.so_dien_thoai }}
            </p>
            <div
              v-if="
                estateDetail.bat_dong_san.TrangThai ===
                RealEstatePostStatus.CHUA_DUYET
              "
            >
              <el-button
                @click="changeEstateStatus(RealEstatePostStatus.DA_DUYET)"
                type="success"
                >Duyệt bài</el-button
              >
              <el-button
                @click="changeEstateStatus(RealEstatePostStatus.KHONG_DUYET)"
                type="info"
                >Không xác nhận bài</el-button
              >
            </div>
            <div
              v-else-if="
                estateDetail.bat_dong_san.TrangThai ===
                RealEstatePostStatus.DA_DUYET
              "
            >
              <el-button
                @click="changeEstateStatus(RealEstatePostStatus.VI_PHAM)"
                type="danger"
                >Đánh dấu vi phạm</el-button
              >
            </div>
          </el-card>
        </div>
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
                    formatCurrencyToVietnamese(estateDetail.bat_dong_san.MucGia)
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
                <b>Diện tích</b>
                <p>{{ estateDetail.bat_dong_san.DienTich }} m²</p>
              </div>
              <div class="functional-item">
                <b>Mức giá</b>
                <p>
                  {{
                    formatCurrencyToVietnamese(estateDetail.bat_dong_san.MucGia)
                  }}
                  {{ estateDetail.bat_dong_san.DonVi }}
                </p>
              </div>
              <div class="functional-item">
                <b>Giấy tờ pháp lý</b>
                <p>{{ estateDetail.bat_dong_san.GiayToPhapLy }}</p>
              </div>
              <div
                class="functional-item"
                v-if="estateDetail.bat_dong_san.SoPhongNgu"
              >
                <b>Số phòng ngủ</b>
                <p>{{ estateDetail.bat_dong_san.SoPhongNgu }}</p>
              </div>
              <div
                class="functional-item"
                v-if="estateDetail.bat_dong_san.SoPhongTam"
              >
                <b>Số phòng tắm</b>
                <p>{{ estateDetail.bat_dong_san.SoPhongTam }}</p>
              </div>
              <div
                class="functional-item"
                v-if="estateDetail.bat_dong_san.SoTang"
              >
                <b>Số tầng</b>
                <p>{{ estateDetail.bat_dong_san.SoTang }}</p>
              </div>
              <div
                class="functional-item"
                v-if="estateDetail.bat_dong_san.NoiThat"
              >
                <b>Nội Thất</b>
                <p>{{ estateDetail.bat_dong_san.NoiThat }}</p>
              </div>
              <div
                class="functional-item"
                v-if="estateDetail.bat_dong_san.HuongBanCong"
              >
                <b>Hướng ban công</b>
                <p>{{ estateDetail.bat_dong_san.HuongBanCong }}</p>
              </div>
              <div
                class="functional-item"
                v-if="estateDetail.bat_dong_san.HuongNha"
              >
                <b>Hướng Nhà</b>
                <p>{{ estateDetail.bat_dong_san.HuongNha }}</p>
              </div>
              <div
                class="functional-item"
                v-if="estateDetail.bat_dong_san.DuongVao"
              >
                <b>Đường vào</b>
                <p>{{ estateDetail.bat_dong_san.DuongVao }} m²</p>
              </div>
              <div
                class="functional-item"
                v-if="estateDetail.bat_dong_san.MatTien"
              >
                <b>Mặt tiền</b>
                <p>{{ estateDetail.bat_dong_san.MatTien }} m²</p>
              </div>
            </div>
          </div>
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
import AdminLayout from "@/layout/AdminLayout.vue";
import { RealEstateService } from "@/services/real_estate.service";
import { formatCurrencyToVietnamese } from "@/services/util";
import { RealEstatePostStatus } from "@/constants";
import moment from "moment";
import SliderLightBox from "@/components/SliderLightBox.vue";
export default {
  name: "AdminRealEstatePostManagementDetail",
  components: {
    AdminLayout,
    SliderLightBox,
  },
  data() {
    return {
      estateDetail: {},
      id: this.$route.params.id,
      RealEstatePostStatus,
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
    moment,
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
    async changeEstateStatus(status) {
      try {
        const updateEstatePayload = {
          ...this.estateDetail.bat_dong_san,
          HinhAnh: JSON.stringify(this.estateDetail.bat_dong_san.HinhAnh),
          TrangThai: status,
        };
        await RealEstateService.updateRealEstatePost(
          this.id,
          updateEstatePayload
        );
        this.$message.success("Cập nhật bài đăng thành công");
        this.getEstateDetail(this.id);
      } catch (error) {
        console.log(error);
        this.$message.error("Cập nhật bài đăng thất bại");
      }
    },
  },
};
</script>

<style scoped>
.label {
  font-weight: bold;
}

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
  gap: 20px;
}
.functional-item {
  min-width: 333px;
  display: flex;
  flex-direction: row;
  gap: 10px;
  font-size: 17px;
}
</style>
