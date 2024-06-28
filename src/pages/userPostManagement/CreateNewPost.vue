<template>
  <div class="container">
    <a-spin :spinning="loading">
      <div class="create-post">
        <div class="basic info">
          <h3>Thông tin cơ bản</h3>
          <div class="switchBox">
            <div
              :class="{ active: isBuy }"
              class="changeType"
              @click="ChangeType"
            >
              Bán
            </div>
            <div
              :class="{ active: isRent }"
              class="changeType"
              @click="ChangeType"
            >
              Cho thuê
            </div>
          </div>

          <div class="form-group">
            <label for="title">Loại bất động sản</label>
            <el-select
              id="title"
              required
              v-model="newEstatePost.LoaiBDS"
              placeholder="Chọn loại bất động sản"
            >
              <el-option
                v-for="type in AllRealEstateType"
                :key="type.ID"
                :value="type.LoaiBDS"
                :label="type.LoaiBDS"
              >
              </el-option>
            </el-select>
            <div class="errorText" v-if="$v.newEstatePost.LoaiBDS.$error">
              Cần chọn loại bất động sản
            </div>
          </div>

          <location-select @locationUpdate="locationUpdate" />
          <div class="form-group">
            <label for="title">Địa chỉ hiện thị trên tin đăng</label>
            <el-input
              required
              type="text"
              id="title"
              v-model="newEstatePost.DiaChi"
              placeholder="Bạn có thể bổ sung vách hẻm, ngõ,..."
            />
            <div class="errorText" v-if="$v.newEstatePost.DiaChi.$error">
              Cần nhập địa chỉ chính xác
            </div>
          </div>
        </div>
        <div class="post info">
          <h3>Thông tin bài viết</h3>
          <div class="form-group">
            <label for="title">Tiêu đề</label>
            <el-input
              label="Tiêu đề"
              required
              type="text"
              placeholder="Nhập tiêu đề bài viết"
              v-model="newEstatePost.TieuDe"
              maxlength="99"
              minLength="30"
              show-word-limit
            >
            </el-input>
            <span class="note">Tối thiểu 30 ký tự, tối đa 99 ký tự</span>
            <div class="errorText" v-if="$v.newEstatePost.TieuDe.$error">
              Tiêu đề cần ít nhất 30 ký tự và tối đa 99 ký tự
            </div>
          </div>
          <div class="form-group">
            <label for="title">Mô tả</label>
            <el-input
              label="Mô tả"
              :autosize="{ minRows: 5, maxRows: 10 }"
              required
              type="textarea"
              placeholder="Nhập mô tả bài viết"
              v-model="newEstatePost.MoTa"
              maxlength="999"
              minLength="30"
              show-word-limit
            >
            </el-input>
            <span class="note">Tối thiểu 30 ký tự, tối đa 999 ký tự</span>
            <div class="errorText" v-if="$v.newEstatePost.MoTa.$error">
              Mô tả cần ít nhất 30 ký tự và tối đa 999 ký tự
            </div>
          </div>
        </div>
        <div class="realEstate info">
          <h3>Thông tin bất động sản</h3>
          <div class="form-group">
            <label for="title">Diện tích</label>
            <a-input
              required
              class="form-control"
              type="text"
              id="title"
              v-model="newEstatePost.DienTich"
              placeholder="Nhập diện tích bất động sản"
              suffix="m2"
            />
            <div class="errorText" v-if="$v.newEstatePost.DienTich.$error">
              Cần nhập diện tích bất động sản
            </div>
          </div>
          <div class="price">
            <div class="form-group">
              <label for="title">Giá</label>
              <a-input-number
                required
                class="form-control"
                id="title"
                :style="{
                  padding: '0 10px',
                }"
                :formatter="
                  (value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                "
                v-model="newEstatePost.MucGia"
                placeholder="Nhập giá bất động sản"
              />
              <p v-if="this.newEstatePost.MucGia">
                Tổng giá trị
                <span :style="{ fontWeight: 'bold' }">{{
                  formattedPrice
                }}</span>
              </p>
              <div class="errorText" v-if="$v.newEstatePost.MucGia.$error">
                Cần nhập giá bất động sản
              </div>
            </div>
            <div class="form-group">
              <label for="title">Đơn vị</label>
              <a-select
                class="form-control"
                id="title"
                v-model="newEstatePost.DonVi"
                placeholder="Chọn đơn vị"
                default-value="VND"
              >
                <a-select-option value="VND">VND</a-select-option>
                <a-select-option value="Giá/m2">Giá/m2</a-select-option>
                <a-select-option value="Thoả thuận">Thoả thuận</a-select-option>
              </a-select>
            </div>
          </div>
          <div
            class="form-group"
            v-if="fieldsToRender.includes('GiayToPhapLy')"
          >
            <label for="">Giấy tờ pháp lý</label>
            <div style="display: flex">
              <div v-for="(item, index) in legalPapers" :key="index">
                <SelectTag
                  :value="item"
                  :active="newEstatePost.GiayToPhapLy === item"
                  @click.native="newEstatePost.GiayToPhapLy = item"
                />
              </div>
            </div>
          </div>
          <div class="form-group" v-if="fieldsToRender.includes('NoiThat')">
            <label for="">Nội thất</label>
            <div style="display: flex">
              <div v-for="(item, index) in furniture" :key="index">
                <SelectTag
                  :value="item"
                  :active="newEstatePost.NoiThat === item"
                  @click.native="newEstatePost.NoiThat = item"
                />
              </div>
            </div>
          </div>
          <div
            class="form-group counter"
            v-if="fieldsToRender.includes('SoPhongNgu')"
          >
            <label for="">Số phòng ngủ</label>
            <div class="counter-box">
              <button
                @click="newEstatePost.SoPhongNgu--"
                :disabled="newEstatePost.SoPhongNgu <= 0"
              >
                -
              </button>
              <a-input class="count" v-model="newEstatePost.SoPhongNgu" />
              <button @click="newEstatePost.SoPhongNgu++">+</button>
            </div>
          </div>
          <div
            class="form-group counter"
            v-if="fieldsToRender.includes('SoTang')"
          >
            <label for="">Số tầng</label>
            <div class="counter-box">
              <button
                @click="newEstatePost.SoTang--"
                :disabled="newEstatePost.SoTang <= 0"
              >
                -
              </button>
              <a-input class="count" v-model="newEstatePost.SoTang" />
              <button @click="newEstatePost.SoTang++">+</button>
            </div>
          </div>
          <div
            class="form-group counter"
            v-if="fieldsToRender.includes('SoPhongTam')"
          >
            <label for="">Số phòng tắm</label>
            <div class="counter-box">
              <button
                @click="newEstatePost.SoPhongTam--"
                :disabled="newEstatePost.SoPhongTam <= 0"
              >
                -
              </button>
              <a-input class="count" v-model="newEstatePost.SoPhongTam" />
              <button @click="newEstatePost.SoPhongTam++">+</button>
            </div>
          </div>
          <div
            :style="{
              display: 'flex',
            }"
          >
            <div
              :style="{
                width: '50%',
              }"
            >
              <div
                class="form-group"
                v-if="fieldsToRender.includes('HuongNha')"
              >
                <label for="title">Hướng nhà</label>
                <a-select
                  id="title"
                  v-model="newEstatePost.HuongNha"
                  placeholder="Chọn hướng"
                >
                  <a-select-option v-for="direc in directions" :key="direc">
                    {{ direc }}
                  </a-select-option>
                </a-select>
              </div>
              <div
                class="form-group"
                v-if="fieldsToRender.includes('HuongBanCong')"
              >
                <label for="title">Hướng ban công</label>
                <a-select
                  id="title"
                  v-model="newEstatePost.HuongBanCong"
                  placeholder="Chọn hướng"
                >
                  <a-select-option v-for="direc in directions" :key="direc">
                    {{ direc }}
                  </a-select-option>
                </a-select>
              </div>
            </div>
            <div
              :style="{
                width: '50%',
              }"
            >
              <div
                class="form-group"
                v-if="fieldsToRender.includes('DuongVao')"
              >
                <label for="title">Đường vào</label>
                <a-input
                  class="form-control"
                  type="text"
                  id="title"
                  v-model="newEstatePost.DuongVao"
                  placeholder="Nhập theo mét"
                  suffix="m"
                />
              </div>
              <div class="form-group" v-if="fieldsToRender.includes('MatTien')">
                <label for="title">Mặt tiền</label>
                <a-input
                  class="form-control"
                  type="text"
                  id="title"
                  v-model="newEstatePost.MatTien"
                  placeholder="Nhập theo mét"
                  suffix="m"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="imageSection info">
          <h3>Hình ảnh & Video</h3>
          <div>
            <ul>
              <li>Đăng tối thiểu 4 ảnh thường với tin VIP</li>
              <li>Đăng tối đa 24 ảnh với tất cả các loại tin</li>
              <li>Hãy dùng ảnh thật, không trùng, không chèn SĐT</li>
              <li>Mỗi ảnh kích thước tối thiểu 100x100 px, tối đa 15 MB</li>
              <li>Mô tả ảnh tối đa 45 kí tự.</li>
            </ul>
          </div>
          <div id="uploadImage">
            <CloudinaryUpload @image-uploaded="handleImageUploaded" />
          </div>
        </div>
        <div class="contact info">
          <h3>Thông tin liên hệ</h3>
          <div class="form-group">
            <label for="title">Họ và tên</label>
            <a-input
              required
              type="text"
              id="title"
              v-model="currentUser.ho_ten"
              disabled
              placeholder="Nhập họ và tên"
            />
          </div>
          <div class="form-group">
            <label for="title">Số điện thoại</label>
            <a-input
              required
              type="text"
              id="title"
              v-model="currentUser.so_dien_thoai"
              disabled
              placeholder="Nhập số điện thoại"
            />
          </div>
          <div class="form-group">
            <label for="title">Email</label>
            <a-input
              required
              type="text"
              id="title"
              v-model="currentUser.email"
              disabled
              placeholder="Nhập email"
            />
          </div>
        </div>
        <div class="sticky">
          <button class="btn btn-primary">Xem trước giao diện</button>
          <button class="btn btn-primary" @click="CreatePost">Đăng tin</button>
        </div>
      </div>
    </a-spin>
  </div>
