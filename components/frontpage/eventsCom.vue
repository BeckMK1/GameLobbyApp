<template>
	<div class="eventsContainer">
        <h2>Events</h2>
        <div class="events">
            <div class="event" v-for="event in events">
                <h3>{{ event.title }}</h3>
                <p>{{ event.type }}</p>
            <a :href="event.link"><img :src="event.image" alt=""><p class="linkMessage">{{ event.message }}</p></a> 
            </div>
        </div>
    </div>
</template>
<script setup>
const events = ref([
    {
        title:'title',
        image: '/images/slides/dota2Slide.jpg',
        link: '#',
        type:'type',
        message:"see more"
    },
    {
        title:'title2',
        image: '/images/slides/cs2Slide.jpg',
        link: '#',
        type:'type',
        message:"see more"
    }
])
</script>
<style lang="scss" scoped>
    .eventsContainer{
        background-color: var(--secondaryBg);
        padding: 1rem ;
        border-radius: var(--radiusMd);
        height: 100%;
        overflow-x: scroll;
        height: fit-content;
        h2{
            margin-bottom: 1rem;
        }
        .events{
            gap: 0.5rem;
            display: flex;
            gap: 2rem;
            width: fit-content;
        }
        .event{
            display: flex;
            flex-direction: column;
            gap: 0.2rem;
            background-color: var(--tertiaryBg);
            padding:1rem;
            border-radius: var(--radiusMd);
            width: 200px;
            height: fit-content;
            @media(min-width:1550px){
                gap: 1rem;
            }
            h3{
                text-align: center;
            }
            a{
                padding: 0 1rem;
                position: relative;
                img{
                    width:100%;
                    height: 100%;
                    object-fit: cover;
                    border-radius: var(--radiusMd);
                }
                .linkMessage{
                    opacity: 0;
                    position: absolute;
                    font-weight: bold;
                    width: calc(100% - 2rem);
                    height: 100%;
                    top: 0;
                    left: 1rem;
                    background-color: hsla(0,0%,30%,0.5);
                    border-radius: var(--radiusMd);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    transition: opacity 250ms;
                }
                &:hover{
                    .linkMessage{
                        opacity: 1;
                    }
                }
            }
        }
    }
</style>