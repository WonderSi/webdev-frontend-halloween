<template>
    <ScreamerBase
        :is-active="isActive"
        overlay-name="screamer-zombie"
        @close="emit('close')"
    >
        <template #content>
            <div class="ear center"></div>
            <div class="zombie center">
                <div class="brain"></div>
                <div class="eyes"></div>
                <div class="mouth"></div>
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
.center {
  position: absolute;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 50%;
}

.zombie {
  background-color: #75bc83;
  height: 32.5em;
  width: 23.75em;
  border-radius: 11.87em;
  box-shadow: inset 4.37em 0 rgba(39, 158, 92, 0.5);

  &:before {
    position: absolute;
    content: "";
    height: 2.5em;
    width: 2.5em;
    background-color: #83c65d;
    border-radius: 50%;
    top: 7.18em;
    left: 6.87em;
    box-shadow: -3.75em -2.18em 0 0.62em #83c65d, -2.5em 2.81em 0 0.31em #83c65d;
  }
}

.brain {
  height: 15em;
  width: 15em;
  background-color: #281818;
  position: absolute;
  right: -3.12em;
  top: -5em;
  border-radius: 50%;
  overflow: hidden;

  &:before {
    position: absolute;
    content: "";
    background-color: #f96eb3;
    height: 15.62em;
    width: 15.62em;
    border-radius: 50%;
    top: 5.62em;
    right: 4.37em;
    box-shadow: inset 9em -8.12em #d83a6f;
  }
}

.eyes {
  position: absolute;
  height: 6.25em;
  width: 1.87em;
  background-color: #2a2d49;
  border-radius: 2.5em;
  transform: rotate(-45deg);
  top: 13.75em;
  left: 6.25em;
  box-shadow: 6.87em 6.87em #2a2d49;

  &:before {
    content: "";
    position: absolute;
    height: 6.25em;
    width: 1.87em;
    background-color: #2a2d49;
    border-radius: 2.5em;
    transform: rotate(90deg);
    box-shadow: 6.87em -6.87em #2a2d49;
  }
}

.mouth {
  position: absolute;
  background-color: #2a2d49;
  height: 5em;
  width: 10.62em;
  transform: translateX(-50%);
  left: 50%;
  top: 22.5em;
  animation: move-mouth 2s infinite;
  border-radius: 3.12em 3.12em 0 0;

  &:before {
    content: "";
    position: absolute;
    height: 3.43em;
    width: 7.5em;
    background-color: #f96eb3;
    transform: translateX(-50%);
    left: 50%;
    bottom: 0;
    border-radius: 3.43em 3.43em 0 0;
    box-shadow: inset 3.12em 0.62em #d83a6f;
  }

  &:after {
    position: absolute;
    content: "";
    height: 2.5em;
    width: 1.875em;
    background-color: #f96eb3;
    bottom: -2.5em;
    right: 1.56em;
    border-radius: 0 0 1.56em 1.56em;
  }
}

.ear {
  height: 7.5em;
  width: 31.25em;
  background-color: #279e5c;
  border-radius: 6.25em;

  &:before,
  &:after {
    position: absolute;
    content: "";
    height: 1.25em;
    width: 2.5em;
    border-radius: 2.5em 2.5em 0 0;
    border: 0.9em solid #0c843d;
    border-bottom: none;
    top: 2.5em;
  }

  &:before {
    transform: rotate(45deg);
    left: 0.93em;
  }

  &:after {
    transform: rotate(-45deg);
    right: 0.93em;
  }
}

@keyframes move-mouth {
    0%, 100% {
        transform: translateX(-50%) translateY(0%);
    }

    50% {
        transform: translateX(-50%) translateY(-0.25em);
    }
}

</style>
