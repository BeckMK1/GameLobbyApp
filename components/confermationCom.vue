<template>
		<div class="ConfermationMessage" v-if="message != ''">{{ message.toString() }}</div>
</template>
<script setup>
const props = defineProps({
    confermationMessage:{
        default:'',
        type:String
    }
})
const checkMessage = computed(() => props.confermationMessage)
const message = ref("")
function setMessage(){
        message.value = props.confermationMessage
        setTimeout(()=>{
            message.value = ""
        }, 3000)
}
watch(checkMessage, async () =>{
    if(props.confermationMessage != ''){
        setMessage()
    }
})
</script>
<style lang="scss">
.ConfermationMessage{
  position: absolute;
  left: 50%;
  bottom: 10rem;
  background-color: var(--tertiaryBg);
  padding: 1rem;
  transform: translateX(-50%);
  border-radius: var(--radiusSm);
}
</style>