import { createRouter, createWebHistory } from 'vue-router';
import Main from '@/pages/Main.vue';
import Cart from "@/pages/Cart.vue";

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Main,
    },
    {
        path: '/Main',
        name: 'Main',
        component: Main,
    },
    {
        path: '/Cart',
        name: 'Cart',
        component: Cart,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;