<template>
	<div class="loginPage">
        <div v-if="isLoign == true" class="loginContainer">
            <input type="text" v-model="loginUsername" placeholder="username">
            <input type="password" v-model="loginPassword" placeholder="password">
            <button class="loginBtn" @click="login">login</button>
        </div>
        <div v-if="isLoign == false" class="signupContainer">
            <input type="text" v-model="signupUsername" placeholder="username">
            <input type="text" v-model="signupEmail" placeholder="email">
            <input type="password" v-model="signupPassword" placeholder="password">
            <button class="loginBtn" @click="signUp">singup</button>
        </div>
        <button class="toggleLogin" @click="setLoginState">{{ isLoign == true ? 'Want to signup?': 'Want to login?' }}</button>
        <ErrorCom :error-message="errorMessage"></ErrorCom>
    </div>
</template>
<script setup>
import { useGlStore } from '../stores/glStore';
const glStore = useGlStore()
const isLoign = computed(() => glStore.isLogin)
const loginUsername = ref('')
const loginPassword = ref('')
const signupUsername = ref('')
const signupEmail = ref('')
const signupPassword = ref('')
const errorMessage = ref('')
const authCookie = useCookie('authCookie', {
    default: () => ([]),
  sameSite: 'none', 
  secure: true, // change to true in prod
  httpOnly: false,
  watch: true,
  maxAge: 86400, // 24h 
})
function checkLoginvaild(){
    if(loginUsername.value == ""){
        errorMessage.value = "username missing"
        return false
    }
    if(loginPassword.value == ""){
        errorMessage.value = "password missing"
        return false
    }
    return true
}
function checksignUpvaild(){
    if(signupUsername.value == ""){
        errorMessage.value = "username missing"
        return false
    }
    if(signupEmail.value == ""){
        errorMessage.value = "email missing"
        return false
    }
    if(signupPassword.value == ""){
        errorMessage.value = "password missing"
        return false
    }
    if(signupPassword.value.length <= 8){
        errorMessage.value = "password must be 8 characters or greater"
        return false
    }
    return true
}
async function login(){
    if(checkLoginvaild() == true){
    try{
    const loginInfo = await $fetch('http://localhost:8081/api/auth/signin', {
            method:"POST",
            body:{
                username: loginUsername.value,
                password: loginPassword.value
            }
        })
        authCookie.value = loginInfo
        navigateTo('/')
    } catch(err){
        console.log(err)
    }
    }
}
async function signUp(){
    if(checksignUpvaild() == true){
        try{
    const loginInfo = await $fetch('http://localhost:8081/api/auth/signup', {
            method:"POST",
            body:{
                username: signupUsername.value,
                email: signupEmail.value,
                password: signupPassword.value,
            }
        })
        isLoign.value = true
    } catch(err){
        console.log(err)
    }
    }
}
function setLoginState(){
if(isLoign.value == true){
    glStore.setLogin(false)
}else{
    glStore.setLogin(true)
}
}
</script>
<style lang="scss" scoped>
.loginPage{
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    position: relative;
}
.loginContainer{
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 50%;
    margin: 0 auto;
}
.signupContainer{
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 50%;
    margin: 0 auto;
}
button{
    background-color: var(--tertiaryBg);
    color: white;
    padding: 0.90rem 1rem 1rem 1rem;
    border-radius: var(--radiusMd);
    cursor: pointer;
}
</style>