<template>
	<div>
        <div class="spoiler" @click="open">{{ title }} <font-awesome-icon :class="contentHight != 0 ? 'open' : '' " icon="fa-solid fa-chevron-down" /></div>
        <div class="content" :style="{height:contentHight + 'px'}">
            <div ref="content" class="content-inner">
                <slot></slot>
            </div>
        </div>
    </div>
</template>
<script setup>
const porps = defineProps({
    title:String
})
const contentHight = ref(0)
const content = ref(null)
function open(){
    if(contentHight.value == 0){
        contentHight.value = content.value.scrollHeight
        return 
    }
    contentHight.value = 0
}
</script>
<style lang="scss" scoped>
.spoiler{
    background-color: var(--tertiaryBg);
    padding: 1.5rem;
    border-radius: var(--radiusMd);
    position: relative;
    z-index: 2;
    display: flex;
    justify-content: space-between;
    font-weight: 600;
    font-size: var(--fontMd);
    svg{
        transition: 250ms;
    }
    .open{
        transform: rotate(-90deg);
    }
}
.content{
    overflow: hidden;
    transition: 250ms;
    background-color: var(--primaryBg);
    margin-top: -0.7rem;
    border-bottom-left-radius: var(--radiusMd);
    border-bottom-right-radius: var(--radiusMd);
    &-inner{
        display: flex;
        flex-direction: column;
        padding: 2rem;
        height: fit-content;
        gap: 1rem;
    }
}
</style>