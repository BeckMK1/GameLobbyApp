<template>
	<div class="defaultLayout">
        <nav v-show="authCookie != null">
            <div class="navLinks">
                <NuxtLink v-for="(navLink, index) in navlinks" 
                :style="currentRoute == '/' + navLink.link && index != 0 ? { top: 32 + ((68 + 16) * index) + 'px' } : {top: 'unset'}" 
                :to="'/' + navLink.link"><font-awesome-icon :icon="navLink.icon" /></NuxtLink>
            </div>
            <div class="logoutBtn" @click="logout"><font-awesome-icon icon="fa-solid fa-right-from-bracket" /></div>
        </nav>
        <slot></slot>
    </div>
</template>
<script setup>
    const route = useRoute()
    const currentRoute = computed(()=> route.path)
    const authCookie = useCookie('authCookie')
    const navlinks = ref([
        {
            link:'',
            icon:"fa-solid fa-house"
        },
        {
            link:'lobbies',
            icon:"fa-solid fa-gamepad"
        },
        {
            link:'createLobby',
            icon:"fa-solid fa-plus"
        },
        {
            link:'settings',
            icon:"fa-solid fa-gear"
        },
        {
            link:'profile',
            icon:"fa-solid fa-user"
        },
    ])
    function logout(){
        authCookie.value = null
            navigateTo('/login')
    }
</script>
<style lang="scss" scoped>
    .defaultLayout{
        display: grid;
        grid-template-columns: 100px 1fr;
        gap: 2rem;
        padding-right: 2rem;
        max-height: 100vh;
        &:has(.lobbyPage){
            gap: 0;
            padding-right: 0;
        }
    }
    .logoutBtn{
        width: 68px;
        height: 68px;
        background-color: var(--tertiaryBg);
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 100%;
        margin: 0 auto;
        cursor: pointer;
        svg{
            width: 30px;
            height: auto;
        }
    }
    nav{
        height: 100vh;
        width: 100px;
        background-color: var(--secondaryBg);
        position: relative;
        z-index: 2;
        .navLinks{
            padding: 1rem;
            padding-top: 2rem;
            display: flex;
            flex-direction: column;
            gap: 1rem;
            position: relative;
            a{
                width: 100%;
                height: 68px;
                background-color: var(--tertiaryBg);
                display: flex;
                justify-content: center;
                align-items: center;
                border-radius: 100%;
                transition: border-radius 250ms;
                svg{
                    height: 30px;
                }
                &.router-link-active{
                    position: absolute;
                    border-top-right-radius: 0;
                    border-bottom-right-radius: 0;
                    border-top-left-radius: 3rem;
                    border-bottom-left-radius: 3rem;
                    width: calc(100% - 1rem);
                    justify-content: start;
                    svg{
                        margin-left: 17px;
                    }
                }
            }
            .router-link-active + a{
                    margin-top:calc(68px + 1rem);
                }
        }
    }
</style>