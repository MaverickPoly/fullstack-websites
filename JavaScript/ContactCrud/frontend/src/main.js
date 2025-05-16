import { createApp } from 'vue';

import App from './App.vue';
import { router } from '@/router/index.js';
import { createPinia } from 'pinia';

import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import 'primeicons/primeicons.css';
import ToastService from 'primevue/toastservice';

const app = createApp(App);

const pinia = createPinia();

app.use(router);
app.use(pinia);

app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
});
app.use(ToastService);

app.mount('#app');
