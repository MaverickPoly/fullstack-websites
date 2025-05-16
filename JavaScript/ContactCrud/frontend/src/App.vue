<script setup>
import NavBar from '@/components/NavBar.vue';
import { Toast } from 'primevue';
</script>

<template>
  <Toast />
  <NavBar />

  <RouterView />
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,100..900;1,100..900&display=swap');

* {
  font-family: 'Noto Sans', sans-serif;
  padding: 0;
  margin: 0;
}
</style>
