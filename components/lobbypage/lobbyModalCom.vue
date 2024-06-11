<template>
    <div class="currentModal">
        <div class="modal" v-for="data in lobbyData">
            <h3>{{ data.name }}</h3>
            <div class="modal-info">
                <div class="info">
                    <RankIconCom :lobby-game="data.game" :lobby-rank="data.rank"></RankIconCom>
                    <div class="state">
                        <p>Status: {{ data.status }}</p>
                    </div>
                </div>
                <div class="tags">
                    <div class="tag" v-for="tag in data.tags">{{ tag }}</div>
                </div>
                <div class="about">
                    <p v-if="data.about != ''">{{ data.about }}</p>
                    <p v-else>About Lobby</p>
                </div>
            </div>
            <div class="btn" v-if="glStore.userData.inLobby == '' && canJoin == true" @click="joinLobby(data._id)">Join</div>
            <div class="noGameProfile" v-if="canJoin == false">
               <p>Game profile missing</p> 
                <NuxtLink to="/settings">make a game profile here</NuxtLink>
            </div>
            <div class="modal-players">
                <LobbypagePlayerCom v-for="player in data.players" :playerData="player" :game="data.game"></LobbypagePlayerCom>
            </div>
        </div>
    </div>
</template>
<script setup>
import { useGlStore } from '../../stores/glStore';
const glStore = useGlStore()
const authCookie = useCookie('authCookie', {
  default: () => (null),
  sameSite: 'none', 
  secure: true, // change to true in prod
  httpOnly: false,
  watch: true,
  maxAge: 86400, // 24h 
})
const player = ref({})
const currentPlaySettings = ref({})
const playerTags = ref([])
const canJoin = ref(false)
const porps = defineProps({
    lobbyData:Array
})
function setCurrentPlayerSettings(){
	if(glStore.userData.gameSettings.length == 0){
        canJoin.value = false
        return
    }
    canJoin.value = glStore.userData.gameSettings.some(setting => setting.game == glStore.selectedGame)
    if( canJoin.value == true){
	glStore.userData.gameSettings.forEach((setting) =>{
        if(setting.game == glStore.selectedGame){
                    currentPlaySettings.value = setting
                    playerTags.value = glStore.userData.tags.concat(setting.tags)
                    let currentPlayer = {
                        username: glStore.userData.username,
                        id: glStore.userData.id,
                        tags: playerTags.value,
                        links: glStore.userData.links,
                        gameSettings: currentPlaySettings.value,
                        rank:setting.rank
                    }
                    player.value = currentPlayer
        }
	})
    }
}
setCurrentPlayerSettings()
async function joinLobby(lobbyId){
    try{
    const lobbyInfo = await $fetch(`http://localhost:8081/api/test/lobbyJoin/${lobbyId}`,{
            method:"PATCH",
			headers:{
                'x-access-token': glStore.userData.accessToken
            },
            body:{
                id: glStore.userData.id,
                player: player.value
            }
    })
    authCookie.value.inLobby = lobbyInfo.id
    navigateTo(`lobby/${lobbyInfo.id}`)
    } catch(err){
        console.log(err)
    }
}
</script>
<style lang="scss" scoped>
.currentModal{
    position: relative;
    z-index: 11;
    width: 70%;
    height: 70%;
}
.modal{
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    background-color: var(--secondaryBg);
    border-radius: var(--radiusMd);
    padding: 3rem 5rem;
    padding-bottom: 0;
    display: grid;
    grid-template-rows: repeat(12, 1fr);
    grid-template-columns: repeat(12, 1fr);
    gap: 2rem;
    h3{
        grid-row: 1/2;
        grid-column: span 12;
        justify-self: center;
        text-align: center;
    }
    &-info{
        grid-row: 2/6;
        grid-column: span 12;
        display: grid;
        grid-template-columns: repeat(12, 1fr);
        .info{
            display: grid;
            grid-template-rows: fit-content(100%);
            grid-column:1/3;
            p{
                font-size: var(--fontMd);
                font-weight: 600;
            }
            .raknIcon{
                width: 50%;
            }
        }
        .tags{
            grid-column: 5/9;
            justify-self: center; 
            background-color: var(--primaryBg);
            display: flex;
            gap:1rem;
            width: 100%;
            box-sizing: border-box;
            padding: 1rem;
            border-radius: var(--radiusMd);
            
        }
        .about{
            grid-column:  10/13;
            justify-self: center;
            background-color: var(--tertiaryBg);
            width: 100%;
            box-sizing: border-box;
            padding: 1rem;
            border-radius: var(--radiusMd);
            p{
                font-size: var(--fontSm);
                font-weight: 600;
            }
        }
    }
    .noGameProfile{
        grid-column: 5/9;
        text-align: center;
        p{
            font-weight: bold;
        }
    }
    .btn{
        grid-column: 6/8;
        justify-self: center;
        grid-row: 6/7;
        color:var(--primaryText);
        background-color: var(--tertiaryBg);
        padding: 0.75rem 2rem;
        font-size: var(--fontMd);
        font-weight: 600;
        border-radius: var(--radiusLg);
        cursor: pointer;
    }
    &-players{
        grid-row: 7/13;
        grid-column: 2/12;
        padding: 2rem;
        justify-self: center;
        background-color: var(--primaryBg);
        min-height: calc(100% - 4rem);
        border-top-left-radius: var(--radiusMd);
        border-top-right-radius: var(--radiusMd);
        display: flex;
        flex-direction: column;
        gap: 1rem;
        overflow-y: scroll;
    }
}
</style>