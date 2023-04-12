<script setup lang="ts">
import { computed } from 'vue'
import TheWelcome from '../components/TheWelcome.vue'
import { useStore } from 'vuex'
import { useMapState } from '@/hooks/useMapState'
const appStore: any = useStore();
const cusCounter = computed(() => appStore.state.user.userCounter)
console.log(appStore.state)
appStore.dispatch('user/increaseAction', 4)
</script>

<template>
  <main>
    <!-- <TheWelcome /> -->
    cusCounter: {{  cusCounter  }}
  </main>
</template>
