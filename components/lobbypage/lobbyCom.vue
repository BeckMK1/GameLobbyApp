<template>
	<div class="lobby" v-for="lobby of lobbies">
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
</template>
<script setup>
const lobbies = ref([
    {
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
        ]
    }
])
</script>
<style lang="scss" scoped>
    .lobby{
        background-color: var(--tertiaryBg);
        padding: 1rem 2rem;
        border-radius: var(--radiusMd);
        h3{
            text-align: center;
            margin-bottom: 0.5rem;
        }
        &-content{
            display: grid;
            grid-template-columns: repeat(12, 1fr);
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