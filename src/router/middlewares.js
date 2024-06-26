import store from '@/store'
import { AuthService } from '@/services/auth.service'

/**
 * Current user state initialization
 * @WARN Must be always first in middleware chain
 */
export async function initCurrentUserStateMiddleware (to, from, next) {
  const currentUserId = !!store.getters.currentUser
  if (AuthService.hasRefreshToken() && !currentUserId) {
    try {
      await AuthService.debounceRefreshTokens()
      // await $store.dispatch('user/getCurrent')
      next()
    } catch (e) {
      console.log(e)
    }
  } else {
    next()
  }
}

/**
 * Check access permission to auth routes
 */
export async function checkAccessMiddleware (to, from, next) {
  const token = localStorage.getItem('token');
  const isAuthRoute = to.matched.some(item => item.meta.isAuth)

  if (isAuthRoute && token) return next()
  if (isAuthRoute) return next({ name: 'login' })
  next()
}

export function setPageTitleMiddleware (to, from, next) {
  const pageTitle = to.matched.find(item => item.meta.title)

  if (pageTitle) window.document.title = pageTitle.meta.title
  next()
}
