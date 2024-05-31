<template>
    <div class="player" v-for="player in playerData">
        <div class="player-info">
            <RankIconCom :lobby-game="game" :lobby-rank="player.rank"></RankIconCom>
            <div class="names">
                {{ player.username }}
            </div>
        </div>
        <div class="player-tags">
            <div class="tag" v-for="tag in player.tags">{{ tag }}</div>
        </div>
        <div class="player-links"></div>
    </div>
</template>
<script setup>
const porps = defineProps({
    playerData:Object,
    game:String
})
   

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
        }
        }
</style>