import { useCookie } from '#app'
export default defineNuxtRouteMiddleware((to, from) => {
    const nuxtApp = useNuxtApp()
    const authCookie = useCookie('authCookie', {
      default: () => ([]),
      sameSite: 'none', 
      secure: true, // change to true in prod
      httpOnly: false,
      watch: true,
      maxAge: 86400, // 24h 
    })
    if (to.path !== '/landingpage' && authCookie.value.length === 0 && to.path !== '/login') {
          return nuxtApp.runWithContext(() => navigateTo('/landingpage'))  
    }
  })
  