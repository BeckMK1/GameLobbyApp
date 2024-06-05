<template>
	<div class="lobbyPage">
        <LobbypageLobbyFilterCom @send-filter-lobbies="getFilterLobbies"></LobbypageLobbyFilterCom>
        <div class="lobbies">
            <LobbypageLobbyCom :filtered-lobbies="filteredLobbies"></LobbypageLobbyCom>
        </div>
    </div>
</template>
<script setup>
const filteredLobbies = ref([])
function getFilterLobbies(data){
    filteredLobbies.value = data
}
</script>
<style lang="scss" scoped>
.lobbies{
   padding: 0 2rem;
}
</style>