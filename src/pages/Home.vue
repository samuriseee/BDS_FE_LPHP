<template>
  <HomeLayout>
    <div class="home">
      <div class="hero-section">
        <div class="content-section">
          <el-carousel height="600px" motion-blur>
            <el-carousel-item v-for="item in imgUrls" :key="item">
              <img
                style="width: 100%; height: 600px; object-fit: cover"
                :src="item"
                alt=""
              />
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
      <div
        class="wrapper"
        :style="{
          margin: '70px auto',
        }"
      >
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
          Tin Tức Bất Động Sản mới nhất
        </h1>
        <el-tabs v-model="activeName">
          <el-tab-pane label="Tin nổi bật" name="first">
            <div
              :style="{
                display: 'flex',
                justifyContent: 'space-evenly',
                gap: '20px',
              }"
            >
              <el-card
                v-for="blog in realEstateBlogs.first"
                :key="blog.id"
                :style="{
                  display: 'flex',
                  justifyContent: 'space-between',
                  gap: '20px',
                  textAlign: 'left',
                  width: '33%',
                }"
                :body-style="{ padding: '0px' }"
                shadow="hover"
              >
                <img
                  :style="{
                    width: '100%',
                    height: '200px',
                    objectFit: 'cover',
                    marginBottom: '12px',
                  }"
                  :src="blog.image"
                  alt=""
                />
                <h3
                  :style="{
                    fontSize: '16px',
                    lineHeight: '24px',
                    letterSpacing: '-.2px',
                    marginBottom: '12px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: '3',
                    WebkitBoxOrient: 'vertical',
                    padding: '0 10px',
                  }"
                >
                  {{ blog.title }}
                </h3>
              </el-card>
            </div>
          </el-tab-pane>
          <el-tab-pane label="Tin tức" name="second">
            <div
              :style="{
                display: 'flex',
                justifyContent: 'space-evenly',
                gap: '20px',
              }"
            >
              <el-card
                v-for="blog in realEstateBlogs.second"
                :key="blog.id"
                :style="{
                  display: 'flex',
                  justifyContent: 'space-between',
                  gap: '20px',
                  textAlign: 'left',
                  width: '33%',
                }"
                :body-style="{ padding: '0px' }"
                shadow="hover"
              >
                <img
                  :style="{
                    width: '100%',
                    height: '200px',
                    objectFit: 'cover',
                    marginBottom: '12px',
                  }"
                  :src="blog.image"
                  alt=""
                />
                <h3
                  :style="{
                    fontSize: '16px',
                    lineHeight: '24px',
                    letterSpacing: '-.2px',
                    marginBottom: '12px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: '3',
                    WebkitBoxOrient: 'vertical',
                    padding: '0 10px',
                  }"
                >
                  {{ blog.title }}
                </h3>
              </el-card>
            </div>
          </el-tab-pane>
          <el-tab-pane label="BĐS Tin Tức" name="third">
            <div
              :style="{
                display: 'flex',
                justifyContent: 'space-evenly',
                gap: '20px',
              }"
            >
              <el-card
                v-for="blog in realEstateBlogs.third"
                :key="blog.id"
                :style="{
                  display: 'flex',
                  justifyContent: 'space-between',
                  gap: '20px',
                  textAlign: 'left',
                  width: '33%',
                }"
                :body-style="{ padding: '0px' }"
                shadow="hover"
              >
                <img
                  :style="{
                    width: '100%',
                    height: '200px',
                    objectFit: 'cover',
                    marginBottom: '12px',
                  }"
                  :src="blog.image"
                  alt=""
                />
                <h3
                  :style="{
                    fontSize: '16px',
                    lineHeight: '24px',
                    letterSpacing: '-.2px',
                    marginBottom: '12px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: '3',
                    WebkitBoxOrient: 'vertical',
                    padding: '0 10px',
                  }"
                >
                  {{ blog.title }}
                </h3>
              </el-card>
            </div>
          </el-tab-pane>
          <el-tab-pane label="BĐS Hà Nội" name="fourth">
            <div
              :style="{
                display: 'flex',
                justifyContent: 'space-evenly',
                gap: '20px',
              }"
            >
              <el-card
                v-for="blog in realEstateBlogs.fourth"
                :key="blog.id"
                :style="{
                  display: 'flex',
                  justifyContent: 'space-between',
                  gap: '20px',
                  textAlign: 'left',
                  width: '33%',
                }"
                :body-style="{ padding: '0px' }"
                shadow="hover"
              >
                <img
                  :style="{
                    width: '100%',
                    height: '200px',
                    objectFit: 'cover',
                    marginBottom: '12px',
                  }"
                  :src="blog.image"
                  alt=""
                />
                <h3
                  :style="{
                    fontSize: '16px',
                    lineHeight: '24px',
                    letterSpacing: '-.2px',
                    marginBottom: '12px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: '3',
                    WebkitBoxOrient: 'vertical',
                    padding: '0 10px',
                  }"
                >
                  {{ blog.title }}
                </h3>
              </el-card>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div
        class="wrapper"
        :style="{
          marginBottom: '40px',
        }"
      >
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
          Bất động sản dành cho bạn
        </h1>
        <div
          :style="{
            display: 'flex',
            gap: '20px',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            cursor: 'pointer',
          }"
        >
          <el-card
            v-for="blog in getApprovedRealEstate"
            :key="blog.bat_dong_san.id"
            :style="{
              display: 'flex',
              justifyContent: 'space-between',
              gap: '20px',
              textAlign: 'left',
              width: '23%',
            }"
            :body-style="{ padding: '0px' }"
            shadow="hover"
            @click.native="goToEstateDetails(blog.bat_dong_san.id)"
          >
            <img
              :style="{
                width: '100%',
                objectFit: 'cover',
                marginBottom: '12px',
                height: '200px',
              }"
              :src="blog.bat_dong_san.HinhAnh[0]"
              alt=""
            />
            <h3
              :style="{
                fontSize: '16px',
                lineHeight: '24px',
                letterSpacing: '-.2px',
                marginBottom: '12px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: '3',
                WebkitBoxOrient: 'vertical',
                padding: '0 10px',
              }"
            >
              {{ blog.bat_dong_san.TieuDe }}
            </h3>
            <div
              :style="{
                display: 'flex',
                padding: '10px',
                gap: '10px',
              }"
            >
              <p style="color: red; font-weight: 500">
                {{
                  blog.bat_dong_san.MucGia
                    ? formatCurrencyToVietnamese(blog.bat_dong_san.MucGia)
                    : "Thoả Thuận"
                }}
              </p>
              <p style="color: red; font-weight: 500">
                {{ blog.bat_dong_san.DienTich }} m²
              </p>
            </div>
            <div
              :style="{
                display: 'flex',
                padding: '10px',
                gap: '10px',
              }"
            >
              <i class="el-icon-location-outline"></i>
              <p>
                {{ blog.bat_dong_san.Quan }}, {{ blog.bat_dong_san.ThanhPho }}
              </p>
            </div>
          </el-card>
        </div>
      </div>
    </div>
  </HomeLayout>
