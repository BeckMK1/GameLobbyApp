import { useCookie } from '#app'
export default defineNuxtRouteMiddleware((to, from) => {
    const nuxtApp = useNuxtApp()
    const authCookie = useCookie('authCookie', {
      default: () => (null),
      sameSite: 'none', 
      secure: true, // change to true in prod
      httpOnly: false,
      watch: true,
      maxAge: 86400, // 24h 
    })
    if (to.path !== '/login' && authCookie.value == null) {
          return nuxtApp.runWithContext(() => navigateTo('/login'))  
    }
  })
  