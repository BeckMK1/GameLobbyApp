import { useCookie } from '#app'
export default defineNuxtRouteMiddleware((to, from) => {
    const authCookie = useCookie('authCookie')
    if (to.path !== '/login' && authCookie.value == null) {
        return navigateTo({ path: '/login' })
    }
  })
  