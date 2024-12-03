import { createRouter, createWebHistory } from 'vue-router'
// import HomePage from '../views/HomePage.vue'
import HelloOFY from '../views/HelloOFY.vue'
import LoginPage from '../views/LoginPage.vue'
import RegisterPage from '../views/RegisterPage.vue' // 引入注册页面
import PersonalCenter from '../views/PersonalCenter.vue'
import IndexView from '../views/IndexView.vue'
import HomePage from '@/views/HomePage.vue'

const routes = [
  {
    path: '/hello',
    name: 'HelloOFY',
    component: HelloOFY,
    props: { title: 'ONLY FOR YOU' },
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
    path: '/index',
    name: 'IndexView',
    component: IndexView,
    children: [
      {
        path: 'person',
        name: 'PersonalCenter',
        component: PersonalCenter,
      },
      {
        path: 'home',
        name: 'HomePage',
        component: HomePage,
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
