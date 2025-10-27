<template>
  <div id="app" class="container">
    <Input/>
  </div>
</template>

<script setup lang="ts">
import { ref} from 'vue'
import Input from './components/ui/TextInput.vue';

const inputText = ref<string>('')

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
