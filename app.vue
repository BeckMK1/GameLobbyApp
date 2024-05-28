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
  const userInfo = useCookie(
        'userInfo',
        {
            default: () => ({}),
            watch: true,
            maxAge:86400,
        }
    )
watch(userInfo, async (newValue, oldValue) =>{
  if(oldValue != newValue){
    glStore.setUserData(userInfo.value)
  }
})
</script>
<style lang="scss"></style>