<template>
    <div id="app" class="container">
        <TextInput
            v-model="inputText"
            placeholder="Enter the word"
            @keyup.enter="acceptWord"
        />

        <Transition name="fade">
            <div v-if="showLabel">
              <LabelConfimation />
            </div>
        </Transition>


        <ScreamerBoo
            :is-active="activeScreamer === 'бу' || activeScreamer === 'boo'"
            @close="closeScreamer"
        />

        <ScreamerPumpkin
            :is-active="activeScreamer === 'тыква' || activeScreamer === 'pumpkin'"
            @close="closeScreamer"
        />

        <ScreamerGhost
            :is-active="activeScreamer === 'призрак' || activeScreamer === 'ghost'"
            @close="closeScreamer"
        /> 

        <ScreamerZombie
            :is-active="activeScreamer === 'зомби' || activeScreamer === 'zombie'"
            @close="closeScreamer"
        />

        <ScreamerSpider
            :is-active="activeScreamer === 'паук' || activeScreamer === 'spider'"
            @close="closeScreamer"
        />

        <ScreamerJetpack
            :is-active="activeScreamer === '404'"
            :text-start-time="12.5" 
            :text-end-time="20"
            @close="closeScreamer"
        />

    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import TextInput from './components/ui/TextInput.vue';
import LabelConfimation from './components/ui/LabelConfimation.vue';
import ScreamerBoo from './components/screamers/ScreamerBoo.vue'
import ScreamerPumpkin from './components/screamers/ScreamerPumpkin.vue'
import ScreamerGhost from './components/screamers/ScreamerGhost.vue'
import ScreamerZombie from './components/screamers/ScreamerZombie.vue';
import ScreamerSpider from './components/screamers/ScreamerSpider.vue'
import ScreamerJetpack from './components/screamers/ScreamerJetpack.vue'
import { TRIGGER_WORDS } from './utils/constants';
import type { TriggerWord } from './types/index'

const inputText = ref<string>('')
const activeScreamer = ref<TriggerWord | ''>('')
const showLabel = ref<boolean>(false)

const closeScreamer = ():void => {
    activeScreamer.value = ''
    inputText.value = ''
}

const acceptWord = (): void => {
    const word = inputText.value.toLowerCase().trim() as TriggerWord
    if (TRIGGER_WORDS.includes(word)) {
        activeScreamer.value = word
        inputText.value = ''
    }
}

watch(inputText, (newValue: string) => {
    const lowerValue = newValue.toLowerCase().trim() as TriggerWord

    if (TRIGGER_WORDS.includes(lowerValue)) {
        showLabel.value = true
        console.log(lowerValue)
    } else {
        showLabel.value = false
    }
})

</script>

<style>
@import './styles/base/_reset.scss';
@import './styles/base/_typography.scss';

.container {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background: #222;
    overflow: hidden;
    position: relative;
}

.fade-enter-active,
.fade-leave-active {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
