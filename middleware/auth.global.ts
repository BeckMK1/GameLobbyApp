import { useCookie } from '#app'
export default defineNuxtRouteMiddleware((to, from) => {
    const nuxtApp = useNuxtApp()
    const authCookie = useCookie('authCookie')
    if (to.path !== '/login' && authCookie.value == null) {
          return nuxtApp.runWithContext(() => navigateTo('/login'))  
    }
  })
  