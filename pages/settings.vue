<template>
	<div class="settings">
		<div class="filters">
			<div class="createNewFilter">
				<input v-model="filterTitle" type="text" placeholder="Filter name">
				<button @click="createFilter">Create</button>
			</div>
			<div v-if="filters.length != 0">
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
				<div class="tagsContainer"><div class="tag tagDark" v-for="tag in filter.tags">{{ tag }}</div></div>
				<button v-if="filter.new == null" @click="updateFilter(filter)">update</button>
				<button v-if="filter.new == true" @click="saveFilter(filter)">Save</button>
				</AccordionCom>
			</div>
			<div v-else class="settingPlaceholder">
				<p class="mainPlaceholder">Seach filters</p>
			</div>
		</div>
		<div class="games">
			<div class="createGameSetting">
				<select name="" id="" v-model="gameSettingTitle"><option value="" selected disabled hidden>Create new game setting</option><option v-for="game in games" :value="game">{{ game }}</option></select>
				<button @click="createSetting">Create</button>
			</div>
			<div v-if="gameSettings.length != 0">
			<AccordionCom v-for="gameSetting in gameSettings" :title="gameSetting.game">
				<input type="text" v-model="gameSetting.ign" placeholder="in game name">
				<div class="inputFlex">
					<input type="text" v-model="gameSetting.rank" placeholder="Rank">
				</div>
				<div class="addTags">
					<input type="text" v-model="gameTag" placeholder="Add tags separate with ','">
					<div class="addBtn" @click="gameSetting.tags.push(gameTag)"><font-awesome-icon icon="fa-solid fa-plus" /></div>
				</div>
				<div class="tagsContainer"><div class="tag tagDark" v-for="tag in gameSetting.tags">{{ tag }}</div></div>
				<input type="text" v-model="gameSetting.gameProfile" placeholder="game profile link"> 
				<button v-if="gameSetting.new == true" @click="saveSetting(gameSetting)">Save</button>
				<button v-if="gameSetting.new == null" @click="updateGameSetting(gameSetting)">Update</button>
			</AccordionCom>
		</div>
		<div class="settingPlaceholder" v-else>
			<p class="mainPlaceholder">Game profile</p>
			<p>You must have a game profile before you can join a lobby of the game</p>
		</div>
		</div>
        <ErrorCom :error-message="errorMessage"></ErrorCom>
		<ConfermationCom :confermation-message="confrimMessage"></ConfermationCom>
	</div>
