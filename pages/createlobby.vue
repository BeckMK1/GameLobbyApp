<template>
	<div class="crateLobby">
		<div class="info-input">
			<input type="text" placeholder="Lobby name">
			<select name="game"><option v-for="game in games" :value="game">{{ game }}</option></select>
			<select name="gameMode" id="">
				<option value="ranked">Ranked</option>
				<option value="unRanked">Unranked</option>
			</select>
			<div class="linkInput">
				<input type="text" placeholder="Link">
				<div class="addBtn"><font-awesome-icon icon="fa-solid fa-plus" /></div>
			</div>
			<div class="links tagsContainer"></div>
			<textarea class="aboutText" placeholder="About lobby"></textarea>
		</div>
		<div class="settings-input">
			<div class="tagsInput">
				<textarea class="" placeholder="Custom tags: separate with tags with ','"></textarea>
				<div class="addBtn"><font-awesome-icon icon="fa-solid fa-plus" /></div>
			</div>
			<div class="savedTags tagsContainer"></div>
			<div class="tags tagsContainer"></div>
			<div class="addPlayer">
				<input type="text" placeholder="invite player">
				<div class="addBtn"><font-awesome-icon icon="fa-solid fa-plus" /></div>
			</div>
			<div class="players tagsContainer"></div>
		</div>
		<button>Create Lobby</button>
	</div>
</template>
<script setup>
const games = ref([
	'Dota 2',
	"CS 2"
])
</script>
<style lang="scss" scoped>
.crateLobby{
	display: grid;
	grid-template-columns: repeat(12, 1fr);
	grid-template-rows: 1fr 100px;
	gap: 2rem;
	padding: 2rem 0;
	.info-input{
		grid-column: 1/4;
		background-color: var(--secondaryBg);
		display: flex;
		flex-direction: column;
		gap: 1rem;
		padding: 2rem;
		border-radius: var(--radiusMd);
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
		grid-column: 4/13;
		background-color: var(--secondaryBg);
		display: flex;
		flex-direction: column;
		gap: 1rem;
		padding: 2rem;
		border-radius: var(--radiusMd);
		height: fit-content;
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