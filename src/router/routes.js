// profile
import profilePage from '../pages/profile/ProfilePage.vue'
import profilePostsPage from '../pages/profile/ProfilePostsPage.vue'

import userPostManagement from '../pages/userPostManagement/index.vue'
import CreateNewRealEstates from '../pages/userPostManagement/CreateNewPost.vue'
import homePage from '../pages/Home.vue'
import newsPage from '../pages/news/NewsPage.vue'
import loginPage from '../pages/AuthenView/LoginView.vue'
import notFoundPage from '../pages/NotFound.vue'
import registerPage from '../pages/AuthenView/RegisterView.vue'
import realEstateList from '../pages/realEstateList/realEstateList.vue'
import realEstateDetail from '../pages/realEstateList/realEstateDetail.vue'

import { routePropResolver } from './util'
import { DOMAIN_TITLE } from '../.env'

export const routes = [
  {
    path: '/',
    name: 'index',
    component: homePage,
    meta: { title: `${DOMAIN_TITLE} | home` }
  },
  {
    path: '/news',
    name: 'news',
    component: newsPage,
    meta: { title: `${DOMAIN_TITLE} | news` },
    props: routePropResolver
  },
  {
    path: '/userPostManagement',
    component: userPostManagement,
    meta: { isAuth: true, title: `${DOMAIN_TITLE} | userPostManagement` },
    children: [
      {
        path: 'create',
        name: 'createNewPost',
        component: CreateNewRealEstates
      }
    ]
  },
  {
    path: '/house/:businessType/:realEstateType',
    component: realEstateList,
    meta: { title: `${DOMAIN_TITLE} | real estate list` }
  },
  {
    path: '/estate/:id',
    component: realEstateDetail,
    meta: { title: `${DOMAIN_TITLE} | real estate detail` }
  },
  {
    path: '/profile',
    component: profilePage,
    meta: { isAuth: true, title: `${DOMAIN_TITLE} | profile` },
    children: [
      {
        path: '',
        name: 'profile',
        component: profilePostsPage
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: loginPage,
    meta: { title: `${DOMAIN_TITLE} | login` }
  },
  {
    path: '/register',
    name: 'register',
    component: registerPage,
    meta: { title: `${DOMAIN_TITLE} | register` }
  },
  {
    path: '*',
    component: notFoundPage,
    meta: { title: `${DOMAIN_TITLE} | not found` }
  }
]
