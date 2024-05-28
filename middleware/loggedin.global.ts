import { useGlStore } from "~/stores/glStore"
export default defineNuxtRouteMiddleware((to, from) => {
    const glStore = useGlStore()
    if (to.path === '/login' && Object.keys(glStore.userData).length != 0) {
      return abortNavigation()
    }
    // In a real app you would probably not redirect every route to `/`
    // however it is important to check `to.path` before redirecting or you
    // might get an infinite redirect loop
    if (to.path !== '/login' && Object.keys(glStore.userData).length == 0) {
      return navigateTo('/login')
    }
  })
  