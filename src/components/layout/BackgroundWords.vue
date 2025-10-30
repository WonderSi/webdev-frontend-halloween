<template>
    <div class="background-words">
        <TransitionGroup name="word-fade">
            <div
                v-for="word in visibleWords"
                :key="word.id"
                class="floating-word"
                :style="{
                    left: word.x + '%',
                    top: word.y + '%',
                    fontSize: word.size + 'px'
                }"
            >
                {{ word.text }}
            </div>
        </TransitionGroup>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { TRIGGER_WORDS } from '../../utils/constants'

interface FloatingWord {
    id: number
    text: string
    x: number
    y: number
    size: number
}

interface Props {
    isPaused?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    isPaused: false
})

const visibleWords = ref<FloatingWord[]>([])
let wordIdCounter = 0
let intervalId: number | null = null

const getRandomWord = (): string => {
    const randomIndex = Math.floor(Math.random() * TRIGGER_WORDS.length)
    return TRIGGER_WORDS[randomIndex]!
}

const getRandomPosition = (): { x: number, y: number } => {
    return {
        x: Math.random() * 90 + 5,
        y: Math.random() * 90 + 5
    }
}

const getRandomSize = (): number => {
    return Math.floor(Math.random() * 30) + 20
}

const addWord = (): void => {
    const position = getRandomPosition()
    const newWord: FloatingWord = {
        id: wordIdCounter++,
        text: getRandomWord(),
        x: position.x,
        y: position.y,
        size: getRandomSize()
    }
    
    visibleWords.value.push(newWord)
    
    const displayTime = Math.random() * 2000 + 3000
    setTimeout(() => {
        const index = visibleWords.value.findIndex(w => w.id === newWord.id)
        if (index !== -1) {
            visibleWords.value.splice(index, 1)
        }
    }, displayTime)
}

const startInterval = (): void => {
    if (intervalId === null) {
        intervalId = window.setInterval(() => {
            if (visibleWords.value.length < 8) {
                addWord()
            }
        }, Math.random() * 1000 + 1000)
    }
}

const stopInterval = (): void => {
    if (intervalId !== null) {
        clearInterval(intervalId)
        intervalId = null
    }
}

const clearAllWords = (): void => {
    visibleWords.value = []
}

watch(() => props.isPaused, (newValue) => {
    if (newValue) {
        stopInterval()
        clearAllWords()
    } else {
        startInterval()
    }
})

onMounted(() => {
    if (!props.isPaused) {
        startInterval()
    }
})

onUnmounted(() => {
    stopInterval()
})
</script>

<style scoped>
.background-words {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 0;
    overflow: hidden;
}

.floating-word {
    position: absolute;
    color: rgba(129, 72, 1, 0.15);
    font-weight: 700;
    text-transform: uppercase;
    font-family: 'Arial', sans-serif;
    letter-spacing: 2px;
    user-select: none;
    pointer-events: none;
}

.word-fade-enter-active {
    transition: all 1.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.word-fade-leave-active {
    transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.word-fade-enter-from {
    opacity: 0;
    transform: scale(0.8);
}

.word-fade-leave-to {
    opacity: 0;
}
</style>
