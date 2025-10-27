<template>
    <ScreamerBase
        :is-active="isActive"
        transition-name="screamer-zoom"
        overlay-class="screamer-red"
        text-animation-class="shake"
        @close="emit('close')"
    >
        <template #emoji>😱 БУ!</template>
        <template #text>Испугался?</template>
    </ScreamerBase>
</template>

<script setup lang="ts">

interface Props {
    isActive: boolean
}

defineProps<Props>()

const emit = defineEmits<{
    close: []
}>()
</script>
