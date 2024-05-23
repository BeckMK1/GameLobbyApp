<template>
	<div class="profile">
		<div class="info-input">
			<input type="text" placeholder="display name">
			<input type="text" placeholder="Email">
			<textarea placeholder="About me"></textarea>
			<div class="addLink">
				<input type="text" placeholder="link">
				<div class="addBtn"><font-awesome-icon icon="fa-solid fa-plus" /></div>
			</div>
			<div class="links tagsContainer"></div>
		</div>
		<div class="settings-input">
			<div class="addTag">
				<input type="text" placeholder="link">
				<div class="addBtn"><font-awesome-icon icon="fa-solid fa-plus" /></div>
			</div>
			<div class="tags tagsContainer"></div>
		</div>
		<button>Save</button>
	</div>
</template>
<script setup>
</script>
<style lang="scss" scoped>
.profile{
	display: grid;
	grid-template-columns: repeat(12, 1fr);
	padding: 2rem 0;
	gap: 2rem;
	.info-input{
		grid-column: 1/4;
		background-color: var(--secondaryBg);
		border-radius: var(--radiusMd);
		display: flex;
		flex-direction: column;
		padding: 2rem;
		gap: 1rem;
		height: fit-content;
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
		grid-column: 4/13;
		background-color: var(--secondaryBg);
		border-radius: var(--radiusMd);
		display: flex;
		flex-direction: column;
		padding: 2rem;
		gap: 1rem;
		height: fit-content;
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