<template>
  <a-layout class="layout" style="min-height: 100vh; width: 100%; margin: 0; background-color: rgb(252,157,154)">
    <!-- Header -->
    <a-layout-header style="padding: 0; height: 64px; background-color: rgb(254, 67, 101);">
      <div class="logo" />
      <a-menu v-model:selectedKeys="selectedKeys" mode="horizontal" :style="{ lineHeight: '64px' }">
        <a-menu-item key="1"> <router-link to="/index/home">HOME</router-link></a-menu-item>
        <a-menu-item key="2"><router-link to="/index/follow">FOLLOW</router-link></a-menu-item>
        <a-menu-item key="4"><router-link to="/index/share">SHARE</router-link></a-menu-item>
        <a-menu-item key="5" style="margin-top: 20px;margin-bottom: -13px;">
          <a-input-search v-model:value="searchValue" placeholder="input search text" style="width: 200px"
            @search="handleSearch" />
        </a-menu-item>

        <a-menu-item key="6" style="margin-left: auto;">
          <a-dropdown>
            <template #overlay>
              <a-menu @click="handleMenuClick">
                <a-menu-item key="11"><router-link to="/index/person">Personal Center</router-link></a-menu-item>
                <a-menu-item key="12"><router-link to="/index/notice">Notice</router-link></a-menu-item>
                <a-menu-item key="13"><router-link to="/index/collect">Collection</router-link></a-menu-item>
                <a-menu-item key="14"><router-link to="/index/personalshare">My ShareMusic</router-link></a-menu-item>
                <a-menu-item key="15" style="color: red;">LogOut</a-menu-item>
              </a-menu>
            </template>
            <a class="ant-dropdown-link" @click.prevent>
              <!-- 动态绑定头像 -->
              <a-avatar :src="avatarSrc" />
              <DownOutlined />
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
import { ref ,watch} from 'vue';
import { DownOutlined } from '@ant-design/icons-vue';
import LogoutConfirm from '../components/LogoutConfirm.vue';
import axios from 'axios';  // 导入axios


const selectedKeys = ref(['1']);
const searchValue = ref('');
// 初始化头像 src，可以从 localStorage 中读取，如果没有则使用默认头像
const avatarSrc = ref(localStorage.getItem('avatarUrl') || '..\src\assets\images\注意看，这是小帅.jpg');

// 使用 watch 监听 avatarSrc 的变化，确保更新到 localStorage
watch(avatarSrc, (newAvatar) => {
  if (newAvatar) {
    localStorage.setItem('avatarUrl', newAvatar);
  }
});

// 引用 LogoutConfirm 组件
const logoutConfirm = ref(null);

const getAccessToken = () => {
  return localStorage.getItem('token')
}
// 处理搜索
const handleSearch = (value) => {
    const token = getAccessToken() // 获取登录令牌
  if (!value) {
    console.log('请输入搜索内容');
    return;
  }
  // 调用模糊搜索接口
  axios.post('http://localhost:8083/share-app-api/user/SearchMusic', {}, {
    params: { keyword: value },
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${token}`
    }
  })
  .then((response) => {
    console.log('搜索结果:', response.data);
    if (response.data.code === 0) {
      // 更新搜索结果
      searchResults.value = response.data.data;
    } else {
      // 如果没有结果，给出提示
      searchResults.value = [];
    }
  })
  .catch((error) => {
    console.error('搜索失败:', error);
    searchResults.value = [];
  });
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
