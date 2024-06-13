<template>
	<div class="crateLobby">
		<div class="info-input">
			<input type="text" placeholder="Lobby name*" v-model="name">
			<select name="game" v-model="game"><option value="" disabled selected hidden>Game*</option><option v-for="game in games" :value="game">{{ game }}</option></select>
			<select name="gameMode" v-model="mode" id="">
				<option value="" disabled selected hidden>Game mode*</option>
				<option value="Ranked">Ranked</option>
				<option value="Unranked">Unranked</option>
			</select>
			<div class="linkInput">
				<input type="text" v-model="link" placeholder="Link">
				<div class="addBtn" @click="links.push(link)"><font-awesome-icon icon="fa-solid fa-plus" /></div>
			</div>
			<div class="links tagsContainer"><div v-for="link in links"><LinkConverterCom :link="link"></LinkConverterCom></div></div>
			<textarea class="aboutText" v-model="about" placeholder="About lobby"></textarea>
		</div>
		<div class="settings-input">
			<div class="tagsInput">
				<textarea v-model="tag" placeholder="Custom tags: separate with tags with ','"></textarea>
				<div class="addBtn" @click="addtags"><font-awesome-icon icon="fa-solid fa-plus" /></div>
			</div>
			<div class="savedTags tagsContainer"></div>
			<div class="tags tagsContainer"><div class="tag tagDark"  v-for="tag in tags">{{ tag }}</div></div>
			<div class="addPlayer">
				<input type="text" v-model="testPlayer" placeholder="invite player">
				<div class="addBtn" @click="getPlayer"><font-awesome-icon icon="fa-solid fa-plus" /></div>
			</div>
			<div class="players tagsContainer"><div class="tag tagDark" v-for="player in players">{{ player.username }}</div></div>
			<div class="playerError" v-if="playerError != ''">{{playerError}}</div>
		</div>
        <ErrorCom :error-message="errorMessage"></ErrorCom>
		<button @click="createLobby">Create Lobby</button>
	</div>
</template>
<script setup>
import { useGlStore } from '../stores/glStore';
const glStore = useGlStore()
const authCookie = useCookie('authCookie', {
	default: () => ([]),
  sameSite: 'none', 
  secure: true, // change to true in prod
  httpOnly: false,
  watch: true,
  maxAge: 86400, // 24h 
})
const currentPlaySettings = ref({})
const playerError = ref("")
const testPlayer = ref('')
const games = ref([])
const link = ref("")
const tag = ref("")
const name = ref("")
const mode = ref("")
const rank = ref("")
const game = ref("")
const links = ref([])
const about = ref("")
const playerTags = ref([])
const players = ref([])
const tags = ref([])
const maxPlayers = ref(5)
const canCreate = ref(false)
const errorMessage = ref("")
function setValidGames(){
	if(glStore.user.userData.gameSettings.length != 0){
		glStore.user.userData.gameSettings.forEach((setting) =>{
			games.value.push(setting.game)
		})
}
}
setValidGames()
function setCurrentPlayerSettings(){
	if(glStore.user.userData.gameSettings.length != 0){
		glStore.user.userData.gameSettings.forEach((setting) =>{
			if(setting.game == game.value){
				currentPlaySettings.value = setting
				playerTags.value = glStore.user.userData.tags.concat(setting.tags)
				let currentPlayer = {
					username: glStore.user.userData.username,
					id: glStore.user.userData.id,
					role:"leader",
					tags: playerTags.value,
					links: glStore.user.userData.links,
					gameSettings: currentPlaySettings.value,
					rank:setting.rank
				}
				rank.value = setting.rank
				players.value.push(currentPlayer)
			}
		})
	}
}
function validateLobby(){
	if(name.value == ""){
		errorMessage.value = "Missing lobby name"
		canCreate.value = false
		return
	}
	if(game.value == ""){
		errorMessage.value = "Missing game"
		canCreate.value = false
		return
	}
	if(mode.value == ""){
		errorMessage.value = "Missing mode"
		canCreate.value = false
		return 
	}
	canCreate.value = true
}
async function createLobby(){
	validateLobby()
	if(canCreate.value == false){
		return
	}
	try{
	const lobbyInfo = await $fetch('http://localhost:8081/api/test/lobbyCreate', {
            method:"POST",
			headers:{
                'x-access-token': glStore.user.accessToken
            },
            body:{
				name: name.value,
				game: game.value,
				mode: mode.value,
				rank: rank.value,
				links: links.value,
				about: about.value,
				tags: tags.value,
				players: players.value,
				maxPlayers: maxPlayers.value
            }
        })
		authCookie.value.inLobby = lobbyInfo.id
		navigateTo(`/lobby/${lobbyInfo.id}`)
	}catch(err){
		console.log(err)
	}
}
function addtags(){
	const temptags = tag.value.split(',')
	temptags.forEach(temptag => {
		tags.value.push(temptag.trimStart())
	});

}
async function getPlayer(){
	try{
		const data = await $fetch('http://localhost:8081/api/test/usersInfo', {
                method:'POST',
                lazy:true,
                headers:{
                    'x-access-token': glStore.user.accessToken
                },
                body:{
                    username: testPlayer.value,
                }
    })
	console.log(players.value.filter(player => player.username == data.username).length != 0)
	if(players.value.filter(player => player.username == data.username).length != 0){
		playerError.value = 'player already inlobby'
		return
	}
	if(players.value.length < maxPlayers.value){
		players.value.push(data)
		return
	}

	playerError.value = 'player limet reached'
	} catch(err){
		console.log(err)
		playerError.value = 'player not found'
	}
}
watch(game, async()=>{
	setCurrentPlayerSettings()
})
</script>
<style lang="scss" scoped>
.crateLobby{
	display: grid;
	grid-template-columns: repeat(12, 1fr);
	gap: 2rem 0;
	overflow-y: scroll;
	max-height: inherit;
	box-sizing: border-box;
	@media(min-width: 1550px) {
		gap: 2rem;
		grid-template-rows: 1fr 100px;
	}
	padding: 2rem 0;
	.info-input{
		grid-column: 1/13;
		background-color: var(--secondaryBg);
		display: flex;
		flex-direction: column;
		gap: 1rem;
		padding: 2rem;
		border-radius: var(--radiusMd);
			@media(min-width: 1550px) {
				grid-column: 1/4;
			}
		.linkInput{
		position: relative;
		input{
			width: 100%;
			box-sizing: border-box;
		}
	}
	.aboutText{
		height: 225px;
	}
	}
	.settings-input{
		grid-column: 1/13;
		background-color: var(--secondaryBg);
		display: flex;
		flex-direction: column;
		gap: 1rem;
		padding: 2rem;
		border-radius: var(--radiusMd);
		height: fit-content;
		@media(min-width: 1550px) {
			grid-column: 4/13;
		}
		.tagsInput{
			position: relative;
			textarea{
				width: 100%;
				box-sizing: border-box;
			}
		}
		.savedTags{
			min-height: 50px;
		}
		.addPlayer{
			position: relative;
			input{
				width: 100%;
				box-sizing: border-box;
			}
		}
	}
	button{
		grid-column: span 12;
		width: fit-content;
		justify-self: center;
		height: fit-content;
		align-self: center;
		background-color: var(--tertiaryBg);
		padding: 1rem 2rem;
		font-size: var(--fontMd);
		font-weight: 600;
		border-radius: var(--radiusXl);
		cursor: pointer;
	}
}
</style>