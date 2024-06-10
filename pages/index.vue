<template>
	<div class="page-home">
		<LobbySuggestionCom></LobbySuggestionCom>
		<FrontpageFeaturedGamesCom></FrontpageFeaturedGamesCom>
		<FrontpageEventsCom></FrontpageEventsCom>
	</div>
</template>
<script setup>
</script>
<style lang="scss" scoped>
	.page-home{
		display: grid;
		grid-template-columns: repeat(24, 1fr);
		grid-template-rows: repeat(12, 1fr);
		gap: 2rem 0;
		padding: 2rem 0;
		max-height: inherit;
		overflow-y: scroll;
		box-sizing: border-box;
	}
	.suggestContainer, .slideContainer, .eventsContainer{
		grid-column: 1/25;
	}
	.suggestContainer{
		grid-row: 8/12;
	}
	.slideContainer{
		grid-row: 1/8;
	}
	.eventsContainer{
		grid-row: 12/21;
	}
	@media(min-width:1550px){
		.page-home{
			gap: 2rem;
		}
		.suggestContainer{
			grid-column: 1/7;
			grid-row: 1/13;
		}
		.slideContainer{
			grid-column: 7/25;
			grid-row: 1/8;
		}
		.eventsContainer{
			grid-column: 7/25;
			grid-row: 8/13;
		}	
	}
</style>