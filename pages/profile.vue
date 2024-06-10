<template>
	<div class="profile">
		<div class="info-input">
			<input type="text" v-model="displayName" placeholder="display name">
			<textarea placeholder="About me" v-model="aboutMe"></textarea>
			<div class="addLink">
				<input type="text" v-model="link" placeholder="link">
				<div class="addBtn" @click="links.push(link)"><font-awesome-icon icon="fa-solid fa-plus" /></div>
			</div>
			<div v-for="linkTag in links" class="links tagsContainer"><div>{{ linkTag }}</div></div>
		</div>
		<div class="settings-input">
			<div class="addTag">
				<input type="text" v-model="tag" placeholder="tag">
				<div class="addBtn" @click="tags.push(tag)"><font-awesome-icon icon="fa-solid fa-plus" /></div>
			</div>
			<div  class="tags tagsContainer"><div v-for="tagTag in tags">{{ tagTag }}</div></div>
		</div>
		<button @click="updataProfile">Save</button>
	</div>
</template>
<script setup>
import { useGlStore } from '../stores/glStore';
const glStore = useGlStore()
const displayName = ref(glStore.userData.displayName)
const aboutMe = ref(glStore.userData.aboutMe)
const link = ref("")
const links = ref(glStore.userData.links)
const tag = ref("")
const tags = ref(glStore.userData.tags)
async function updataProfile(){
	try{
	const update = await  $fetch(`http://localhost:8081/api/test/updataUserInfo/${glStore.userData.id}`, {
            method:"PATCH",
			headers:{
                'x-access-token': glStore.userData.accessToken
            },
            body:{
				displayName:displayName.value,
				aboutMe:aboutMe.value,
				links: links.value,
				tags: tags.value
            }
	})
	console.log(update)
	} catch(err){
		console.log(err)
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
</style>