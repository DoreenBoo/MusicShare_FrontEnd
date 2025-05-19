<template>
  <a-layout class="layout" style="min-height: 100vh; width: 100%; margin: 0; background-color: rgb(252,157,154)">
    <!-- Header -->
    <!-- Header -->
    <a-layout-header style="padding: 0; height: 64px; background-color: #443E46;">
      <div class="logo" />
      <a-menu v-model:selectedKeys="selectedKeys" mode="horizontal"
        :style="{ lineHeight: '64px', backgroundColor: '#443E46', color: '#ffffff' }" theme="dark">
        <a-menu-item key="1">
          <router-link to="/index/home" style="color: white">HOME</router-link>
        </a-menu-item>
        <a-menu-item key="2">
          <router-link to="/index/follow" style="color: white">FOLLOW</router-link>
        </a-menu-item>
        <a-menu-item key="4">
          <router-link to="/index/share" style="color: white">SHARE</router-link>
        </a-menu-item>
        <a-menu-item key="5" style="margin-top: 20px; margin-bottom: -13px;">
          <a-input-search v-model:value="searchValue" placeholder="input search text" style="width: 200px"
            @search="handleSearch" />
        </a-menu-item>
        <a-menu-item key="6" style="margin-left: auto;">
          <a-dropdown>
            <template #overlay>
              <a-menu @click="handleMenuClick">
                <a-menu-item key="11">
                  <router-link to="/index/person">Personal Center</router-link>
                </a-menu-item>
                <a-menu-item key="12">
                  <router-link to="/index/notice">Notice</router-link>
                </a-menu-item>
                <a-menu-item key="13">
                  <router-link to="/index/collect">Collection</router-link>
                </a-menu-item>
                <a-menu-item key="14">
                  <router-link to="/index/personalshare">My ShareMusic</router-link>
                </a-menu-item>
                <a-menu-item key="15" style="color: red;">LogOut</a-menu-item>
              </a-menu>
            </template>
            <a class="ant-dropdown-link" @click.prevent>
              <a-avatar src="..\src\assets\images\注意看，这是小帅.jpg" />
              <DownOutlined style="color: white" />
            </a>
          </a-dropdown>
        </a-menu-item>
      </a-menu>
    </a-layout-header>


    <!-- Content -->
    <a-layout-content :style="{ padding: '0 50px', flex: 1, display: 'flex', flexDirection: 'column', width: '100%' }">
      <slot></slot>
      <router-view></router-view>
    </a-layout-content>

    <!-- Footer -->
    <a-layout-footer style="text-align: center; padding: 0; background-color: rgb(252,157,154)">
      ONLY FOR YOU by @DODO @Lucas @小何先生
    </a-layout-footer>

    <!-- 引入退出登录弹窗组件 -->
    <LogoutConfirm @confirm="confirmLogout" @cancel="cancelLogout" ref="logoutConfirm" />
  </a-layout>
</template>

<script setup>
import { ref } from 'vue';
import { DownOutlined } from '@ant-design/icons-vue';
import LogoutConfirm from '../components/LogoutConfirm.vue';

const selectedKeys = ref(['1']);
const searchValue = ref('');

// 引用 LogoutConfirm 组件
const logoutConfirm = ref(null);

// 处理搜索
const handleSearch = (value) => {
  console.log('搜索内容:', value);
};

// 菜单点击处理
const handleMenuClick = ({ key }) => {
  console.log(`点击了菜单项 ${key}`);
  if (key === '15') {
    // 调用弹窗显示方法
    logoutConfirm.value.open();
  }
};

// 确认退出登录
const confirmLogout = () => {
  console.log('用户确认退出登录');
  window.location.href = '/login'; // 模拟退出
};

// 取消退出登录
const cancelLogout = () => {
  console.log('用户取消退出登录');
};
</script>
