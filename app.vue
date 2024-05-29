<template>
  <div id="app">
    <NuxtLayout>
      <NuxtPage></NuxtPage>
    </NuxtLayout>
  </div>
</template>
<script setup>
import { useGlStore } from './stores/glStore';
const glStore = useGlStore()
  useHead({
    bodyAttrs:{
      dataTheme:'dark',
      dataFont:'normal'
      
    }
  })
const authCookie = useCookie('authCookie', {
  default: () => (null),
  sameSite: 'none', 
  secure: true, // change to true in prod
  httpOnly: false,
  watch: true,
  maxAge: 86400, // 24 
})

glStore.setUserData(authCookie.value)
watch(authCookie, async (newValue, oldValue) =>{
  if(oldValue != newValue){
    glStore.setUserData(authCookie.value)
  }
})
</script>
<style lang="scss"></style>