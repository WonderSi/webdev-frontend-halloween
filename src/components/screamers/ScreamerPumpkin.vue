<template>
    <ScreamerBase
        :is-active="isActive"
        overlay-name="screamer-pumpkin"
        @close="emit('close')"
    >
        <template #content>
            <div class="pumpkin">
                <div class="texture"></div>
                <div class="root"></div>
                <div class="eye left"></div>
                <div class="eye right"></div>
                <div class="mouth left"></div>
                <div class="mouth right"></div>
                <div class="teeth"></div>
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
.pumpkin {
    font-size: 2em;
    height: 11em;
    width: 15em;
    background: #f68632;
    border: 0.4em solid #a14907;
    border-radius: 70%/110%;
    position: relative;
    z-index: 1;
    animation: float 3s infinite;

    .texture {
        height: 10.8em;
        width: 6.5em;
        position: absolute;
        bottom: -0.4em;
        left: 4em;
        border-radius: 70%/130%;
        border-bottom: 0.5em solid #a14907;
        border-top: 0.5em solid #a14907;

        &:after {
            content: "";
            display: block;
            height: 10.7em;
            width: 12em;
            position: absolute;
            bottom: -0.4em;
            left: -2.5em;
            border-radius: 70%/130%;
            border-bottom: 0.5em solid #a14907;
            border-top: 0.5em solid #a14907;
        }
    }

    .root {
        background: #517f54;
        height: 2.8em;
        width: 1.25em;
        position: absolute;
        left: calc(7.5em - 0.625em);
        top: -2.7em;
        transform: rotate(5deg);
        border-radius: 30% 20% 70% 10%;
        z-index: -1;
        box-shadow: inset 0 0px 10px #29412b;
    }

    .eye {
        position: absolute;
        width: 0;
        height: 0;
        border-top: 0.8em solid transparent;
        top: 2.8em;

        &.right {
            right: 3.7em;
            transform: rotate(30deg);
            border-bottom: 2.1em solid transparent;
            border-left: 2.4em solid #401d03;
        }

        &.left {
            left: 3.7em;
            transform: rotate(-30deg);
            border-bottom: 2.1em solid transparent;
            border-right: 2.4em solid #401d03;
        }
    }

    .mouth {
        width: 4em;
        height: 2em;
        position: absolute;
        bottom: 1.5em;
        border-bottom: 1em solid #401d03;

        &.right {
            right: 3.2em;
            border-radius: 0 0 100% 0;
        }

        &.left {
            left: 3.2em;
            border-radius: 0 0 0 100%;
        }
    }

    .teeth {
        width: 0.5em;
        height: 1em;
        position: absolute;
        top: 7.0em;
        left: 7.25em;
        border-top: 0.8em solid transparent;
        border-bottom: 0em solid transparent;
        border-left: 0.8em solid #401d03;

        &:before,
        &:after {
            content: "";
            display: block;
            position: absolute;
            width: 0;
            height: 0;
            border-top: 0.8em solid transparent;
        }

        &:before {
            right: 2.2em;
            top: -0.65em;
            transform: rotate(30deg);
            border-bottom: 0.5em solid transparent;
            border-left: 1em solid #401d03;
        }

        &:after {
            left: 1em;
            top: -0.85em;
            transform: rotate(30deg);
            border-bottom: 0.5em solid transparent;
            border-left: 1em solid #401d03;
        }
    }
}

@keyframes float {
    100% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(-10%);
    }
}

@keyframes zoom {
    100% {
        transform: scale(1);
    }

    50% {
        transform: scale(0.8);
    }
}
</style>
