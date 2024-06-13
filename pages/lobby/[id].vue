<template>
	<div class="currentLobby">
        <div class="lobbyHeader">
            <h2>{{currentLobby.name}}</h2>
            <p @click="leaveLobby">Leave</p>
        </div>
        <div class="lobbyInfo" v-if="leader == false">
            <h2>Lobby info</h2>
            <p class="inActiveInput">{{ currentLobby.status }}</p>
            <p class="inActiveInput">{{ currentLobby.mode }}</p>
            <label>Tags</label>
            <div class="tags"><div class="tag tagDark" v-for="tag in currentLobby.tags">{{ tag }}</div></div>
            <label>Links</label>
            <div class="links"><div v-for="link in currentLobby.links" class="link">{{ link }}</div></div>
            <div class="inActiveTextarea">{{ currentLobby.about }}</div>
        </div>
        <div class="lobbyInfo" v-if="leader == true">
            <h2>Lobby info</h2>
            <select v-model="currentLobby.status">
                <option value="in game">in game</option>
                <option value="idle">idle</option>
            </select>
            <select v-model="currentLobby.mode">
                <option value="ranked">ranked</option>
                <option value="unranked">unranked</option>
            </select>
            <label>Tags</label>
            <div class="linkInput">
				<input type="text" v-model="newTag" placeholder="Tag">
				<div class="addBtn" @click="currentLobby.tags.push(newTag)"><font-awesome-icon icon="fa-solid fa-plus" /></div>
			</div>
            <div class="tags"><div class="tag tagDark" v-for="tag in currentLobby.tags">{{ tag }}</div></div>
            <label>Links</label>
            <div class="linkInput">
				<input type="text" v-model="newLink" placeholder="Link">
				<div class="addBtn" @click="currentLobby.links.push(newTag)"><font-awesome-icon icon="fa-solid fa-plus" /></div>
			</div>
            <div class="links"><div v-for="link in currentLobby.links" class="link">{{ link }}</div></div>
            <div class="inActiveTextarea">{{ currentLobby.about }}</div>
            <button @click="saveUserInfo">save</button>
        </div>
        <div class="players">
            <h2>Players</h2>
            <LobbypagePlayerCom :isLeader="leader" v-for="player in currentLobby.players"  :playerData="player" :game="lobby.game"></LobbypagePlayerCom>
        </div>
    </div>
</template>
<script setup>
    import { useGlStore } from '../stores/glStore';
    const glStore = useGlStore()
    const authCookie = useCookie('authCookie', {
    default: () => ([]),
    sameSite: 'none', 
    secure: true, // change to true in prod
    httpOnly: false,
    watch: true,
    maxAge: 86400, // 24h 
    })
   const route = useRoute()
   const leader = ref(false)
   const newLink = ref("")
   const newTag = ref("")
   const currentLobby = ref({})
const { data:lobby, pending, status, error, refresh } = await useFetch(`https://gamelobbyapp-api.onrender.com/api/test/lobbyMy/${route.params.id}`, {
            method:'GET',
            lazy:true,
})
async function saveUserInfo(){
    const userInfo = await $fetch(`https://gamelobbyapp-api.onrender.com/api/test/updateLobbyInfo/${route.params.id}`,{
            method:"PATCH",
			headers:{
                'x-access-token': glStore.user.userData.accessToken
            },
            body:{
                status:currentLobby.value.status,
                mode:currentLobby.value.mode,
                tags:currentLobby.value.tags,
                links:currentLobby.value.links,
                about:currentLobby.value.about
            }
    })
}
function isLeader(){
    lobby._rawValue.players.forEach(player => {
        if(player.id == glStore.user.userData.id && player.role == 'leader'){
            leader.value = true
        }
    });
}
async function leaveLobby(){
    try{
    const userInfo = await $fetch(`https://gamelobbyapp-api.onrender.com/api/test/lobbyLeave/${route.params.id}`,{
            method:"PATCH",
			headers:{
                'x-access-token': glStore.user.accessToken
            },
            body:{
				id: glStore.user.userData.userData.id,
            }
    })
    authCookie.value.inLobby = ""
    navigateTo('/lobbies')
    } catch(err){
        console.log(err)
    }
}
watch(lobby, async()=>{
    if(lobby._rawValue != null){
        currentLobby.value = lobby._rawValue
        isLeader()
    }
})
</script>
<style lang="scss" scoped>
.currentLobby{
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: 50px 1fr;
    gap: 2rem;
    padding: 2rem 0;
    max-height: inherit;
    box-sizing: border-box;
    h2{
        grid-column: span 12;
        text-align: center;
    }
}
.lobbyHeader{
    display: flex;
    justify-content: space-between;
    align-items: center;
    grid-column: 6/12;
    p{
        color: hsl(0, 70%, 50%);
        font-weight: bold;
        cursor: pointer;
        transition: 250ms;
        &:hover{
            transform: scale(1.1);
        }
    }
}
.lobbyInfo{
    grid-column: span 12;
    background-color: var(--secondaryBg);
    box-sizing: border-box;
    padding: 2rem 5rem;
    border-radius: var(--radiusMd);
    display:flex;
    flex-direction: column;
    gap: 1rem;
    overflow-y: scroll;
    max-height: 100%;
    label{
        font-size: var(--fontMd);
        margin-top: 0.5rem;
    }
    .inActiveInput{
        width: 100%;
        background-color: var(--tertiaryBg);
        height: fit-content;
        padding: 1rem;
        border-radius: var(--radiusMd);
    }
    .tags{
        width: 100%;
        padding: 1rem;
        background-color: var(--tertiaryBg);
        height: 100px;
        border-radius: var(--radiusMd);
        box-sizing: border-box;
    }
    .links{
        width: 100%;
        padding: 1rem;
        background-color: var(--tertiaryBg);
        height: 100px;
        border-radius: var(--radiusMd);
        box-sizing: border-box;
    }
    .inActiveTextarea{
        width: 100%;
        padding: 1rem;
        background-color: var(--tertiaryBg);
        height: 100px;
        border-radius: var(--radiusMd);
        box-sizing: border-box;
    }
}
.players{
    grid-column: span 12;
    background-color: var(--secondaryBg);
    box-sizing: border-box;
    padding: 2rem;
    gap: 1rem;
    display: flex;
    flex-direction: column;
    border-radius: var(--radiusMd);
    overflow-y: scroll;
    box-sizing: border-box;
    max-height: 100%;
    h2{
        text-align: center;
    }
}
    @media(min-width: 1550px){
        .players{
            grid-column: 5/13;
        }
        .lobbyInfo{
            grid-column: 1/5;
        }
    }
.linkInput{
    position: relative;
    
    input{
        width: 100%;
		box-sizing: border-box;
    }
}
button{
		grid-column: span 12;
		width: fit-content;
		justify-self: center;
		height: fit-content;
		align-self: center;
		background-color: var(--tertiaryBg);
		padding: 1rem 2rem;
		font-size: var(--fontMd);
		font-weight: 600;
		border-radius: var(--radiusXl);
		cursor: pointer;
	}
</style>