<template>
    <ScreamerBase
        :is-active="isActive"
        overlay-name="screamer-rickroll"
        @close="emit('close')"
    >
        <template #content>
            <video 
                ref="videoRef"
                autoplay 
                playsinline
                id="bg-video"
                @ended="handleVideoEnded"
            >
                <source src="../../assets/video/jetpack-joyride-dance.mp4" type="video/mp4" />
            </video>
        </template>
    </ScreamerBase>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ScreamerBase from "./ScreamerBase.vue";

interface Props {
    isActive: boolean;
}

defineProps<Props>();

const emit = defineEmits<{
    close: [];
}>();

const videoRef = ref<HTMLVideoElement | null>(null);

const handleVideoEnded = (): void => {
    if (videoRef.value) {
        videoRef.value.pause();
    }
    emit('close');
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
