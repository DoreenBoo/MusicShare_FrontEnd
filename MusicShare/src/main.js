import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index';  // 引入路由配置
import "@/assets/text/text.css";
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';



const app = createApp(App);

// 使用 Vue Router 和 Ant Design Vue
app.use(router);
app.use(Antd);  // 注册 Ant Design Vue

// 挂载 Vue 应用到 DOM
app.mount('#app');