</template>

<script>
import HomeLayout from "@/layout/HomeLayout.vue";
import { mapGetters } from "vuex";
import { RealEstateService } from "@/services/real_estate.service";
import { RealEstatePostStatus } from "@/constants/index";
import { formatCurrencyToVietnamese } from "@/services/util";

export default {
  name: "Home",
  components: {
    HomeLayout,
  },
  data() {
    return {
      activeName: "first",
      imgUrls: [
        require("@/assets/image/wallpaper2.jpg"),
        require("@/assets/image/wallpaper1.jpg"),
        require("@/assets/image/wallpaper3.jpg"),
      ],
      realEstateBlogs: {
        first: [
          {
            id: 1,
            title: "Điểm đảo chiều của từng loại hình bất động sản",
            image:
              "https://img.iproperty.com.my/angel/610x342-crop/wp-content/uploads/sites/7/2024/06/bao-cao-thi-truong-bat-dong-san.webp",
          },
          {
            id: 2,
            title: "BĐS Khánh Hòa Tháng 5: Thị Trường Cho Thuê Khởi Sắc",
            image:
              "https://img.iproperty.com.my/angel/610x342-crop/wp-content/uploads/sites/7/2024/06/bds-nha-trang-khanh-hoa.png",
          },
          {
            id: 3,
            title: "Tiêu Chí Chọn Mua Nhà Ngày Càng Khắt Khe",
            image:
              "https://img.iproperty.com.my/angel/750x1000-fit/wp-content/uploads/sites/7/2024/06/CT.jpg",
          },
          {
            id: 4,
            title: "Môi giới bất động sản ồ ạt quay lại với nghề",
            image:
              "https://img.iproperty.com.my/angel/610x342-crop/wp-content/uploads/sites/7/2024/06/moi-gioi-2.jpg",
          },
        ],
        second: [
          {
            id: 1,
            title: "Căn Hộ Studio Cháy Hàng Tại Nhiều Dự Án",
            image:
              "https://img.iproperty.com.my/angel/610x342-crop/wp-content/uploads/sites/7/2024/05/can-ho-2.png",
          },
          {
            id: 2,
            title: "Những lưu ý khi mua nhà đất",
            image:
              "https://img.iproperty.com.my/angel/610x342-crop/wp-content/uploads/sites/7/2024/05/quan-binh-tan-ava.jpg",
          },
          {
            id: 3,
            title: "Những lưu ý khi mua nhà đất",
            image:
              "https://img.iproperty.com.my/angel/610x342-crop/wp-content/uploads/sites/7/2024/06/294711665_3260405620914181_1429864663448615992_n.jpg",
          },
          {
            id: 4,
            title: "Những lưu ý khi mua nhà đất",
            image:
              "https://img.iproperty.com.my/angel/750x1000-fit/wp-content/uploads/sites/7/2024/06/MG_9605-scaled.jpg",
          },
        ],
        third: [
          {
            id: 1,
            title:
              "Quận Tân Bình gần Quận nào? Các Dự Án Căn hộ Nổi Bật Tại Tân Bình",
            image:
              "https://img.iproperty.com.my/angel/610x342-crop/wp-content/uploads/sites/7/2024/06/tan-binh-gan-quan-nao-1.jpg",
          },
          {
            id: 2,
            title: "Tranh Thủ Ưu Đãi, Nhiều người Chốt mua Bất Động Sản Nhanh",
            image:
              "https://img.iproperty.com.my/angel/610x342-crop/wp-content/uploads/sites/7/2024/06/Picture3.1.jpg",
          },
          {
            id: 3,
            title: "Tiêu Chí chọn mua Nhà Ngày càng Khắt Khe",
            image:
              "https://img.iproperty.com.my/angel/610x342-crop/wp-content/uploads/sites/7/2024/06/MG_9605-scaled.jpg",
          },
          {
            id: 4,
            title: "Lại Thổi Giá Đất Nền vùng Ven",
            image:
              "https://img.iproperty.com.my/angel/610x342-crop/wp-content/uploads/sites/7/2024/06/Picture1.jpg",
          },
        ],
        fourth: [
          {
            id: 1,
            title: "Môi Giới Bất Động Sản Ồ Ạt Quay Lại Với Nghề",
            image:
              "https://img.iproperty.com.my/angel/610x342-crop/wp-content/uploads/sites/7/2024/06/moi-gioi-2.jpg",
          },
          {
            id: 2,
            title: "Giá Chung Cư Hà Nội Đã Thiết Lập Mặt Bằng Mới",
            image:
              "https://img.iproperty.com.my/angel/610x342-crop/wp-content/uploads/sites/7/2024/06/anh-1-2.jpg",
          },
          {
            id: 3,
            title:
              "Dù Giao Dịch Chững, Nhiều Chủ Nhà Kiên Quyết Không hạ Giá Chung Cư",
            image:
              "https://img.iproperty.com.my/angel/610x342-crop/wp-content/uploads/sites/7/2024/05/chung-cu-2-1.jpg",
          },
          {
            id: 4,
            title: "Chung Cư Mini Tiếp Tục Biến Động Sau Vụ Cháy Ở Trung Kính",
            image:
              "https://img.iproperty.com.my/angel/610x342-crop/wp-content/uploads/sites/7/2024/06/chung-cu-mini.jpg",
          },
        ],
      },
      RealEstatePostStatus,
      allRealEstates: [],
    };
  },
  created() {
    this.getRealEstates();
  },
  computed: {
    ...mapGetters(["allRealEstateType"]),
    getApprovedRealEstate() {
      return this.allRealEstates
        ?.filter(
          (estate) =>
            estate.bat_dong_san.TrangThai == this.RealEstatePostStatus.DA_DUYET
        )
        .splice(0, 8);
    },
  },
  methods: {
    formatCurrencyToVietnamese,
    goToEstateDetails(id) {
      this.$router.push("/estate/" + id);
    },
    async getRealEstates() {
      try {
        const response = await RealEstateService.getAllRealEstates();
        const mappedRealEstates = response.data.map((estate) => {
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
  },
};
</script>

<style scoped>
.home {
  width: 100%;
  font-family: "Lexend Medium", Roboto, Arial !important;

  .hero-section {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    position: relative;
    width: 100%;
    height: 600px;
    background-image: url("https://scontent.fdad3-4.fna.fbcdn.net/v/t39.30808-6/291574898_556241016166570_4470157016291908302_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=P_IBtzRV5SIQ7kNvgFi3En7&_nc_ht=scontent.fdad3-4.fna&oh=00_AYAcX0mMXB7_MdAO91y2mnyFFId6WivKEtkGWinnxaUMEQ&oe=6686110D");
    background-size: cover;
    background-position: center;
    backdrop-filter: brightness(50%);
  }

  .content-section::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: -1;
  }

  .content-section {
    width: 100%;
    height: 100%;
    text-align: center;

  }
}
</style>
