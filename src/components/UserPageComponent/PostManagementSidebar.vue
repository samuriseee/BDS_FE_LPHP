<template>
  <a-layout class="layout">
    <a-layout-sider
      :trigger="null"
      :theme="'light'"
      class="sidebar"
      :style="{
        maxWidth: 'auto',
        minWidth: '250px',
        width: 'auto',
      }"
    >
      <el-scrollbar wrap-class="scrollbar-wrapper">
        <el-menu
          :default-active="activeKey"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          :style="{
            textAlign: 'initial',
            height: '100vh',
            
          }"
        >
          <div class="customer-info">
            <a-avatar
              :size="70"
              :style="{
                backgroundColor: '#ffeceb',
                color: '#74150f',
                verticalAlign: 'middle',
                fontSize: '28px',
                fontWeight: 'bold'
              }"
              :theme="'light'"
            >
              {{ spliceUsernameToMakeAvatar }}
            </a-avatar>
            <h4>
              {{ getUserFromStore }}
            </h4>
          </div>

          <el-submenu
            v-for="item in menuList"
            :key="item.key"
            :index="item.key"
          >
            <template slot="title" class="menuParent">
              <i :class="`el-icon-${item.icon}`"></i>
              <span>{{ item.title }}</span>
            </template>
            <el-menu-item
              v-for="child in item.children"
              :key="child.key"
              :index="child.key"
            >
              <router-link class="menuItem" :to="child.href">{{ child.title }}</router-link>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-scrollbar>
    </a-layout-sider>
  </a-layout>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      menuList: [
        {
          key: "sub1",
          icon: "user",
          title: "Quản lý tin đăng",
          children: [
            {
              key: "1-1",
              title: "Đăng mới",
              href: "/userPostManagement/create",
            },
            {
              key: "1-2",
              title: "Danh sách tin",
              href: "/userPostManagement/list",
            },
          ],
        },
        {
          key: "sub3",
          icon: "user",
          title: "Quản lý TK cá nhân",
          children: [
            {
              key: "3-1",
              title: "Chỉnh sửa thông tin cá nhân",
              href: "/userPostManagement/profile",
            },
          ],
        },
      ],
      isCollapse: false,
      variables: {
        menuBg: "#001529",
        menuText: "#fff",
        menuActiveText: "#1890ff",
      },
    };
  },
  computed: {
    ...mapGetters(["currentUser"]),
    spliceUsernameToMakeAvatar() {
      if (this.currentUser) {
        return this.currentUser?.ho_ten.slice(0, 1).toUpperCase();
      }
      return "";
    },
    getUserFromStore() {
      if (this.currentUser) {
        return this.currentUser?.ho_ten;
      }
      return "";
    },
    activeKey() {
      let activeKey = "";
      this.menuList.forEach((item) => {
        item.children.forEach((child) => {
          if (child.href === this.$route.path) {
            activeKey = child.key;
          }
        });
      });
      return activeKey;
    },
  },
  methods: {
    handleClick(e) {
      console.log("click", e);
    },
    titleClick(e) {
      console.log("titleClick", e);
    },
  },
};
</script>

<style scoped>
.layout {
  max-width: 250px;
}
.sidebar {
  font-family: "Lexend", sans-serif;
  overflow: scroll;
  height: 100vh;
  position: fixed;
  left: 0;
  background: #fff;
  text-decoration: none;
  color: #000;
  font-size: 15px;
  font-weight: 500;
  max-width: 250px;
}
.customer-info {
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
}
.menuItem {
  height: 48px;
  color: rgb(44, 44, 44);
  cursor: pointer;
  width: 100%;
  position: relative;
  display: flex;
  -webkit-box-pack: justify;
  justify-content: space-between;
}
.menuParent {
  background-color: rgb(255, 255, 255);
  height: 48px;
  color: rgb(116, 21, 15);
  cursor: pointer;
  width: 100%;
  position: relative;
  display: flex;
  -webkit-box-pack: justify;
  justify-content: space-between;
}
h4 {
  font-family: Lexend;
  font-size: 18px;
  line-height: 28px;
  font-weight: 500;
  letter-spacing: -0.2px;
  color: rgb(44, 44, 44);
  word-wrap: break-word;
}
</style>
