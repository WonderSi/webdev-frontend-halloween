<template>
    <ScreamerBase
        :is-active="isActive"
        overlay-name="screamer-rickroll"
        @close="emit('close')"
    >
        <template #content>
            <video 
                autoplay 
                playsinline
                id="bg-video"
                @timeupdate="handleVideoEnded"
            >
                <source src="../../assets/video/rick-roll.mp4" type="video/mp4" />
            </video>
        </template>
    </ScreamerBase>
</template>

<script setup lang="ts">
import ScreamerBase from "./ScreamerBase.vue";

interface Props {
    isActive: boolean;
}

defineProps<Props>();

const emit = defineEmits<{
    close: [];
}>();

const handleVideoEnded = (): void => {
    const video = event.target as HTMLVideoElement;
    if (video.currentTime >= 8.5) {
        emit('close');
    }
};
</script>

<style scoped lang="scss">
#bg-video {
    width: 100vw;
    height: 100vh;
    object-fit: cover;
    background: black;
}
</style>
