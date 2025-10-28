<template>
    <ScreamerBase
        :is-active="isActive"
        overlay-name="screamer-boo"
        @close="emit('close')"
    >
    </ScreamerBase>
</template>

<script setup lang="ts">
import ScreamerBase from './ScreamerBase.vue';

interface Props {
    isActive: boolean
}

defineProps<Props>()

const emit = defineEmits<{
    close: []
}>()
</script>
