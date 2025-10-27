<template>
    <Transition>
        <div
            v-if="isActive"
            class="screamer-overlay"
            :class="OverlayName"

        >
            <div class="screamer-content">

            </div>
        </div>
    </Transition>
</template>

<script setup lang="ts">
    interface Props {
        isActive: boolean
        OverlayName: string
    }

    defineProps<Props>()

</script>                                                                       

<style scoped>
.screamer-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
}
</style>
