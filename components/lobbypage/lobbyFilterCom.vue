<template>
	<div class="filter">
        <div class="filter-content" :style="{height:contentHight + 'px'}">
            <div ref="content" class="contnet-inner">
                <div class="filter-game">
                    <select v-model="game"><option value="" selected disabled hidden>Your Games</option><option v-for="game in games" :value="game">{{ game }}</option></select>
                    <select v-model="mode"><option value="" selected disabled hidden>Mode</option><option v-for="mode in modes" :value="mode">{{ mode }}</option></select>
                </div>
                <div class="filter-tags">
                    <h3>Most used tags</h3>
                    <div v-if="selectTags.length != 0" class="tag" v-for="tag in selectTags">
                    <label :for="tag">{{ tag }}</label>
                    <input :name="tag" :value="tag" type="checkbox" v-model="selectedTags">
                    </div>
                    <div v-else class="tagsPlaceholder">
                        <p class="tagsTitle">Not Tags found</p>
                        <p>Select a filter to see tags</p>
                    </div>
                </div>
                <div class="filter-search">
                    <select name="" id="" v-model="currentFilter"><option value="default" selected disabled hidden>Your filters</option> <option v-for="filter in glStore.user.userData.gameFilters" :value="filter">{{ filter.title }}</option></select>
                    <button class="searchBtn" @click="getLobbies">Search</button>
                </div>
            </div>
        </div>
        <div class="showBtn"><font-awesome-icon @click="open"  :class="contentHight != 0 ? 'open' : '' " icon="fa-solid fa-chevron-down" /></div>
    </div>
</template>
<script setup>
import { useGlStore } from '../../stores/glStore';
const glStore = useGlStore()
const emits = defineEmits(['sendFilterLobbies'])
const contentHight = ref(0)
const content = ref(null)
const game = ref("")
const mode = ref("")
const selectedTags = ref([])
const selectedFilter = ref({})
const lobbies = ref(null)
const currentFilter = ref('default')
function open(){
    if(contentHight.value == 0){
        contentHight.value = content.value.scrollHeight
        return 
    }
    contentHight.value = 0
}
const games = ref([
])
const modes = ref([
    "Ranked",
    "Unranked"
])
const selectTags = ref([
])
getLobbies()
async function getLobbies(){
    try{
    const sendFilter = await $fetch('https://gamelobbyapp-api.onrender.com/api/test/filteredLobbies', {
            method:"POST",
            body:{
                game: game.value,
                mode: mode.value,
                tags: selectedTags.value
            }
        })
        emits("sendFilterLobbies", sendFilter)
    } catch(err){
        console.log(err)
    }
}
function setFilter(filter){
    game.value = filter.game
    mode.value = filter.mode
    selectTags.value = filter.tags
}
function setyourGames(){
    glStore.user.userData.gameSettings.forEach(setting => games.value.push(setting.game)) 
}
setyourGames()
onMounted(()=>{
    open()
})
glStore.setGame(game.value)
watch(game, async()=>{
    glStore.setGame(game.value)
    if(game.value != currentFilter.value.game){
        currentFilter.value = 'default'
        selectTags.value = []
    }

})
watch(currentFilter, async (newValue, oldValue) =>{
    if(newValue !== 'default'){
        setFilter(currentFilter.value)
    }
})
</script>
<style lang="scss" scoped>
    .filter{
        background-color: var(--secondaryBg);
        width: 100%;
        height: fit-content;
        &-content{
            overflow: hidden;
            height: 0;
            transition: 250ms;
            .contnet-inner{
                padding: 1rem;
                display: grid;
                grid-template-columns: repeat(12, 1fr);
                gap: 2rem;
                .filter-game{
                display: flex;
                flex-direction: column;
                gap: 1rem;
                grid-column: 1/3;
                grid-column: span 12;
                select{
                    width: 100%;
                }
                }
                .filter-tags{
                    gap: 1rem;
                    grid-column: span 12;
                    justify-self: center;
                    background-color: var(--tertiaryBg);
                    width: 100%;
                    padding: 0 1rem;
                    box-sizing: border-box;
                    border-radius:var(--radiusMd) ;
                    h3{
                        text-align: center;
                    }
                    .tag{
                        display: flex;
                        gap: 0.25rem;
                        align-items: flex-end;
                        input[type="checkbox"]{
                            position: relative;
                            cursor: pointer;
                            appearance: none;
                            width: 16px;
                            height: 16px;
                            &:before {
                                content: "";
                                display: block;
                                position: absolute;
                                width: 16px;
                                height: 16px;
                                top: 33%;
                                left: 0;
                                border: 2px solid var(--primaryBg);
                                border-radius: 3px;
                                padding: 1px;
                                background-color: var(--tertiaryBg);
                            }
                            &:checked:before {
                                background-color: var(--primaryBg);
                            }
                            &:checked:after {
                                content: "";
                                display: block;
                                width: 4px;
                                height: 9px;
                                border: solid white;
                                border-width: 0 2px 2px 0;
                                -webkit-transform: rotate(45deg);
                                -ms-transform: rotate(45deg);
                                transform: rotate(45deg);
                                position: absolute;
                                top: 45%;
                                left: 7px;
                            }
                        }
                    }
                }
                .filter-search{
                    gap: 1rem;
                    grid-column: span 12;
                    justify-self: end;
                    display: flex;
                    gap: 2rem;
                    flex-direction: column;
                    width: 100%;
                    input{
                        width: 100%;
                    }
                    select{
                        width: 100%;
                    }
                }
                @media(min-width: 1550px){
                    padding: 2rem;
                    .filter-game{
                        grid-column: 1/3;
                    }
                    .filter-tags{
                       grid-column: 3/11;
                    }
                    .filter-search{
                        grid-column: 11/13;
                    }
                    .tagsPlaceholder{
                        margin-top: 1rem;
                    }
                    }
                }
            }
        .showBtn{
            height: 1rem;
            background-color: var(--secondaryBg);
            display: flex;
            justify-content: center;
            svg{
                padding: 0.5rem;
                background-color: var(--secondaryBg);
                border-radius: 100%;
                transition: 250ms;
                &.open{
                    transform: rotate(180deg);
                }
            }
        }
    }
    button{
        color:var(--primaryText);
        background-color: var(--tertiaryBg);
        padding: 0.75rem 2rem;
        font-size: var(--fontMd);
        font-weight: 600;
        border-radius: var(--radiusLg);
        cursor: pointer;
    }
    .tagsPlaceholder{
        text-align: center;
        margin-top:0.5rem ;
        .tagsTitle{
            font-size: var(--fontMd);
            font-weight: bold;
        }
        p{
            opacity: 0.3;
        }
    }
</style>