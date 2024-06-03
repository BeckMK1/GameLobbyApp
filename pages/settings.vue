<template>
	<div class="settings">
		<div class="filters">
			<div class="createNewFilter">
				<input v-model="filterTitle" type="text">
				<button @click="createFilter">Create</button>
			</div>
			<AccordionCom v-for="filter in filters" :title="filter.title">
				<div class="inputFlex">
					<select name="game" v-model="filter.game" id="">
						<option value="Dota 2">Dota 2</option>
						<option value="CS 2">CS 2</option>
					</select>
					<select name="mode" v-model="filter.mode" id="">
						<option value="Ranked">Ranked</option>
						<option value="Unranked">Unranked</option>
					</select>
				</div>
				<div class="addTags">
					<input type="text" v-model="filtertag" placeholder="Add tags separate with ','">
					<div class="addBtn" @click="filter.tags.push(filtertag)"><font-awesome-icon icon="fa-solid fa-plus" /></div>
				</div>
				<div class="tagsContainer"><div v-for="tag in filter.tags">{{ tag }}</div></div>
			</AccordionCom>
		</div>
		<div class="games">
			<div class="createGameSetting">
				<select name="" id="" v-model="gameSettingTitle"><option v-for="game in games" :value="game">{{ game }}</option></select>
				<button @click="createSetting">Create</button>
			</div>
			<AccordionCom v-for="gameSetting in gameSettings" :title="gameSetting.game">
				<input type="text" v-model="gameSetting.ign" placeholder="in game name">
				<div class="inputFlex">
					<input type="text" v-model="gameSetting.rank" placeholder="Rank">
					<input type="text" v-model="gameSetting.verrifaction" placeholder="verrifaction link">
				</div>
				<div class="addTags">
					<input type="text" v-model="gameTag" placeholder="Add tags separate with ','">
					<div class="addBtn" @click="gameSetting.tags.push(gameTag)"><font-awesome-icon icon="fa-solid fa-plus" /></div>
				</div>
				<div class="tagsContainer"><div v-for="tag in gameSetting.tags">{{ tag }}</div></div>
				<input type="text" v-model="gameSetting.gameProfile" placeholder="game profile link"> 
				<button @click="saveSetting(gameSetting)">Save</button>
			</AccordionCom>
		</div>
	</div>
</template>
<script setup>
import { useGlStore } from '../stores/glStore';
const glStore = useGlStore()
const filters = ref(glStore.userData.filters)
const authCookie = useCookie('authCookie', {
  default: () => (null),
  sameSite: 'none', 
  secure: true, // change to true in prod
  httpOnly: false,
  watch: true,
  maxAge: 86400, // 24h 
})
const filterTitle = ref('')
const filtertag = ref("")
const gameSettings = ref(glStore.userData.gameSettings)
const gameSettingTitle = ref("")
const gameTag = ref("")
const games = ref([
	'Dota 2',
	'CS 2'
])
function createFilter(){
	let filter = {
		title: filterTitle.value,
		game: "",
		mode:"",
		tags:[]
	}
	filters.value.push(filter)
}
function createSetting(){
	let setting = {
		game: gameSettingTitle.value,
		ign: "",
		rank: "",
		verrifactionLink: "",
		tags: [],
		gameProfile: ""
	}
	gameSettings.value.push(setting)
}
async function saveSetting(gameSetting){
	try{
	const update = await  $fetch(`http://localhost:8081/api/test/upadeteGamesettings/${glStore.userData.id}`, {
            method:"PATCH",
			headers:{
                'x-access-token': glStore.userData.accessToken
            },
            body:{
				game: gameSetting.game,
				ign: gameSetting.ign,
				rank: gameSetting.rank,
				verrifaction: gameSetting.verrifactionLink,
				tags: gameSetting.tags,
				gameProfile: gameSetting.gameProfile
            }
	})
	console.log(update)
	} catch(err){
		console.log(err)
	}
	try{
		const data = await $fetch(`http://localhost:8081/api/test/currentUserData/${glStore.userData.id}`, {
                method:'GET',
                lazy:true,
                headers:{
                    'x-access-token': glStore.userData.accessToken
                },
    })
	authCookie.value.gameSettings = data.gameSettings
	} catch(err){
		console.log(err)
	}
}
</script>
<style lang="scss" scoped>
	.createNewFilter{
		position: relative;
		margin-bottom: 1rem;
		input{
			width: 100%;
		}
		button{
			position: absolute;
			right: 0.5rem;
			top: 50%;
			transform: translateY(-50%);
			background-color: var(--secondaryBg);
			border-radius: var(--radiusSm);
		}
	}
	.createGameSetting{
		display: grid;
		grid-template-columns: repeat(12, 1fr);
		margin-bottom: 1rem;
		select{
			grid-column: 1/11;
			width: 100%;
		}
		button{
			grid-column: 11/13;
		}

	}
	.settings{
		display: grid;
		grid-template-columns: repeat(12, 1fr);
		padding: 2rem 0;
		gap:2rem;
	}
	.filters{
		grid-column: span 6;
		background-color: var(--secondaryBg);
		box-sizing: border-box;
		padding: 2rem;
		border-radius: var(--radiusMd);
	}
	.inputFlex{
            display: flex;
            gap: 1rem;
            input, select{
				width: 100%;
            }
        }
		.addTags{
			position: relative;
			input{
				width: 100%;
			}
		}
		button{
			width: fit-content;
			padding: 0.33rem 1.5rem 0.50rem 1.5rem;
			background-color: var(--tertiaryBg);
			justify-self: center;
			border-radius: var(--radiusMd);
			font-size: var(--fontMd);
		}
	.games{
		grid-column: span 6;
		background-color: var(--secondaryBg);
		box-sizing: border-box;
		padding: 2rem;
		border-radius: var(--radiusMd);
	}
</style>