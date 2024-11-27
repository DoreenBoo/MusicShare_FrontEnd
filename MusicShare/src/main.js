import { createApp } from 'vue';
import App from './App.vue';

import router from './router/index';  // 引入路由配置

import "@/assets/text/text.css"; // 引入你的 CSS 文件

const app = createApp(App);
// 使用 Vue Router
app.use(router);

// 挂载到 DOM
app.mount('#app');


