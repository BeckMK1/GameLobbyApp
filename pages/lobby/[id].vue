<template>
	<div class="currentLobby">
        <h2>Lobby name</h2>
        <div class="lobbyInfo">
            <h2>Lobby info</h2>
            <p class="inActiveInput"></p>
            <p class="inActiveInput"></p>
            <label>Tags</label>
            <div class="tags"><div class="tag"></div></div>
            <label>Links</label>
            <div class="links"><div class="link"></div></div>
            <div class="inActiveTextarea"></div>
        </div>
        <div class="players">
            <h2>Players</h2>
        </div>
    </div>
</template>
<script setup>
</script>
<style lang="scss" scoped>
.currentLobby{
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: 50px 1fr;
    gap: 2rem;
    padding: 2rem 0;
    h2{
        grid-column: span 12;
        text-align: center;
    }
}
.lobbyInfo{
    grid-column: 1/5;
    background-color: var(--secondaryBg);
    box-sizing: border-box;
    padding: 2rem 5rem;
    border-radius: var(--radiusMd);
    display:flex;
    flex-direction: column;
    gap: 1rem;
    label{
        font-size: var(--fontMd);
        margin-top: 0.5rem;
    }
    .inActiveInput{
        width: 100%;
        background-color: var(--tertiaryBg);
        height: fit-content;
        padding: 1rem;
        border-radius: var(--radiusMd);
    }
    .tags{
        width: 100%;
        padding: 1rem;
        background-color: var(--tertiaryBg);
        height: 100px;
        border-radius: var(--radiusMd);
    }
    .links{
        width: 100%;
        padding: 1rem;
        background-color: var(--tertiaryBg);
        height: 100px;
        border-radius: var(--radiusMd);
    }
    .inActiveTextarea{
        width: 100%;
        padding: 1rem;
        background-color: var(--tertiaryBg);
        height: 100px;
        border-radius: var(--radiusMd);
    }
}
.players{
    grid-column: 5/13;
    background-color: var(--secondaryBg);
    box-sizing: border-box;
    padding: 2rem;
    border-radius: var(--radiusMd);
    h2{
        text-align: center;
    }
}
</style>