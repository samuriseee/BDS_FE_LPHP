// profile
import profilePage from "../pages/profile/ProfilePage.vue";
import profilePostsPage from "../pages/profile/ProfilePostsPage.vue";

import userPostManagement from "../pages/userPostManagement/index.vue";
import CreateNewRealEstates from "../pages/userPostManagement/CreateNewPost.vue";
import UserPostManagement from "@/pages/userPostManagement/UserPostManagement.vue";
import homePage from "../pages/Home.vue";
import newsPage from "../pages/news/NewsPage.vue";
import loginPage from "../pages/AuthenView/LoginView.vue";
import notFoundPage from "../pages/NotFound.vue";
import registerPage from "../pages/AuthenView/RegisterView.vue";
import realEstateList from "../pages/realEstateList/realEstateList.vue";
import realEstateDetail from "../pages/realEstateList/realEstateDetail.vue";
import Dashboard from "@/pages/AdminView/Dashboard.vue";
import RealEstatePostManagement from "@/pages/AdminView/RealEstatePostManagement.vue";
import UserManagement from "@/pages/AdminView/UserManagement.vue";
import AccountManagement from "@/pages/AdminView/AccountManagement.vue";
import admin from "@/pages/AdminView/index.vue";
import AdminRealEstateDetail from "@/pages/AdminView/RealEstatePostManagementDetail.vue";
import ForgotPasswordView from "@/pages/AuthenView/ForgotPasswordView.vue";

import { routePropResolver } from "./util";
import { DOMAIN_TITLE } from "../.env";


export const routes = [
  {
    path: "/",
    name: "index",
    component: homePage,
    meta: { title: `${DOMAIN_TITLE} | home` },
  },
  {
    path: "/news",
    name: "news",
    component: newsPage,
    meta: { title: `${DOMAIN_TITLE} | news` },
    props: routePropResolver,
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
    path: "/profile",
    component: profilePage,
    meta: { isAuth: true, title: `${DOMAIN_TITLE} | profile` },
    children: [
      {
        path: "",
        name: "profile",
        component: profilePostsPage,
      },
    ],
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
        path: "account-management",
        name: "accountManagement",
        component: AccountManagement,
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
