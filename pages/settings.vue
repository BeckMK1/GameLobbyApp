<template>
	<div class="settings">
		<div class="filters">
			<AccordionCom title="Dota 2">
				<input type="text" placeholder="in game name">
				<div class="inputFlex">
					<input type="text" placeholder="Rank">
					<input type="text" placeholder="Verrifacttion link">
				</div>
				<div class="addTags">
					<input type="text" placeholder="Add tags separate with ','">
					<div class="addBtn"><font-awesome-icon icon="fa-solid fa-plus" /></div>
				</div>
				<div class="tagsContainer"></div>
				<input type="text" placeholder="game profile link"> 
			</AccordionCom>
		</div>
		<div class="games"></div>
	</div>
</template>
<script setup>
</script>
<style lang="scss" scoped>
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
		.inputFlex{
            display: flex;
            gap: 1rem;
            input{
				width: 100%;
            }
        }
		.addTags{
			position: relative;
			input{
				width: 100%;
			}
		}
	}
	.games{
		grid-column: span 6;
		background-color: var(--secondaryBg);
		box-sizing: border-box;
		padding: 2rem;
		border-radius: var(--radiusMd);
	}
</style>