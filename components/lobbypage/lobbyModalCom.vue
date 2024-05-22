<template>
    <div class="currentModal">
        <div class="modal" v-for="data in lobbyData">
            <h3>{{ data.name }}</h3>
            <div class="modal-info">
                <div class="info">
                    <RankIconCom :lobby-game="data.game" :lobby-rank="data.rank"></RankIconCom>
                    <div class="state">
                        <p>Status: {{ data.stauts }}</p>
                        <p>BH score: {{ data.behaviorScore }}</p>
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
            <NuxtLink :to="{name:'lobby-id', params: {id:data.lobbyId}}" class="btn">Join</NuxtLink>
            <div class="modal-players">
                <LobbypagePlayerCom :players="data.players" :game="data.game"></LobbypagePlayerCom>
            </div>
        </div>
    </div>
</template>
<script setup>
const porps = defineProps({
    lobbyData:Array
})
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
            .tag{
                padding: 0.25rem 0.75rem 0.5rem 0.75rem;
                background-color: var(--tertiaryBg);
                height: fit-content;
                width: fit-content;
                border-radius: var(--radiusMd);
            }
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