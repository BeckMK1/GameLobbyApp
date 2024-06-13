<template>
	<div class="profile">
		<div class="info-input">
			<input type="text" v-model="displayName" placeholder="display name">
			<textarea placeholder="About me" v-model="aboutMe"></textarea>
			<div class="addLink">
				<input type="text" v-model="link" placeholder="link">
				<div class="addBtn" @click="links.push(link)"><font-awesome-icon icon="fa-solid fa-plus" /></div>
			</div>
			<div  class="links tagsContainer"><div class="tagContainer" v-for="linkTag in links"><div class="removeBtn" @click="removeLink(link)"><font-awesome-icon icon="fa-solid fa-x" /></div><LinkConverterCom :link="linkTag"></LinkConverterCom></div></div>
		</div>
		<div class="settings-input">
			<div class="addTag">
				<input type="text" v-model="tag" placeholder="tag">
				<div class="addBtn" @click="tags.push(tag)"><font-awesome-icon icon="fa-solid fa-plus" /></div>
			</div>
			<div  class="tags tagsContainer"><div class="tag tagDark" v-for="tagTag in tags">{{ tagTag }}</div></div>
		</div>
		<button @click="updataProfile">Save</button>
		<ErrorCom v-if="confrimMessage == ''" :error-message="errorMessage"></ErrorCom>
		<ConfermationCom v-if="errorMessage == ''" :confermation-message="confrimMessage"></ConfermationCom>
	</div>
</template>
<script setup>
import { useGlStore } from '../stores/glStore';
const glStore = useGlStore()
const displayName = ref(glStore.user.displayName)
const aboutMe = ref(glStore.user.aboutMe)
const link = ref("")
const links = ref(glStore.user.links)
const tag = ref("")
const tags = ref(glStore.user.tags)
const errorMessage = ref("")
const confrimMessage = ref("")
function validateProfile(){
	if(displayName.value == ""){
		errorMessage.value = "displayNeme is empty"
		return false
	}
	errorMessage.value = ''
	return true
}
function removeLink(link){
	links.value.splice(links.value.indexOf(link), 1)
}
async function updataProfile(){
	if(validateProfile() == true){
		try{
		const update = await  $fetch(`https://gamelobbyapp-api.onrender.com/api/test/updataUserInfo/${glStore.user.id}`, {
				method:"PATCH",
				headers:{
					'x-access-token': glStore.user.accessToken
				},
				body:{
					displayName:displayName.value,
					aboutMe:aboutMe.value,
					links: links.value,
					tags: tags.value
				}
		})
		confrimMessage.value = update
		setTimeout(()=>{
			confrimMessage.value = ''
		}, 2000)
		} catch(err){
			console.log(err)
		}
	}
}
</script>
<style lang="scss" scoped>
.profile{
	display: grid;
	grid-template-columns: repeat(12, 1fr);
	padding: 2rem 0;
	gap: 2rem;
	box-sizing: border-box;
	.info-input{
		grid-column: span 12;
		background-color: var(--secondaryBg);
		border-radius: var(--radiusMd);
		display: flex;
		flex-direction: column;
		padding: 2rem;
		gap: 1rem;
		height: fit-content;
		@media(min-width: 1550px){
			grid-column: 1/4;
		}
		.addLink{
			position: relative;
			margin-top: 2rem;
			input{
				width: 100%;
			}
		}
		textarea{
			height: 200px;
		}
	}
	.settings-input{
		grid-column: span 12;
		background-color: var(--secondaryBg);
		border-radius: var(--radiusMd);
		display: flex;
		flex-direction: column;
		padding: 2rem;
		gap: 1rem;
		height: fit-content;
		@media(min-width: 1550px){
			grid-column: 4/13;
		}
		.addTag{
			position: relative;
			input{
				width: 100%;
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
.links{
	div{
		height: 100%;
		box-sizing: border-box;
	}
}
</style>