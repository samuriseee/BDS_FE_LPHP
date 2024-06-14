import Vue from 'vue'
import Router from 'vue-router'

import { checkAccessMiddleware, setPageTitleMiddleware } from './middlewares'
import { routes } from './routes'

Vue.use(Router)

const router = new Router({
  linkActiveClass: 'is-active',
  mode: 'history',
  routes
})

router.beforeEach(checkAccessMiddleware)
router.beforeEach(setPageTitleMiddleware)

export default router
