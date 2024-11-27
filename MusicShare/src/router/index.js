import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../components/HomePage.vue';
import HelloOFY from '../components/HelloOFY.vue';
import LoginPage from '../components/LoginPage.vue';

const routes = [
    {
        path: '/',
        name: 'HelloOFY',
        component: HelloOFY,
        props: { title: 'ONLY FOR YOU' },
    },
    {
        path: '/home',
        name: 'HomePage',
        component: HomePage, 
    },
    {
        path: '/login', // 新增登录页面路径
        name: 'LoginPage',
        component: LoginPage,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
