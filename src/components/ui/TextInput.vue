<template>
    <input 
        type="text"
        :value="modalValue"
        :placeholder="placeholder"
    />
</template>

<script setup lang="ts">
    interface Props {
        modalValue: string
        placeholder: string
    }

    const props = withDefaults(defineProps<Props>(), {
        placeholder: 'enter word...'
    })

</script>                                                                       

<style scoped>
    @import '../../styles/components/_input.scss';
</style>
