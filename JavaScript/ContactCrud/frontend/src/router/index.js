import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/pages/HomePage.vue';
import DetailsPage from '@/pages/DetailsPage.vue';
import CreatePage from '@/pages/CreatePage.vue';

const routes = [
  { path: '/', component: HomePage },
  { path: '/contact/:id', component: DetailsPage },
  { path: '/create', component: CreatePage },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
