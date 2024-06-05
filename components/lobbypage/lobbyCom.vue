<template>
     <div class="lobbiesContainer">
        <div class="lobby" v-if="filteredLobbies.length == 0" v-for="lobby of lobbies" @click="currentLobby.push(lobby)">
            <h3>{{ lobby.name }}</h3>
            <div class="lobby-content">
                <div class="rankIcon">
                    <RankIconCom :lobby-game="lobby.game" :lobby-rank="lobby.rank"></RankIconCom>
                </div>
                <div class="info">
                    <div v-for="player in lobby.players" v-show="player.role == 'leader'">
                        leader: {{  player.username }}
                    </div>
                    <p></p>
                    <p>Party: {{ lobby.players.length }} / {{ lobby.maxPlayers  }}</p>
                    <p>Win / lose: {{ lobby.wins }} - {{  lobby.lose }}</p>
                    <p>Status: {{ lobby.stauts }}</p>
                    <p>BH score: {{ lobby.behaviorScore }}</p>
                </div>
            </div>
            <div class="lobby-tags">
                <div class="tag" v-for="tag in lobby.tags">{{ tag }}</div>
            </div>
        </div>
        <div class="lobby filtered" v-if="filteredLobbies.length != 0" v-for="lobby of filteredLobbies" @click="currentLobby.push(lobby)">
            <h3>{{ lobby.name }}</h3>
            <div class="lobby-content">
                <div class="rankIcon">
                    <RankIconCom :lobby-game="lobby.game" :lobby-rank="lobby.rank"></RankIconCom>
                </div>
                <div class="info">
                    <div v-for="player in lobby.players" v-show="player.role == 'leader'">
                        leader: {{  player.username }}
                    </div>
                    <p></p>
                    <p>Party: {{ lobby.players.length }} / {{ lobby.maxPlayers  }}</p>
                    <p>Win / lose: {{ lobby.wins }} - {{  lobby.lose }}</p>
                    <p>Status: {{ lobby.stauts }}</p>
                    <p>BH score: {{ lobby.behaviorScore }}</p>
                </div>
            </div>
            <div class="lobby-tags">
                <div class="tag" v-for="tag in lobby.tags">{{ tag }}</div>
            </div>
        </div>
        <Teleport to="body">
            <div class="modalContainer" v-show="modelOpen">
                <div class="modalBG" @click="currentLobby.pop()"></div>
                <LobbypageLobbyModalCom v-if="currentLobby.length != 0" v-show="modelOpen" :lobby-data="currentLobby"></LobbypageLobbyModalCom>
            </div>
        </Teleport>
   </div>
</template>
<script setup>
const porps = defineProps({
    filteredLobbies:{
        default:[],
        type:Array
    }
})
const currentLobby = ref([])
const modelOpen = ref(false)
const { data:lobbies, pending, status, error, refresh } = await useFetch('http://localhost:8081/api/test/lobby', {
            method:'GET',
            lazy:true,
})
watch(currentLobby.value, async () =>{
        if(currentLobby.value.length == 0){
            modelOpen.value = false
        }else{
            modelOpen.value = true
        }
})
</script>
<style lang="scss" scoped>
.lobbiesContainer{
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    padding: 2rem 0;
    gap:2rem;
}
.modalContainer{
    position: absolute;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    .modalBG{
        z-index:10;
        backdrop-filter: blur(3px);
        cursor: pointer;
        background-color: hsla(0,0%,0%,0.5);
        width: 100%;
        height: 100%;
        position: absolute;
    }
}
    .lobby{
        background-color: var(--tertiaryBg);
        padding: 1rem 2rem;
        border-radius: var(--radiusMd);
        transition: 250ms;
        box-sizing: border-box;
        cursor: pointer;
        &:hover{
            background-color: var(--secondaryBg);
        }
        h3{
            text-align: center;
            margin-bottom: 0.5rem;
        }
        &-content{
            display: grid;
            grid-template-columns: repeat(12, 1fr);
            gap: 1rem;
            .rankIcon{
                grid-column: 1/4;
            }
            .info{
                grid-column: 4/13;
                display: grid;
                grid-template-rows: 1fr 1fr 1fr;
                grid-template-columns: repeat(2, fit-content(100%));
                gap: 0 1rem;
                p:first-child{
                    grid-column: span 2;
                }
                p{
                    grid-row: span 1;
                }
            }
        }
        &-tags{
            display: flex;
            gap: 0.5rem;
            margin-top: 0.5rem;
            .tag{
                background-color: var(--primaryBg);
                padding: 0.25rem 0.75rem;
                padding-bottom: 0.45rem;
                border-radius: var(--radiusMd);
            }
        }
    }
</style>