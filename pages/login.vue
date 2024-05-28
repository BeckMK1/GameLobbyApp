<template>
	<div>
        <div v-if="isLoign == true" class="loginContainer">
            <input type="text" v-model="loginUsername" placeholder="username">
            <input type="password" v-model="loginPassword" placeholder="password">
            <button class="loginBtn" @click="login">login</button>
        </div>
        <div v-if="isLoign == false" class="signupContainer">
            <input type="text" v-model="signupUsername" placeholder="username">
            <input type="text" v-model="signupEmail" placeholder="email">
            <input type="password" v-model="signupPassword" placeholder="password">
            <button class="loginBtn">singup</button>
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
const loggedinUser = ref([])
const userInfo = useCookie(
        'userInfo',
        {
            default: () => ({}),
            watch: true,
            maxAge:86400,
        }
    )
async function login(){
    const { data:loginInfo, pending, error, refresh } = await useFetch('http://localhost:8080/api/auth/signin', {
            method:"POST",
            body:{
                username: loginUsername.value,
                password: loginPassword.value
            }
        })
        loggedinUser.value = loginInfo._rawValue
        userInfo.value = {
            username:userData.value.username,
            token:userData.value.accessToken,
            id:userData.value.id,
            inLobby:userData.value.inLobby
        } 
    }
</script>
<style lang="scss" scoped>
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
    padding: 0.3rem 1rem 0.5rem 1rem;
    border-radius: var(--radius);
}
</style>