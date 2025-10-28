<template>
    <ScreamerBase
        :is-active="isActive"
        overlay-name="screamer-ghost"
        @close="emit('close')"
    >
        <template #content>
            <div class="spooky">
                <div class="body">
                    <div class="eyes"></div>
                    <div class="mouth"></div>
                    <div class="feet">
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            </div>
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
</script>

<style scoped lang="scss">
.spooky {
    font-size: 2em;
    margin: 10% auto;
    width: 80%;
    height: 80%;
    animation: floaty 2s infinite;

    .body {
        position: relative;
        margin: 50px auto 0;
        width: 180px;
        height: 220px;
        background: #f2fbf1;
        border-top-left-radius: 90px;
        border-top-right-radius: 90px;

        &:before,
        &:after {
            content: '';
            position: absolute;
            top: 130px;
            display: inline-block;
            width: 36px;
            height: 36px;
            border-radius: 50%;
            background: #f2fbf1;
            animation: floaty .2s infinite;
        }

        &:before {
            left: -18px;
        }

        &:after {
            right: -18px;
        }

        .eyes {
            display: flex;
            justify-content: space-between;
            margin: 0 auto;
            padding: 90px 0 0;
            width: 90px;
            height: 20px;

            &:before,
            &:after {
                content: ' ';
                display: block;
                width: 30px;
                height: 30px;
                background: #252c49;
                border-radius: 50%;
            }
        }

        .mouth {
            background: #252c49;
            margin: 40px auto 0;
            width: 60px;
            height: 30px;
            border-bottom-left-radius: 30px;
            border-bottom-right-radius: 30px;

            &:before {
                content: ' ';
                display: block;
                background: #fff;
                margin-left: 20px;
                width: 10px;
                height: 10px;
            }
        }

        .feet {
            position: absolute;
            display: flex;
            bottom: -18px;
            width: 180px;
            height: 36px;

            & > *,
            &::before,
            &::after {
                content: ' ';
                width: 36px;
                height: 36px;
                background: #f2fbf1;
                border-radius: 50%;
            }
        }
    }
}

@keyframes floaty {
    0%, 100% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(-20px);
    }
}
</style>
