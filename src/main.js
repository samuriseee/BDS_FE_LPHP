import Vue from 'vue'

import App from './App.vue'
import router from './router'
import store from './store'

import './mixins'
import './plugins'
import './thirdParty'

import './scss/style.scss'
import './assets/fonts/bebasneue.css'
import 'moment/locale/zh-cn'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import { Vuelidate } from "vuelidate";
import { Cloudinary } from "cloudinary-vue";
import cloudinaryCore from "cloudinary-core";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faBed, faBathtub, faPhone } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en'
import "./scss/element-variables.scss";

library.add(faBed)
library.add(faBathtub)
library.add(faPhone)

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(Antd)
Vue.use(ElementUI, { locale })
Vue.use(Cloudinary, {
  configuration: { cloudName: "detorxu0l" },
  components: ["CldImage", "CldTransformation"],
});
Vue.prototype.$cloudinaryCore = new cloudinaryCore.Cloudinary({
  cloud_name: "detorxu0l",
});
Vue.config.productionTip = false

const commitWindowWidth = () => store.commit('dom/SET_WINDOW_WIDTH', window.innerWidth)

new Vue({
  name: 'Root',
  router,
  store,
  Vuelidate,
  mounted () {
    commitWindowWidth()
    window.addEventListener('resize', commitWindowWidth)
  },

  beforeDestroy () {
    window.removeEventListener('resize', commitWindowWidth)
  },
  render: h => h(App)
}).$mount('#app')
