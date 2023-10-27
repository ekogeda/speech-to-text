import { createRouter, createWebHistory } from 'vue-router';

// Import your Vue components
import Home from '@/views/Home.vue';

const routes = [
  {
    path: '/',
    component: Home,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
