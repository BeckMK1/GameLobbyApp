<template>
	<div class="convertedLink" ><a class="tag tagDark" target="_blank" :href="convertedLink.link">{{ convertedLink.name }}</a></div>
</template>
<script setup>
const props = defineProps({
    link:String,
})
const convertedLink = ref({
    name:'',
    link:''
})
function convertLink(){
    const pattern = /^(?:https?:\/\/)?(?:www\.)?([^\.]*)\./
    if(props.link.startsWith("https://")){
        convertedLink.value.link = props.link
        convertedLink.value.name = props.link.match(pattern)[1]
        return
    }
    convertedLink.value.name = props.link.match(pattern)[1]
    convertedLink.value.link = 'https://' + props.link
}
convertLink()
</script>
<style lang="scss" scoped>
a{
    text-decoration: none;
}
</style>