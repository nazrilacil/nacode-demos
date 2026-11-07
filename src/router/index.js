import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home.vue';

export const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: '/', name: 'home', component: Home }],
  scrollBehavior(to) {
    if (to.hash) return { el: to.hash, behavior: 'smooth' };
    return { top: 0 };
  },
});