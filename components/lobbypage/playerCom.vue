<template>
    <div class="player" :style="[playerData.role == 'leader'? {border:'solid 1px orange'}: playerData.id == glStore.userData.id ? {border:'solid 1px white'}: '']">
        <div class="player-info">
            <RankIconCom :lobby-game="game" :lobby-rank="playerData.rank"></RankIconCom>
            <div class="names">
                {{ playerData.username }}
            </div>
        </div>
        <div class="player-tags">
            <div class="tag" v-for="tag in playerData.tags">{{ tag }}</div>
        </div>
        <div class="player-links">
            <div class="link" v-for="link in playerLinks"><LinkConverterCom :link="link"></LinkConverterCom></div>
        </div>
    </div>
</template>
<script setup>
const props = defineProps({
    playerData:{
        default:{},
        type:Object
    },
    game:String
})
import { useGlStore } from '../../stores/glStore';
    const glStore = useGlStore()   
const playerLinks = ref([])
const specialLinks = ref([
    "discord",
    "dotabuff"
])
setPlayerLinks()
function setPlayerLinks(){
    if(playerLinks.value.length < 3)
    playerLinks.value = props.playerData.links.filter(link => specialLinks.value.some(specialLink => link.includes(specialLink)))
}
</script>
<style lang="scss" scoped>
        .player{
            display: grid;
            grid-template-columns: repeat(12, 1fr);
            grid-auto-rows: 100px;
            background-color: var(--tertiaryBg);
            border-radius: var(--radiusMd);
            padding: 1rem;
            gap: 2rem;
        &-info{
            grid-column: 1/4;
            display: grid;
            grid-template-columns: 1fr 1fr;
            height: 100%;
            gap: 1rem;
            .names{
                display: flex;
                flex-direction: column;
                gap: 1rem;
            }
        }
        &-tags{
            grid-column: 4/8;
            background-color: var(--secondaryBg);
            border-radius: var(--radiusMd);
            padding: 0.5rem;
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
            .tag{
                padding: 0.25rem 0.75rem 0.5rem 0.75rem;
                background-color: var(--tertiaryBg);
                width: fit-content;
                border-radius: var(--radiusLg);
                height: fit-content;
            }
        }
        &-links{
            grid-column: 10/12;
            height: 100%;
            justify-self: end;
            display: flex;
            flex-direction: column;
            gap:1rem;
            flex-wrap: wrap;
            align-items:flex-start;
 
        }
        }
</style>