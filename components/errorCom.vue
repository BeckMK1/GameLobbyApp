<template>
	<div class="errorMessage" v-if="errorMessage != ''">Error: {{ errorMessage.toString() }}</div>
</template>
<script setup>
const props = defineProps({
    errorMessage:{
        default:'',
        type:String
    }
})
</script>
<style lang="scss" scoped>
.errorMessage{
  position: absolute;
  left: 50%;
  bottom: 10rem;
  background-color: var(--tertiaryBg);
  padding: 1rem;
  transform: translateX(-50%);
}
</style>