<!-- eslint-disable vue/max-attributes-per-line -->
<!-- eslint-disable no-unused-vars -->
<template>
  <div class="navbar-wrapper">
    <div class="fixed navigation re__full-menu">
      <div class="rightSide">
        <div class="logo">
          <img
            src="@/assets/image/CityAHomes.vn-1.png"
            alt=""
            @click="ToHome()"
          />
        </div>
        <nav>
          <el-dropdown placement="top-start">
            <router-link
              :to="'/house/sell'"
              class="el-dropdown-link"
              :style="menuItemStyle"
            >
              Nhà đất bán
            </router-link>
            <el-dropdown-menu slot="dropdown" :style="menuDropdownStyle">
              <router-link
                v-for="item in allBuyTypes"
                :key="item.id"
                :to="'/house/sell/' + item.id"
              >
                <el-dropdown-item
                  :style="{
                    color: 'black',
                    fontWeight: '600',
                  }"
                >
                  {{ item.LoaiBDS }}
                </el-dropdown-item>
              </router-link>
            </el-dropdown-menu>
          </el-dropdown>

          <el-dropdown placement="top-start">
            <router-link
              :to="'/house/rent'"
              class="ant-dropdown-link"
              :style="menuItemStyle"
            >
              Nhà đất cho thuê
            </router-link>
            <el-dropdown-menu slot="dropdown" :style="menuDropdownStyle">
              <router-link
                v-for="item in allRentTypes"
                :key="item.id"
                :to="'/house/rent/' + item.id"
              >
                <el-dropdown-item
                  :style="{
                    color: 'black',
                    width: '100%',
                    fontWeight: '600',
                  }"
                >
                  {{ item.LoaiBDS }}
                </el-dropdown-item>
              </router-link>
            </el-dropdown-menu>
          </el-dropdown>

          <div v-if="isLoggedIn && isAdmin || isEmployee ">
            <a-dropdown>
              <a class="ant-dropdown-link" :style="menuItemStyle">
                Quản trị Website
              </a>
              <a-menu slot="overlay" :style="menuDropdownStyle">
                <a-menu-item>
                  <router-link to="/admin/dashboard">Thống kê</router-link>
                </a-menu-item>
                <a-menu-item>
                  <router-link to="/admin/user-management"
                    >Quản lý người dùng</router-link
                  >
                </a-menu-item>
                <a-menu-item>
                  <router-link to="/admin/employee-management"
                    >Quản lý nhân viên</router-link
                  >
                </a-menu-item>
                <a-menu-item>
                  <router-link to="/admin/post-management"
                    >Quản lý tin đăng</router-link
                  >
                </a-menu-item>
              </a-menu>
            </a-dropdown>
          </div>
          <div v-if="isLoggedIn && isEmployee">
            <router-link to="/employee-page/employee-task"
              >Quản lý công việc</router-link
            >
          </div>
        </nav>
      </div>
      <div class="leftSide">
        <div id="divUserStt" v-if="isLoggedIn">
          <a-dropdown style="cursor: pointer">
            <div>
              <a-avatar
                :size="40"
                :style="{
                  backgroundColor: '#ffeceb',
                  color: '#74150f',
                  verticalAlign: 'middle',
                  marginRight: '10px',
                }"
              >
                {{ spliceUsernameToMakeAvatar }}
              </a-avatar>
              <a-typography-text :level="1">
                {{ getUserFromStore }}
              </a-typography-text>
              <a-icon type="down" />
            </div>
            <template #overlay>
              <a-menu>
                <a-menu-item
                  v-if="!isAdmin && !isEmployee"
                  :style="menuItemStyle"
                  @click="toPostManagement()"
                >
                  <a-icon :style="iconStyle" type="unordered-list" />
                  <a>Quản lý tin đăng</a>
                </a-menu-item>
                <a-menu-item
                  v-if="!isAdmin && !isEmployee"
                  :style="menuItemStyle"
                  @click="toProfile()"
                >
                  <a-icon :style="iconStyle" type="user" />
                  <a>Thay đổi thông tin cá nhân</a>
                </a-menu-item>
                <a-menu-item v-if="!isAdmin && !isEmployee" :style="menuItemStyle">
                  <a-icon :style="iconStyle" type="unlock" />
                  <a>Thay đổi mật khẩu</a>
                </a-menu-item>
                <a-menu-divider />
                <a-menu-item :style="menuItemStyle" @click="logout">
                  <a-icon :style="iconStyle" type="logout" />
                  <a>Đăng xuất</a>
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </div>
        <div id="divUserStt" v-else>
          <router-link to="/login">Đăng nhập</router-link>
          <a-divider type="vertical"></a-divider>
          <router-link to="/register">Đăng ký</router-link>
        </div>
        <div v-if="!isAdmin && !isEmployee" class="CreatePost">
          <router-link to="/userPostManagement/create">Đăng tin</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "NavBar",
  mounted() {
    this.$store.dispatch("getAllRealEstateType");
  },
  data() {
    return {
      menuItemStyle: {
        display: "flex",
        justifyContent: "flex-start",
        alignContent: "center",
      },
      iconStyle: {
        marginTop: "2px",
      },
      menuDropdownStyle: {
        maxHeight: "350px",
        overflowY: "auto",
        color: "#000",
      },
    };
  },
  computed: {
    ...mapGetters(["allRentTypes", "allBuyTypes", "currentUser"]),
    spliceUsernameToMakeAvatar() {
      return this.currentUser.ho_ten.slice(0, 1);
    },
    getUserFromStore() {
      return this.currentUser.ho_ten;
    },
    isLoggedIn() {
      return this.currentUser !== null;
    },
    isAdmin() {
      return this.currentUser?.is_admin || false;
    },
    isEmployee() {
      return this.currentUser?.is_employee || false;
    },
  },
  methods: {
    ToHome() {
      this.$router.push("/");
    },
    toPostManagement() {
      this.$router.push("/userPostManagement/list");
    },
    toProfile() {
      this.$router.push("/userPostManagement/profile");
    },
    logout() {
      this.$store.dispatch("logout");
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
p {
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
  color: rgb(44, 44, 44);
}

.navbar-wrapper {
  height: 96px;
  font-family: "Lexend", sans-serif;
}

.fixed {
  position: fixed !important;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
}

.re__full-menu {
  background: #fff;
  width: 100%;
  height: 96px;
  margin: 0 auto;
  position: relative;
  z-index: 999;
  padding: 17px 15px 17px;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-shadow: 0px 4px 10px rgba(182, 182, 182, 0.18);
}

.navigation {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
}

.rightSide {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.rightSide .logo img {
  width: 120px;
  height: 65px;
  margin-right: 10px;
  object-fit: cover;
  cursor: pointer;
}

.navigation nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 20px;
}

.navigation nav a {
  text-decoration: none;
  color: #000;
  font-size: 15px;
  font-weight: 500;
  padding: 12px 0px 8px;
  display: inline-grid;
  list-style: none;
  vertical-align: middle;
  position: relative;
  float: left;
  margin: 0 10px;
}

.navigation nav a {
  position: relative;
  transition: all 0.3s ease-in-out;
}

.navigation nav a::before {
  content: "";
  position: absolute;
  width: 0;
  height: 2px;
  bottom: 0;
  left: 0;
  background-color: #e03c31;
  transition: width 0.3s;
}

.navigation nav a:hover::before {
  width: 100%;
}

.leftSide {
  display: flex;
  align-items: center;
}

.leftSide div {
  display: table-cell;
  vertical-align: middle;
}

.leftSide .CreatePost a {
  color: #e03c31;
  background: #fff;
  border: solid 1px rgb(224, 60, 49);
  font-size: 14px;
  line-height: 20px;
  font-weight: normal !important;
  letter-spacing: -0.2px;
  padding: 13px 15px;
  border-radius: 8px;
  margin: 0 15px;
  cursor: pointer;
  transition: 0.2s ease-in-out;
}

.leftSide .CreatePost a:hover {
  background-color: rgb(243, 205, 205);
  color: rgb(224, 60, 49);
  opacity: 1;
  border: 1px solid rgb(224, 60, 49);
}

#divUserStt {
  display: flex;
  flex-direction: row;
  align-items: center;
}

#divUserStt a {
  color: #2c2c2c;
  font-size: 16px;
  font-weight: 400;
  margin-right: 10px;
}
</style>
