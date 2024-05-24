<template>
    <div class="slideContainer" >
        <div class="arrowBtn" @click="prevSlide">
            <font-awesome-icon  icon="fa-solid fa-chevron-left" />
        </div>
        <div class="slide" v-for="slide in currentSlide">
            <img :src="slide.image" alt="">
        </div>
        <div class="SlideIndicatorContainer">
                <div v-for="indicator in slides" class="indicator" :class="indicator.id == currentId ? 'active':''"></div>
        </div>
        <div class="arrowBtn" @click="nextSlide">
            <font-awesome-icon  icon="fa-solid fa-chevron-right" />
        </div>
    </div>
</template>
<script setup>
    const currentSlide = ref({})
    const currentId = ref(1)
    const slides = ref([
        {
            title:'Dota 2',
            image:'/images/slides/dota2Slide.jpg',
            link:'#',
            content:'',
            id:1
            
        },
        {
            title:'CS 2',
            image:'/images/slides/cs2Slide.jpg',
            link:'#',
            content:'',
            id:2
            
        }    
    ])
    function setCurrentSlide(){
     currentSlide.value = slides.value.filter(slide => slide.id == currentId.value)
    }
    setCurrentSlide()
    function nextSlide(){
        currentId.value++
        if(currentId.value > slides.value.length){
            currentId.value = 1
        } 
    }
    function prevSlide(){
        currentId.value--
        if(currentId.value < 1){
            currentId.value = slides.value.length
        }
    }
    watch(currentId, async (newData, oldData) =>{
        if(oldData != newData){
            setCurrentSlide()
        }
    })
</script>
<style lang="scss" scoped>
    .slideContainer{
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;
        z-index: 2;
        background-color: var(--secondaryBg);
        border-radius: var(--radiusMd);
        .arrowBtn{
            cursor: pointer;
            svg{
                transition: 250ms;
                height: 25px;
                filter:drop-shadow(2px 2px 2px hsla(0,0%,0%,0.5))
            }
        }
        .arrowBtn:nth-child(1){
            padding-left: 2rem;
            &:hover{
                svg{
                    transform: translateX(-5px);
                }
            }
        }
        .arrowBtn:nth-child(4){
            padding-right: 2rem;
            &:hover{
                svg{
                    transform: translateX(5px);
                }
            }
        }
        .SlideIndicatorContainer{
            display: flex;
            gap: 1rem;
            height: 100%;
            align-items: flex-end;
            padding-bottom: 2rem;
            .indicator{
                width: 20px;
                height: 20px;
                background-color:white;
                opacity: 0.5;
                border-radius: 100%;
                transition: 250ms;
                &.active{
                    opacity: 1;
                }
            }
        }
        .slide{
            position: absolute;
            width: 100%;
            height: 100%;
            z-index: -1;
            img{
                width: 100%;
                height: 100%;
                object-fit: cover;
                border-radius: var(--radiusMd);
                position: absolute;
                z-index: 0;
            }
        }
    }
</style>