<template>
	<div class="filter">
        <div class="filter-content" :style="{height:contentHight + 'px'}">
            <div ref="content" class="contnet-inner">
                <div class="filter-game">
                    <select v-model="game"><option v-for="game in games" :value="game">{{ game }}</option></select>
                    <select v-model="mode"><option v-for="mode in modes" :value="mode">{{ mode }}</option></select>
                </div>
                <div class="filter-tags">
                    <h3>Most used tags</h3>
                    <div class="tag" v-for="tag in selectTags">
                    <label :for="tag">{{ tag }}</label>
                    <input :name="tag" :value="tag" type="checkbox" v-model="selectedTags">
                    </div>
                </div>
                <div class="filter-search">
                    <select name="" id=""><option value="default">Default filter</option></select>
                    <button class="searchBtn" @click="getLobbies">Search</button>
                </div>
            </div>
        </div>
        <div class="showBtn"><font-awesome-icon @click="open"  :class="contentHight != 0 ? 'open' : '' " icon="fa-solid fa-chevron-down" /></div>
    </div>
</template>
<script setup>
const emits = defineEmits(['sendFilterLobbies'])
const contentHight = ref(0)
const content = ref(null)
const game = ref("")
const mode = ref("")
const selectedTags = ref([])
const selectedFilter = ref({})
const lobbies = ref(null)
async function getLobbies(){
    try{
    const sendFilter = await $fetch('http://localhost:8081/api/test/filteredLobbies', {
            method:"POST",
            body:{
                game: game.value,
                mode: mode.value.toLowerCase(),
                tags: selectedTags.value
            }
        })
        emits("sendFilterLobbies", sendFilter)
    } catch(err){
        console.log(err)
    }
}
function open(){
    if(contentHight.value == 0){
        contentHight.value = content.value.scrollHeight
        return 
    }
    contentHight.value = 0
}
const games = ref([
    'Dota 2',
    'CS 2'
])
const modes = ref([
    'Ranked',
    'Unranked'
])
const selectTags = ref([
    "need pos 3",
    "need pos 2"
])

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
                padding: 2rem;
                display: grid;
                grid-template-columns: repeat(12, 1fr);
                gap: 2rem;
                .filter-game{
                display: flex;
                flex-direction: column;
                gap: 1rem;
                grid-column: 1/3;
                select{
                    width: 100%;
                }
                }
                .filter-tags{
                    gap: 1rem;
                    grid-column: 3/11;
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
                    grid-column: 11/13;
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
</style>