</template>

<script>
// import ACounTer from "@/components/CreatePost/ACounter.vue";
import SelectTag from "@/components/UIComponents/UiSelectTag.vue";
import { mapGetters } from "vuex";
import { validationMixin } from "vuelidate";
import { required, minLength, maxLength } from "vuelidate/lib/validators";
import CloudinaryUpload from "@/components/CloudinaryUpload.vue";
import LocationSelect from "@/components/UIComponents/UiLocationSelect.vue";
import { RealEstateService } from "@/services/real_estate.service";
import { RealEstatePostStatus } from "@/constants/index";
import { formatCurrencyToVietnamese } from "@/services/util";

export default {
  name: "CreatePost",
  components: {
    SelectTag,
    CloudinaryUpload,
    LocationSelect,
    // ACounTer,
  },
  mixins: [validationMixin],
  validations: {
    newEstatePost: {
      LoaiBDS: { required },
      DiaChi: { required },
      TieuDe: { required, minLength: minLength(30), maxLength: maxLength(99) },
      MoTa: { required, minLength: minLength(30), maxLength: maxLength(999) },
      DienTich: { required },
      MucGia: { required },
      DonVi: { required },
      HinhAnh: { required },
    },
  },
  data() {
    return {
      loading: false,
      imageUrls: null,
      isBuy: true,
      isRent: false,
      // SelectedDangThongTin: null,
      renderBaseOnType: {
        Nhà: [
          "GiayToPhapLy",
          "NoiThat",
          "SoPhongTam",
          "SoTang",
          "SoPhongNgu",
          "HuongNha",
          "HuongBanCong",
          "DuongVao",
          "MatTien",
        ],
        Đất: ["GiayToPhapLy", "Huong", "DuongVao", "MatTien"],
        "Căn hộ": [
          "GiayToPhapLy",
          "NoiThat",
          "SoPhongTam",
          "SoPhongNgu",
          "HuongNha",
          "HuongBanCong",
        ],
        "Văn phòng": [
          "GiayToPhapLy",
          "NoiThat",
          "SoPhongTam",
          "SoTang",
          "HuongNha",
          "HuongBanCong",
          "DuongVao",
          "MatTien",
        ],
        Kho: [
          "GiayToPhapLy",
          "NoiThat",
          "SoPhongTam",
          "HuongNha",
          "HuongBanCong",
          "DuongVao",
          "MatTien",
        ],
      },
      legalPapers: ["Sổ đỏ/ Sổ hồng", "Hợp đồng mua bán", "Đang chờ sổ"],
      furniture: ["Đầy đủ", "Cơ bản", "Không nội thất"],
      directions: [
        "Đông",
        "Tây",
        "Nam",
        "Bắc",
        "Đông Bắc",
        "Tây Bắc",
        "Đông Nam",
        "Tây Nam",
      ],
      newEstatePost: {
        LoaiBDS: null,
        DiaChi: null,
        TieuDe: null,
        MoTa: null,
        DienTich: null,
        MucGia: null,
        DonVi: "VND",
        GiayToPhapLy: null,
        NoiThat: null,
        SoPhongTam: 0,
        SoTang: 0,
        SoPhongNgu: 0,
        HuongNha: null,
        HuongBanCong: null,
        DuongVao: null,
        MatTien: null,
        HinhAnh: null,
      },
      location: null,
    };
  },
  computed: {
    ...mapGetters(["allRentTypes", "allBuyTypes", "currentUser"]),
    DangThongTin() {
      const selectedType = this.newEstatePost.LoaiBDS;
      if (selectedType) {
        const typeOfInfo = this.AllRealEstateType.find(
          (type) => type.LoaiBDS === selectedType
        );
        return typeOfInfo.DangThongTin;
      }
      return null;
    },
    fieldsToRender() {
      if (!this.newEstatePost.LoaiBDS) return [];
      const typeOfInfo = this.DangThongTin;
      const fields = this.renderBaseOnType[typeOfInfo];
      return fields;
    },
    AllRealEstateType() {
      if (this.isBuy) {
        return this.allBuyTypes;
      } else {
        return this.allRentTypes;
      }
    },
    convertTypeOfRealEstateToID() {
      const type = this.newEstatePost.LoaiBDS;
      if (type) {
        const typeID = this.AllRealEstateType.find(
          (item) => item.LoaiBDS === type
        ).id;
        return typeID;
      }
      return "";
    },
    formattedPrice() {
      return formatCurrencyToVietnamese(this.newEstatePost.MucGia);
    },
  },
  methods: {
    locationUpdate(locationData) {
      this.location = locationData;
    },
    handleImageUploaded(imageUrls) {
      this.imageUrls = imageUrls;
    },
    ChangeType() {
      this.isBuy = !this.isBuy;
      this.isRent = !this.isRent;
      this.newEstatePost.LoaiBDS = null;
    },
    async CreatePost() {
      this.loading = true;
      const newPost = {
        ...this.newEstatePost,
        LoaiBDS: this.convertTypeOfRealEstateToID,
        IDNguoiDung: this.currentUser.id,
        HinhAnh: JSON.stringify(this.imageUrls),
        ThanhPho: this.location.city,
        Quan: this.location.district,
        Phuong: this.location.ward,
        Duong: this.newEstatePost.DiaChi,
        TrangThai: RealEstatePostStatus.CHUA_DUYET,
        DienTich: Number(this.newEstatePost.DienTich),
        // eslint-disable-next-line quote-props
        JsonData: { key: "value" },
        id_dia_chi_cu_the: 4,
        Lat: `${(Math.random() * 360 - 180).toString()}`,
        Long: `${(Math.random() * 360 - 180).toString()}`,
      };
      RealEstateService.createNewRealEstatePost(newPost)
        .then((res) => {
          if (res.status === 200) {
            this.$notification.success({
              message: "Tạo tin mới thành công",
            });
            this.$router.push("/userPostManagement/list");
          } else {
            this.$notification.error({
              message: "Đăng tin thất bại",
            });
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>

<style scoped>
.container {
  margin-top: 20px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Lexend", sans-serif;
}

.post,
.realEstate,
.contact,
.imageSection {
  margin-top: 10px;
}

.info {
  width: 700px;
  padding: 15px;
  background: #ffff;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
  text-align: left;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 5px 0px;
}

.info h3 {
  font-size: 25px;
  font-weight: 600;
  margin-bottom: 16px;
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

.Address {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.price {
  display: flex;
align-items: flex-start;
}

.Address .form-group,
.price .form-group {
  width: 47%;
}

.note {
  font-family: Roboto;
  font-size: 12px;
  line-height: 16px;
  font-weight: 400;
  color: rgb(80, 80, 80);
  margin-top: 5px;
}

.switchBox {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
  margin-left: 0px;
}

.changeType {
  width: 48.5% !important;
  display: inline-block;
  border-radius: 0px 4px 4px 0px;
  cursor: pointer;
  white-space: nowrap;
  width: fit-content;
  background-color: rgb(255, 255, 255);
  padding: 6px 12px 6px 11px;
  color: rgb(153, 153, 153);
  opacity: 1;
  border: 1px solid rgb(204, 204, 204);
  text-align: center;
}

.changeType:nth-child(1) {
  border-radius: 4px 0px 0px 4px;
}

.changeType.active {
  background-color: rgba(0, 0, 0, 0.6);
  color: rgb(255, 255, 255);
  color: rgb(255, 255, 255);
}

.counter {
  display: flex;
  justify-content: space-between;
  flex-direction: row;
}

.counter-box {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  margin: 10px;
}

.counter-box button {
  position: relative;
  height: 32px;
  display: inline-block;
  border-radius: 4px;
  cursor: pointer;
  white-space: nowrap;
  width: fit-content;
  background-color: rgb(153, 153, 153);
  padding: 10px;
  color: rgb(255, 255, 255);
  opacity: 0.4;
  border: none;
}

.counter-box button::focus {
  background-color: rgb(153, 153, 153);
  color: rgb(255, 255, 255);
}

.count {
  width: 50px;
  text-align: center;
  flex: 1 1 0%;
  margin: 0 7px;
  background-color: rgb(255, 255, 255);
  border: 1px solid rgb(204, 204, 204);
  border-radius: 4px;
  padding: 5px 12px 5px 11px;
  caret-color: rgb(0, 0, 0);
  color: rgb(44, 44, 44);
  outline: none;
  opacity: 1;
  font-size: 14px;
  font-family: Roboto;
  line-height: 20px;
}

#uploadImage {
  width: 100%;
  background: rgb(255, 255, 255);
  border: 1px dashed rgb(242, 242, 242);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  margin-top: 16px;
  margin-bottom: 8px;
  cursor: pointer;
}

.sticky {
  background-color: white;
  width: 100%;
  padding: 8px 24px;
  box-shadow: rgba(182, 182, 182, 0.18) 0px -2px 8px;
  margin-top: 5px;
  border-radius: 8px 8px 4px 4px;
  display: flex;
  justify-content: space-between;
  position: sticky;
  bottom: 0px;
}

.sticky .btn {
  position: relative;
  height: 48px;
  display: inline-block;
  border-radius: 8px;
  cursor: pointer;
  white-space: nowrap;
  text-align: center;
  width: fit-content;
  padding: 12px 16px 12px 16px;
  color: rgb(255, 255, 255);
  opacity: 1;
  border: none;
  cursor: pointer;
}

.sticky .btn:nth-child(1) {
  background-color: rgb(255, 255, 255);
  color: rgb(44, 44, 44);
  opacity: 1;
  border: 1px solid rgb(204, 204, 204);
}

.sticky .btn:nth-child(2) {
  background-color: rgb(224, 60, 49);
}

a-input[type="text"]:disabled {
  background-color: #e6e4e4;
  color: rgb(44, 44, 44);
  opacity: 1;
  border: 1px solid rgb(204, 204, 204);
}
</style>
