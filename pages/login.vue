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
        <button class="toggleLogin" @click="isLoign = !isLoign">{{ isLoign == true ? 'Want to signup?': 'Want to login?' }}</button>
    </div>
</template>
<script setup>
const isLoign = ref(true)
const loginUsername = ref('')
const loginPassword = ref('')
const signupUsername = ref('')
const signupEmail = ref('')
const signupPassword = ref('')
const authCookie = useCookie('authCookie')
async function login(){
    const loginInfo = await $fetch('http://localhost:8081/api/auth/signin', {
            method:"POST",
            body:{
                username: loginUsername.value,
                password: loginPassword.value
            }
        })
        authCookie.value = loginInfo
        navigateTo('/')
}
async function signUp(){
    const loginInfo = await $fetch('http://localhost:8081/api/auth/signup', {
            method:"POST",
            body:{
                username: signupUsername.value,
                email: signupEmail.value,
                password: signupPassword.value,
            }
        })
        isLoign.value = true
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