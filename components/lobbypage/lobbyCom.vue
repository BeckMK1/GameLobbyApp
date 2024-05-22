<template>
     <div class="lobbiesContainer">
        <div class="lobby" v-for="lobby of lobbies" @click="currentLobby.push(lobby)">
            <h3>{{ lobby.name }}</h3>
            <div class="lobby-content">
                <div class="rankIcon">
                    <RankIconCom :lobby-game="lobby.game" :lobby-rank="lobby.rank"></RankIconCom>
                </div>
                <div class="info">
                    <p>Leader: {{ lobby.leader }}</p>
                    <p>Party: {{ lobby.currentParty }} / {{ lobby.maxParty  }}</p>
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
            <div class="modalContainer"  v-show="modelOpen" @click="currentLobby.pop()">
                <div class="modalBG"></div>
                <LobbypageLobbyModalCom v-show="modelOpen" :lobby-data="currentLobby"></LobbypageLobbyModalCom>
            </div>
        </Teleport>
   </div>
</template>
<script setup>
const currentLobby = ref([])
const modelOpen = ref(false)
const lobbies = ref([
    {
        lobbyId:'1',
        game: 'Dota 2',
        name:'lobby name',
        rank: 'Archon2',
        leader:'user',
        currentParty: '3',
        maxParty:'5',
        wins:'1',
        lose:'1',
        stauts:'idle',
        behaviorScore: 12000,
        tags:[
            'eu',
            'ranked'
        ],
        about:'placeholder text',
        players:[
            {
                name:'beck',
                ign:'beckMK',
                rank:'Archon2',
                tags:[
                    'pos 3'
                ]
            },
            {
                name:'simon',
                ign:'simon',
                rank:'Archon2',
                tags:[
                    'pos 4'
                ]
            }
        ]
    },
    {
        lobbyId:'2',
        game: 'Dota 2',
        name:'lobby name',
        rank: 'Archon2',
        leader:'user',
        currentParty: '3',
        maxParty:'5',
        wins:'1',
        lose:'1',
        stauts:'idle',
        behaviorScore: 12000,
        tags:[
            'eu',
            'ranked'
        ],
        about:'placeholder text',
        players:[
            {
                name:'beck',
                ing:'beckMK',
                rank:'Archon2',
                tags:[
                    'pos 3'
                ]
            }
        ]
    }
])
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