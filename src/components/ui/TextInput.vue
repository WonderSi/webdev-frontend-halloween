<template>
    <input 
        type="text" 
        :placeholder="placeholder"
    />
</template>

<script setup lang="ts">
    interface Props {
        placeholder?: string
    }

    const props = withDefaults(defineProps<Props>(), {
        placeholder: 'enter word...'
    })

</script>                                                                       

<style scoped>
    @import '../../styles/components/_input.scss';
</style>
