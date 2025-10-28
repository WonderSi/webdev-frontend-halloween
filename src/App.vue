<template>
  <div id="app" class="container">
    <TextInput
      v-model="inputText"
      placeholder="Enter the word"
    />

    <ScreamerBoo
      :is-active="activeScreamer === 'бу'"
      @close="closeScreamer"
    />
  </div>
</template>

<script setup lang="ts">
  import { ref, watch } from 'vue'
  import TextInput from './components/ui/TextInput.vue';
  import ScreamerBoo from './components/screamers/ScreamerBoo.vue'
  import { TRIGGER_WORDS } from './utils/constants';
  import type { TriggerWord } from './types/index'

  const inputText = ref<string>('')
  const activeScreamer = ref<TriggerWord | ''>('')

  const closeScreamer = ():void => {
    activeScreamer.value = ''
    inputText.value = ''
  }

  watch(inputText, (newValue: string) => {
    const lowerValue = newValue.toLowerCase().trim()
    for (const word of TRIGGER_WORDS) {
      if (lowerValue.includes(word)) {
        activeScreamer.value = word
        setTimeout(closeScreamer, 3000)
        console.log(word)
        break
      }
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
    background: #222;
    overflow: hidden;
    position: relative;
}
</style>