</template>
<script setup>
import { useGlStore } from '../stores/glStore';
const glStore = useGlStore()
const filters = computed(() => glStore.user.userData.gameFilters)
const authCookie = useCookie('authCookie', {
	default: () => ([]),
  sameSite: 'none', 
  secure: true, // change to true in prod
  httpOnly: false,
  watch: true,
  maxAge: 86400, // 24h 
})
const filterTitle = ref('')
const filtertag = ref("")
const gameSettings = computed(() => glStore.user.userData.gameSettings)
const gameSettingTitle = ref("")
const gameTag = ref("")
const games = ref([
	'Dota 2',
	'CS 2'
])
const errorMessage = ref("")
const confrimMessage = ref("")
function validateSettings(){
	gameSettings.value.forEach(setting => {
		if(setting.ign == ''){
			errorMessage.value = "In game name missing"
			return false
		}
		errorMessage.value = ""
	});
	return true
}
function validateFilter(){
	filters.value.forEach(filter => {
		if(filter.game == ''){
			errorMessage.value == "no game in filter selected"
			return false
		}
		if(filter.mode == ""){
			errorMessage.value == "no game mode in filter selected"
			return false
		}
	});
	return true
}
function createFilter(){
	let filter = {
		title: filterTitle.value,
		game: "",
		mode:"",
		tags:[],
		new:true
	}
	glStore.setFilter(filter)
}
function createSetting(){
	let setting = {
		game: gameSettingTitle.value,
		ign: "",
		rank: "",
		verrifactionLink: "",
		tags: [],
		gameProfile: "",
		new:true
	}
	gameSettings.value.push(setting)
}
async function saveFilter(filter){
	if(validateFilter() == true){
		try{
		const update = await  $fetch(`http://localhost:8081/api/test/createGameFilters/${glStore.user.userData.id}`, {
				method:"PATCH",
				headers:{
					'x-access-token': glStore.user.accessToken
				},
				body:{
					title: filter.title,
					game: filter.game,
					mode: filter.mode,
					tags: filter.tags,
				}
		})
		confrimMessage.value = update
		setTimeout(()=>{
			confrimMessage.value = ''
		}, 2000)
		} catch(err){
			console.log(err)
		}
		try{
			const data = await $fetch(`http://localhost:8081/api/test/getUser/${glStore.user.userData.id}`, {
					method:'GET',
					lazy:true,
					headers:{
						'x-access-token': glStore.user.accessToken
					}, 
		})
		authCookie.value.userData.gameFilters = data.gameFilters
		} catch(err){
			console.log(err)
		}
	}
}
async function updateFilter(filter){
	if(validateFilter() == true){
		try{
		const update = await  $fetch(`http://localhost:8081/api/test/upadeteGameFilters/${glStore.user.userData.id}`, {
				method:"PATCH",
				headers:{
					'x-access-token': glStore.user.accessToken
				},
				body:{
					title: filter.title,
					game: filter.game,
					mode: filter.mode,
					tags: filter.tags,
				}
		})
		confrimMessage.value = update
		setTimeout(()=>{
			confrimMessage.value = ''
		}, 2000)
		} catch(err){
			console.log(err)
		}
		try{
			const data = await $fetch(`http://localhost:8081/api/test/getUser/${glStore.user.userData.id}`, {
					method:'GET',
					lazy:true,
					headers:{
						'x-access-token': glStore.user.accessToken
					}, 
		})
		authCookie.value.userData.gameFilters = data.gameFilters
		} catch(err){
			console.log(err)
		}
	}
}
async function saveSetting(gameSetting){
	if(validateSettings() == true){
		try{
		const update = await  $fetch(`http://localhost:8081/api/test/createGamesettings/${glStore.user.userData.id}`, {
				method:"PATCH",
				headers:{
					'x-access-token': glStore.user.accessToken
				},
				body:{
					game: gameSetting.game,
					ign: gameSetting.ign,
					rank: gameSetting.rank,
					tags: gameSetting.tags,
					gameProfile: gameSetting.gameProfile
				}
		})
		confrimMessage.value = update
		setTimeout(()=>{
			confrimMessage.value = ''
		}, 2000)
		} catch(err){
			console.log(err)
		}
		try{
			const data = await $fetch(`http://localhost:8081/api/test/getUser/${glStore.user.userData.id}`, {
					method:'GET',
					lazy:true,
					headers:{
						'x-access-token': glStore.user.accessToken
					}, 
		})
		authCookie.value.userData.gameSettings = data.gameSettings
		} catch(err){
			console.log(err)
		}
	}
}
async function updateGameSetting(gameSetting){
	if(validateSettings() == true){
		try{
		const update = await  $fetch(`http://localhost:8081/api/test/upadeteGamesettings/${glStore.user.userData.id}`, {
				method:"PATCH",
				headers:{
					'x-access-token': glStore.user.accessToken
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
		confrimMessage.value = update
		setTimeout(()=>{
			confrimMessage.value = ''
		}, 2000)
		} catch(err){
			console.log(err)
		}
		try{
			const data = await $fetch(`http://localhost:8081/api/test/getUser/${glStore.user.userData.id}`, {
					method:'GET',
					lazy:true,
					headers:{
						'x-access-token': glStore.user.accessToken
					}, 
		})
		authCookie.value.userData.gameSettings = data.gameSettings
		} catch(err){
			console.log(err)
		}
	}
}
</script>
<style lang="scss" scoped>
	.settings{
		max-height: inherit;
		box-sizing: border-box;
	}
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
		grid-template-columns: 1fr 100px;
		gap: 1rem;
		margin-bottom: 1rem;
		@media(min-width: 450px){}
		select{
			width: 100%;
		}
		button{

		}

	}
	.settings{
		display: grid;
		grid-template-columns: repeat(12, 1fr);
		padding: 2rem 0;
		gap:2rem;
	}
	.filters{
		grid-column: span 13;
		background-color: var(--secondaryBg);
		box-sizing: border-box;
		padding: 2rem;
		border-radius: var(--radiusMd);
		height: 100%;
		overflow: scroll;
		@media(min-width: 1550px){
			grid-column: span 6;
		}
		.settingPlaceholder{
			.mainPlaceholder{
				font-size: var(--fontXl);
				text-align: center;
				opacity: 0.3;
				font-weight: bold;
			}
		}
			
		
	
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
		grid-column: span 13;
		background-color: var(--secondaryBg);
		box-sizing: border-box;
		padding: 2rem;
		border-radius: var(--radiusMd);
		height: 100%;
		overflow: scroll;
		.settingPlaceholder{
			p{
				text-align: center;
				opacity: 0.3;
				&:not(.mainPlaceholder){
					font-style: italic;
				}
			}
			.mainPlaceholder{
				font-size: var(--fontXl);
				font-weight: bold;
			}
		}
		@media(min-width: 1550px){
			grid-column: span 6;
		}
	}
</style>