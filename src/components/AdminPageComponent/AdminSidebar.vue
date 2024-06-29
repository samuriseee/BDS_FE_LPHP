<template>
  <a-layout class="layout">

    <a-layout-sider
      :trigger="null"
      :theme="'light'"
      class="sidebar"
      :style="{
        maxWidth: 'auto',
        minWidth: 'auto',
        width: 'auto',
      }"
    >

      <el-scrollbar wrap-class="scrollbar-wrapper">
        <el-menu
          :default-active="activeMenu"
          :collapse="isCollapsed"
          :unique-opened="true"
          :router="true"
          :collapse-transition="false"
          :style="{
            textAlign: 'left',
            minHeight: '100vh',
            minWidth: '250px',
            position: 'fixed',
            fontWeight: 'bold',
            fontSize: '20px'
          }"
        >
          <template v-for="menu in isAdmin ? adminMenuList : employeeMenuList">
            <el-submenu
              v-if="menu.children"
              :index="menu.index"
              :key="menu.index"
            >
              <template #title>
                <i :class="menu.icon"></i>
                <span>{{ menu.title }}</span>
              </template>
              <el-menu-item
                v-for="child in menu.children"
                :index="child.index"
                :key="child.index"
              >
                <router-link :to="child.path">{{ child.title }}</router-link>
              </el-menu-item>
            </el-submenu>
            <el-menu-item v-else :index="menu.index" :key="menu.index">
              <i :class="menu.icon"></i>
              <span>{{ menu.title }}</span>
              <router-link :to="menu.path"></router-link>
            </el-menu-item>
          </template>
        </el-menu>
      </el-scrollbar>
    </a-layout-sider>
  </a-layout>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "AdminSidebar",
  data() {
    return {
      activeMenu: "", // Set the active menu item here
      isCollapsed: false, // Set to true to collapse the sidebar
      adminMenuList: [
        {
          title: "Thống Kê",
          icon: "el-icon-s-home",
          path: "/admin/dashboard",
          index: "/admin/dashboard",
        },
        {
          title: "Quản lý người dùng",
          icon: "el-icon-user",
          path: "/admin/user-management",
          index: "/admin/user-management",
        },
        {
          title: "Quản lý nhân viên",
          icon: "el-icon-s-custom",
          path: "/admin/employee-management",
          index: "/admin/employee-management",
        },
        {
          title: "Quản lý tin đăng",
          icon: "el-icon-s-order",
          path: "/admin/post-management",
          index: "/admin/post-management",
        },
      ],
      employeeMenuList: [
        {
          title: "Thống Kê",
          icon: "el-icon-s-home",
          path: "/admin/dashboard",
          index: "/admin/dashboard",
        },
        {
          title: "Quản lý tin đăng",
          icon: "el-icon-s-order",
          path: "/admin/post-management",
          index: "/admin/post-management",
        },
      ],
    };
  },
  computed: {
        ...mapGetters(["currentUser"]),
    isAdmin() {
      return this.currentUser?.is_admin;
    },
  },
};
</script>

<style scoped>
.layout {
  max-width: 250px;
}

.sidebar {
  overflow: scroll;
  height: 100vh;
  left: 0;
  background: #fff;
  text-decoration: none;
  color: #000;
  font-size: 15px;
  font-weight: 500;
  max-width: 250px;
  flex: 0 0 100% !important;
}

.customer-info {
  width: 250px;
  padding: 20px;
  display: flex;
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
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 160px;
}
</style>
