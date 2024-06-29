// profile
import userPostManagement from "../pages/userPostManagement/index.vue";
import CreateNewRealEstates from "../pages/userPostManagement/CreateNewPost.vue";
import EditEstatePost from "@/pages/userPostManagement/EditEstatePost.vue";
import UserPostManagement from "@/pages/userPostManagement/UserPostManagement.vue";
import homePage from "../pages/Home.vue";
import loginPage from "../pages/AuthenView/LoginView.vue";
import notFoundPage from "../pages/NotFound.vue";
import registerPage from "../pages/AuthenView/RegisterView.vue";
import realEstateList from "../pages/realEstateList/realEstateList.vue";
import realEstateDetail from "../pages/realEstateList/realEstateDetail.vue";
import Dashboard from "@/pages/AdminView/Dashboard.vue";
import RealEstatePostManagement from "@/pages/AdminView/RealEstatePostManagement.vue";
import UserManagement from "@/pages/AdminView/UserManagement.vue";
import UserManagementDetail from "@/pages/AdminView/UserManagementDetail.vue";
import EmployeeManagement from "@/pages/AdminView/EmployeeManagement.vue";
import admin from "@/pages/AdminView/index.vue";
import AdminRealEstateDetail from "@/pages/AdminView/RealEstatePostManagementDetail.vue";
import ForgotPasswordView from "@/pages/AuthenView/ForgotPasswordView.vue";
import ProfilePage from "@/pages/userPostManagement/ProfilePage.vue";
import PreviewOthersProfile from "@/pages/userPostManagement/PreviewOthersProfile.vue";

import { DOMAIN_TITLE } from "../.env";


export const routes = [
  {
    path: "/",
    name: "index",
    component: homePage,
    meta: { title: `${DOMAIN_TITLE} | home` },
  },
  {
    path: "/userPostManagement",
    component: userPostManagement,
    meta: { isAuth: true, title: `${DOMAIN_TITLE} | userPostManagement` },
    children: [
      {
        path: "create",
        name: "createNewPost",
        component: CreateNewRealEstates,
      },
      {
        path: "list",
        name: "userPostManagement",
        component: UserPostManagement,
      },
      {
        path: "edit/:id",
        name: "editPost",
        component: EditEstatePost,
      },
      {
        path: "profile",
        name: "profilePage",
        component: ProfilePage,
      }
    ],
  },
    {
    path: "/house/:businessType",
    component: realEstateList,
    meta: { title: `${DOMAIN_TITLE} | real estate list` },
  },
  {
    path: "/house/:businessType/:realEstateType",
    component: realEstateList,
    meta: { title: `${DOMAIN_TITLE} | real estate list` },
  },
  {
    path: "/estate/:id",
    component: realEstateDetail,
    name: "realEstateDetail",
    meta: { title: `${DOMAIN_TITLE} | real estate detail` },
  },
  {
    path: '/profile/:id',
    component: PreviewOthersProfile,
    name: 'PreviewOthersProfile',
  },
  {
    path: "/admin",
    meta: { isAuth: true, title: `${DOMAIN_TITLE} | admin` },
    component: admin,
    children: [
      {
        path: "dashboard",
        name: "dashboard",
        component: Dashboard,
      },
      {
        path: "post-management",
        name: "realEstatePostManagement",
        component: RealEstatePostManagement,
      },
      {
        path: "post-management/:id",
        name: "AdminRealEstateDetail",
        component: AdminRealEstateDetail,
      },
      {
        path: "user-management",
        name: "userManagement",
        component: UserManagement,
      },
      {
        path: "user-management/:id",
        name: "userManagementDetail",
        component: UserManagementDetail,
      },
      {
        path: "employee-management",
        name: "employeeManagement",
        component: EmployeeManagement,
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: loginPage,
    meta: { title: `${DOMAIN_TITLE} | login` },
  },
  {
    path: "/register",
    name: "register",
    component: registerPage,
    meta: { title: `${DOMAIN_TITLE} | register` },
  },
  {
    path: "/forgot-password",
    name: "forgot-password",
    component: ForgotPasswordView,
    meta: { title: `${DOMAIN_TITLE} | forgot` },
  },
  {
    path: "*",
    component: notFoundPage,
    meta: { title: `${DOMAIN_TITLE} | not found` },
  },
];
