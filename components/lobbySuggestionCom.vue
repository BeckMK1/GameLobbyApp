<template>
	<div class="suggestContainer">
        <div class="suggestGame" v-for="suggestGame in suggestGames">
            <h3>{{ suggestGame.gameTitle }}</h3>
            <div class="suggest" v-for="game in suggestGame.games">
                <div class="suggest-rank"><RankIconCom :lobby-game="suggestGame.gameTitle" :lobby-rank="game.rank"></RankIconCom></div>
                <div class="suggest-info">
                    <p>Leader: {{game.leader}}</p>
                    <p>party: {{game.currentParty}} / {{ game.maxParty }}</p>
                    <p>status: {{ game.status }}</p>
                </div>
                <div class="suggest-winLose">
                    <p>W - {{game.wins}} L - {{ game.loses }}</p>
                    <NuxtLink :to="game.lobbyLink"><font-awesome-icon icon="fa-solid fa-arrow-right" /></NuxtLink>
                </div>
            </div>
        </div>        
    </div>
</template>
<script setup>
const suggestGames = ref([
    {
        gameTitle: 'Dota 2',
        games: [
            {
                rank:'Archon2',
                leader: 'Beck',
                currentParty:'2',
                maxParty:'5',
                status:'idel',
                wins:'1',
                loses:'1',
                lobbyLink:'#'
            }
        ]
    },
    {
        gameTitle: 'CS 2',
        games: [
            {
                rank:'Silver',
                leader: 'Beck',
                currentParty:'2',
                maxParty:'5',
                status:'idel',
                wins:'1',
                loses:'1',
                lobbyLink:'#'
            }
        ]
    },

])
</script>
<style lang="scss" scoped>
    .suggestContainer{
        background-color: var(--secondaryBg);
        padding: 1rem;
        border-radius: var(--radiusMd);
        display: flex;
        flex-direction: column;
        gap: 1rem;
        .suggestGame{
            h3{
                margin-bottom: 1rem;
            }
        }
        .suggest{
            border-radius: var(--radiusMd);
            background-color: var(--tertiaryBg);
            display: grid;
            grid-template-columns:repeat(12, 1fr);
            padding: 1rem;
            gap: 1rem;
            &-rank{
                grid-column: 1/4;
                display: flex;
                justify-content: center;
                align-self: center;
                width: 100%;
                height: 100%;
            }
            &-info{
                grid-column: 4/8;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
            }
            &-winLose{
                grid-column: 8/13;
                justify-self: end;
                display: flex;
                flex-direction: column;
                align-items: flex-end;
                justify-content: space-between;
                svg{
                    width: 33px;
                    height: auto;
                }
            }
        }

    }
</style>