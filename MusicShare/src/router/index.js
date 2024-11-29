import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../components/HomePage.vue';
import HelloOFY from '../components/HelloOFY.vue';
import LoginPage from '../components/LoginPage.vue';
import RegisterPage from '../components/RegisterPage.vue'; // 引入注册页面  

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
    {
        path: '/register',
        name: 'RegisterPage',
        component: RegisterPage,
    },
    {
        path: '/',
        redirect: '/login', // 默认跳转到登录页面
    },  
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
