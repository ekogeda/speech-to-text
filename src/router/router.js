import { createRouter, createWebHistory } from 'vue-router';

// Import your Vue components
import Home from '@/views/Home.vue';
import About from '@/views/About.vue';
import V3 from '@/views/V3.vue';

const routes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/about',
    component: About,
  },
  {
    path: '/v3',
    component: V3,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
