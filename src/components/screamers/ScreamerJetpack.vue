<template>
  <ScreamerBase :is-active="isActive" overlay-name="screamer-rickroll" @close="emit('close')">
    <template #content>
      <video
        ref="videoRef"
        autoplay
        playsinline
        id="bg-video"
        @ended="handleVideoEnded"
        @loadedmetadata="onVideoMetadataLoaded"
      >
        <source src="../../assets/video/jetpack-joyride-dance.mp4" type="video/mp4" />
      </video>

      <ul id="info-list" ref="infoListRef">
        <li v-for="(item, index) in displayedItems" :key="index">
          {{ item }}
        </li>
      </ul>
    </template>
  </ScreamerBase>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted, watch, nextTick } from 'vue';
import ScreamerBase from './ScreamerBase.vue';
import { Userinfo } from '../../utils/userinfo';
import type { PositionData, BatteryData, IPData } from '../../utils/userinfo';

interface Props {
  isActive: boolean;
  textStartTime?: number;
  textEndTime?: number;
}

const props = defineProps<Props>();
const emit = defineEmits<{ close: [] }>();

const videoRef = ref<HTMLVideoElement | null>(null);
const infoListRef = ref<HTMLElement | null>(null);

const handleVideoEnded = (): void => {
  emit('close');
};

const userInfo = reactive(new Userinfo());

const position = ref<PositionData | null>(null);
const battery = ref<BatteryData | null>(null);
const ip = ref<IPData | null>(null);

const browserInfo = userInfo.browserInfo();
const sizeScreen = userInfo.sizeScreen();
const timezone = userInfo.timezone;

const displayedItems = ref<string[]>([]);
const infoItems = ref<string[]>([]);

async function loadAsyncData() {
  try {
    position.value = await userInfo.position();
  } catch {
    position.value = null;
  }
  try {
    battery.value = await userInfo.battery();
  } catch {
    battery.value = null;
  }
  try {
    ip.value = await userInfo.ip();
  } catch {
    ip.value = null;
  }
}

function prepareInfoItems() {
  infoItems.value = [
    `IP: ${ip.value?.ipAddress ?? 'Неизвестно'}`,
    `N: ${position.value?.lat ?? 'Неизвестно'}`,
    `W: ${position.value?.long ?? 'Неизвестно'}`,
    `CITY: ${ip.value?.city ?? 'Неизвестно'}`,
    `COUNTRY: ${ip.value?.countryName ?? 'Неизвестно'}`,
    `CODECOUNTRY: ${ip.value?.countryCode ?? 'Неизвестно'}`,
    `CONTINENT: ${ip.value?.continentName ?? 'Неизвестно'}`,
    `STATE: ${ip.value?.stateProv ?? 'Неизвестно'}`,
    `LEVELBATTERY: ${battery.value?.level ?? 'Неизвестно'}`,
    `SCREEN: ${sizeScreen.width} x ${sizeScreen.height}`,
    `CLINETSCREEN: ${sizeScreen.clientWidth} x ${sizeScreen.clientHeight}`,
    `DEPTH: ${sizeScreen.pixelDepth}`,
    `COLORDEPTH: ${sizeScreen.colorDepth}`,
    `LANG: ${browserInfo.language}`,
    `TIMEZONE: ${timezone}`,
  ];
}

let displayIntervalId: number | null = null;
let startTimeoutId: number | null = null;
let currentIndex = 0;

async function checkOverflow(): Promise<boolean> {
  await nextTick();
  
  if (!infoListRef.value) return false;
  
  const padding = 20;
  const rect = infoListRef.value.getBoundingClientRect();
  const viewportHeight = window.innerHeight;
  
  return rect.top < padding || rect.bottom > viewportHeight - padding;
}

async function addNextItem() {
  if (currentIndex >= infoItems.value.length) {
    if (displayIntervalId) {
      clearInterval(displayIntervalId);
      displayIntervalId = null;
    }
    return;
  }
  
  displayedItems.value.push(infoItems.value[currentIndex]!);
  currentIndex++;
  
  const overflow = await checkOverflow();
  
  if (overflow) {
    displayedItems.value = [];
  }
}

function startDisplayingText() {
  if (!videoRef.value) return;

  if (displayIntervalId) {
    clearInterval(displayIntervalId);
    displayIntervalId = null;
  }
  if (startTimeoutId) {
    clearTimeout(startTimeoutId);
    startTimeoutId = null;
  }

  displayedItems.value = [];
  currentIndex = 0;

  const videoDuration = videoRef.value.duration || 10;

  const startTime = props.textStartTime !== undefined ? props.textStartTime : 0;
  const endTime = props.textEndTime !== undefined ? props.textEndTime : videoDuration;

  const clampedStart = Math.min(Math.max(startTime, 0), videoDuration);
  const clampedEnd = Math.min(Math.max(endTime, 0), videoDuration);
  const effectiveEnd = clampedEnd > clampedStart ? clampedEnd : videoDuration;

  const displayDuration = (effectiveEnd - clampedStart) * 1000;
  const interval = infoItems.value.length > 0 ? displayDuration / infoItems.value.length : 0;

  const currentTime = videoRef.value.currentTime || 0;
  const initialDelayMs = Math.max(clampedStart - currentTime, 0) * 1000;

  startTimeoutId = window.setTimeout(() => {
    if (interval <= 0) {
      displayedItems.value = [...infoItems.value];
      return;
    }
    
    displayIntervalId = window.setInterval(() => {
      addNextItem();
    }, interval);
  }, initialDelayMs);
}

onMounted(async () => {
  await loadAsyncData();
  prepareInfoItems();
  
  window.addEventListener('resize', adjustScale);
  window.addEventListener('load', adjustScale);
});

watch(() => props.isActive, (active) => {
  if (active) {
    if (videoRef.value) {
      videoRef.value.currentTime = 0;
      videoRef.value.play();
    }
  } else {
    if (displayIntervalId) {
      clearInterval(displayIntervalId);
      displayIntervalId = null;
    }
    if (startTimeoutId) {
      clearTimeout(startTimeoutId);
      startTimeoutId = null;
    }
    displayedItems.value = [];
  }
});

function onVideoMetadataLoaded() {
  if (props.isActive) {
    startDisplayingText();
  }
}

function adjustScale(): void {
  const el = infoListRef.value;
  if (!el) return;

  let scale = 1;
  const padding = 10;
  const step = 0.01;

  el.style.transformOrigin = 'center center';
  el.style.transform = 'translate(-50%, -50%) scale(1)';

  let rect = el.getBoundingClientRect();
  const viewportHeight = window.innerHeight;

  while ((rect.top < padding || rect.bottom > viewportHeight - padding) && scale > 0.3) {
    scale -= step;
    el.style.transform = `translate(-50%, -50%) scale(${scale.toFixed(2)})`;
    rect = el.getBoundingClientRect();
  }
}
</script>

<style scoped lang="scss">
#bg-video {
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  background: black;
  position: relative;
  z-index: 1;
}

#info-list {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-family: sans-serif;
  font-size: 2vw;
  max-width: 90vw;
  list-style: none;
  padding: 0;
  margin: 0;
  z-index: 10;
  -webkit-text-stroke: 2px black;
  text-stroke: 2px black;
  text-align: center;
  opacity: 0;
  animation: fadeIn 1s forwards;
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}
</style>
