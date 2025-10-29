<template>
    <Transition>
        <div
            v-if="isActive"
            class="screamer-overlay"
            :class="overlayName"
            @click="handleClose"

        >
            <div class="screamer-content">
                <slot name='content'></slot>
            </div>
        </div>  
    </Transition>
</template>

<script setup lang="ts">
    interface Props {
        isActive: boolean
        overlayName: string
    }

    defineProps<Props>()

    const emit = defineEmits<{
        close: []
    }>()

    const handleClose = (): void => {
        emit('close')
    }

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
    cursor: pointer;
}

.screamer-boo {
    background: radial-gradient(circle, #ff0000, #8b0000);
}

.screamer-pumpkin {
    background: #281818ff;
    /* background: radial-gradient(circle, #201e1eff, #281818ff); */
}

.screamer-ghost {
    background: #181a28ff
    /* background: radial-gradient(circle, #1e1e20ff, #181a28ff); */
}

.screamer-spider {
    background: #281818
    /* background: radial-gradient(circle, #1e1e20ff, #181a28ff); */
}

</style>
