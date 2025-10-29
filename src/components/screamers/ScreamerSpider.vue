<template>
    <ScreamerBase
        :is-active="isActive"
        overlay-name="screamer-spider"
        @close="emit('close')"
    >
        <template #content>
            <div class="spiders">
                <div
                v-for="(spider, index) in spiderConfigs"
                :key="index"
                class="spider"
                :style="{
                    fontSize: spider.size,
                }"
                >
                <div class="spiderweb"></div>
                <div class="body">
                    <div class="eye left"></div>
                    <div class="eye right"></div>
                </div>
                <div class="legs left">
                    <div class="leg"></div>
                    <div class="leg"></div>
                    <div class="leg"></div>
                </div>
                <div class="legs right">
                    <div class="leg"></div>
                    <div class="leg"></div>
                    <div class="leg"></div>
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

interface SpiderConfig {
    size: string;
    scale?: number;
}

defineProps<Props>();

const emit = defineEmits<{
    close: [];
}>();

const spiderConfigs: SpiderConfig[] = [
    { size: '1.5em', },
    { size: '2em' },
    { size: '1em' } 
];
</script>

<style scoped lang="scss">
.spiders {
    display: flex;
    justify-content: center;
    align-items: start;
    gap: 3em;
    position: relative;
    width: 100vw;
    height: 100vh;
    padding-inline: 20%;
}
.spider {
    display: inline-block;
    animation: swing 2s infinite;
    transform-origin: top;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);

    &:hover {
        animation-play-state: paused;
    }

    .spiderweb {
        width: 0.1em;
        height: 10em;
        margin-left: 2.45em;
        background: rgba(255, 255, 255, 0.7);
    }

    .body {
        width: 5em;
        height: 4em;
        background: #000;
        position: relative;
        border-radius: 50%;

        .eye {
            width: 1.65em;
            height: 1.65em;
            position: absolute;
            bottom: 1em;
            background: #fff;
            border-radius: 50%;

            &:after {
                background: #000;
                width: 0.35em;
                height: 0.35em;
                content: '';
                display: block;
                margin: 55%;
                border-radius: 50%;
                animation: look 8s infinite;
            }

            &.left {
                left: 0.75em;
            }

            &.right {
                right: 0.75em;
            }
        }
    }

    .legs {
        position: absolute;
        bottom: -10%;
        z-index: -1;

        &.left {
            left: -70%;

            .leg {
                width: 4em;
                height: 2em;
                margin-top: -1em;
                border: 0.25em solid transparent;
                border-top-color: #000;
                border-radius: 2em 2em 0 0;

                &:nth-child(1) {
                    transform: rotate(10deg);
                    margin-left: 0.5em;
                }

                &:nth-child(2) {
                    transform: rotate(-20deg);
                    margin-left: 1em;
                }

                &:nth-child(3) {
                    transform: rotate(-50deg);
                    margin-left: 1.5em;
                }
            }
        }

        &.right {
            right: -60%;

            .leg {
                width: 4em;
                height: 2em;
                margin-top: -1em;
                border: 0.25em solid transparent;
                border-top-color: #000;
                border-radius: 2em 2em 0 0;

                &:nth-child(1) {
                    transform: rotate(-10deg);
                    margin-left: -0.5em;
                }

                &:nth-child(2) {
                    transform: rotate(20deg);
                    margin-left: -1em;
                }

                &:nth-child(3) {
                    transform: rotate(50deg);
                    margin-left: -1.5em;
                }
            }
        }
    }
}

@keyframes look {
    0%, 40%, 100% {
        transform: translateX(0);
    }

    45%, 95% {
        transform: translateX(-110%);
    }
}

@keyframes swing {
    0%, 100% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(-1em);
    }
}
</style>
