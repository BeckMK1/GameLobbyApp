<template>
	<div>
        <div class="lobbiesContainer">
            <LobbypageLobbyCom></LobbypageLobbyCom>
        </div>
    </div>
</template>
<script setup>
</script>
<style lang="scss" scoped>
.lobbiesContainer{
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    padding: 2rem 0;
}
</style>