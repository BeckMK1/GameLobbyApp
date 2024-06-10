<template>
	<div class="defaultLayout">
        <nav v-show="authCookie.length != 0">
            <div class="navLinks">
                <NuxtLink v-for="(navLink, index) in navlinks" 
                :style="currentRoute == '/' + navLink.link && index != 0 ? { top: 32 + ((navLinkSize + 16) * index) + 'px' } : {top: 'unset'}" 
                :to="'/' + navLink.link"><font-awesome-icon :icon="navLink.icon" /></NuxtLink>
            </div>
            <div class="logoutBtn" @click="logout"><font-awesome-icon icon="fa-solid fa-right-from-bracket" /></div>
        </nav>
        <slot></slot>
    </div>
</template>
<script setup>
    const route = useRoute()
    import { useGlStore } from '../stores/glStore';
    const glStore = useGlStore()
    const changeInUser = computed(()=> glStore.userData)
    const navLinkSize = ref(68)
    const currentRoute = computed(()=> route.path)
    const authCookie = useCookie('authCookie', {
        default: () => (null),
        sameSite: 'none', 
        secure: true, // change to true in prod
        httpOnly: false,
        watch: true,
        maxAge: 86400, // 24h 
        })
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
        authCookie.value = []
            navigateTo('/login')
    }
    checkInLobby()
    function checkInLobby(){
        if(Object.keys(glStore.userData).length != 0){
            navlinks.value.forEach((link)=>{
                if(glStore.userData.inLobby != ''){
                    if(link.link == 'createLobby'){
                        link.link = `lobby/${glStore.userData.inLobby}`
                        link.icon = "fa-solid fa-dungeon"
                    }
                } else{
                    if(link.link.includes("lobby/")){
                        link.link = "createLobby"
                        link.icon = "fa-solid fa-plus"
                    }
                }
            })
        }
    }
    function changeNavBareSize(){
        if (window.matchMedia("(min-width: 1550px)").matches) {
                navLinkSize.value = 68
        }else{
             navLinkSize.value = 40
        }
    }
    onMounted(() => {
    changeNavBareSize()
    window.addEventListener("resize", changeNavBareSize)
    })
    watch(changeInUser, async ()=>{
        checkInLobby()
    })
</script>
<style lang="scss" scoped>
    .defaultLayout{
        display: grid;
        grid-template-columns: 70px 1fr;
        gap: 1rem;
        padding-right: 2rem;
        max-height: 100vh;
        overflow-y: hidden;
        @media(min-width: 1550px){
            grid-template-columns: 100px 1fr;
            gap: 2rem;
		}
        &:has(.lobbyPage){
            gap: 0;
            padding-right: 0;
        }
    }
    .logoutBtn{
        width: 40px;
        height: 40px;
        background-color: var(--tertiaryBg);
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 100%;
        margin: 0 auto;
        cursor: pointer;
        @media(min-width: 1550px){
            width: 68px;
            height: 68px;
		}
        svg{
            @media(min-width: 1550px){
                width: 30px;
            }
            width: 15px;
            height: auto;
        }
    }
    nav{
        height: 100vh;
        width: 70px;
        background-color: var(--secondaryBg);
        position: relative;
        z-index: 2;
        @media(min-width: 1550px){
            width: 100px;
        }
        .navLinks{
            padding: 1rem;
            padding-top: 2rem;
            display: flex;
            flex-direction: column;
            gap: 1rem;
            position: relative;
            a{
                width: 40px;
                height: 40px;
                background-color: var(--tertiaryBg);
                display: flex;
                justify-content: center;
                align-items: center;
                border-radius: 100%;
                transition: border-radius 250ms;
                @media(min-width: 1550px){
                    width: 100%;
                    height: 68px;
                }
                svg{
                    height: 15px;
                    @media(min-width: 1550px){
                    height: 30px;
                    }
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
                margin-top:calc(40px + 1rem);
                @media(min-width: 1550px){
                    margin-top:calc(68px + 1rem);
                    }
                }
        }
    }
</style>