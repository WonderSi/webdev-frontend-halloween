<template>
    <input 
        type="text"
        :value="modelValue"
        :placeholder="placeholder"
        @input="handleInput"
        name="main-input"
    />
</template>

<script setup lang="ts">
    interface Props {
        modelValue: string
        placeholder: string
    }

    defineProps<Props>()

    const emit = defineEmits<{
    'update:modelValue': [value: string]
    }>()

    const handleInput = (event: Event): void => {
        const target = event.target as HTMLInputElement
        emit('update:modelValue', target.value)
    }

</script>

<style scoped>
    @import '../../styles/components/_input.scss';
</style>
