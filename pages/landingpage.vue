<template>
	<div class="landingPage">
        <div class="Logo"><h1>Pre Lobby</h1></div>
        <div class="content">
            <div class="textContainer">
                <h2>Tired of playing with toxic teammates?</h2>
                <p>Then Pre Lobby is the solution. With Pre Lobby it is easy to form a lobby with people you want to play with before you start playing.</p> 
                <p>Meet the people you are going to play whit before you game and if you dont like them you can kick them form your Lobby.</p>
                <p>What are you waiting for start your toxic free gaming experience today.</p>
            </div>
            <div class="btnContainer">
                <NuxtLink class="ctaBtn" @click="glStore.setLogin(false)" to="/login">Make account</NuxtLink>
                <NuxtLink class="ctaBtn"  @click="glStore.setLogin(true)"  to="/login">Login</NuxtLink>
            </div>
        </div>
    </div>
</template>
<script setup>
import { useGlStore } from '../stores/glStore';
const glStore = useGlStore()
</script>
<style lang="scss" scoped>
    .landingPage{
        display: flex;
        justify-content: center;
        align-items: center;
        grid-column: span 2;
        min-height: 100vh;
        position: relative;
        .Logo{
            position: absolute;
            left: 1rem;
            top: 1rem;
        }
        .content{
            display: grid;
            grid-template-columns: 1fr;
            width: 50%;
            gap: 2rem;
            @media(min-width:1550px){
                grid-template-columns: 1fr 300px;
            }
            .textContainer{
                h2{
                margin-bottom: 1rem;
                }
                p:not(p:last-child){
                    margin-bottom: 1rem;
                }
            }

            .btnContainer{
                display: flex;
                flex-direction: column;
                gap: 2rem;
                align-self: center;
                .ctaBtn{
                    padding:0.75rem 0;
                    background-color: var(--secondaryBg);
                    border-radius: var(--radiusSm);
                    font-weight: bold;
                    transition: 250ms;
                    cursor: pointer;
                    text-align: center;
                    text-decoration: none;
                    &:hover{
                        background-color: var(--tertiaryBg);
                    }
                    &:first-child{
                        background-color: var(--tertiaryBg);
                        border:1px solid orange;
                        &:hover{
                            background-color: orange;
                        }
                    }
                }
            }
        }
    }

</style>