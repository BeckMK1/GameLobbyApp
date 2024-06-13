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
  default: () => ([]),
  sameSite: 'none', 
  secure: true, // change to true in prod
  httpOnly: false,
  watch: true,
  maxAge: 86400, // 24h 
})
 async function getUser(){
  const data = await $fetch(`https://gamelobbyapp-api.onrender.com/api/test/getUser/${glStore.user.userData.id}`, {
					method:'GET',
					lazy:true,
					headers:{
						'x-access-token': glStore.user.accessToken
					}, 
		})
    authCookie.value.userData = data
}

glStore.setUserData(authCookie.value)
watch(authCookie, async (newValue, oldValue) =>{
  if(oldValue != newValue){
    glStore.setUserData(authCookie.value)
  }
})
if(Object.keys(authCookie.value).length != 0 ){
      getUser()
    }
function changeFont(){
  if (window.matchMedia("(min-width: 1550px)").matches) {
            useHead({bodyAttrs:{dataFont:'normal'}})
        }else{
          useHead({bodyAttrs:{dataFont:'small'}})
        }
}
onMounted(() => {
    window.addEventListener("resize", changeFont)
    })
</script>
<style lang="scss"></style>