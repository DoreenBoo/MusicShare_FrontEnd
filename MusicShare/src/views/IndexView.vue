<template>
  <a-layout class="layout" style="min-height: 100vh; width: 100%; margin: 0; background-color: rgb(252,157,154)">
    <!-- Header -->
    <a-layout-header style="padding: 0; height: 64px; background-color: rgb(254, 67, 101);">
      <div class="logo" />
      <a-menu
        v-model:selectedKeys="selectedKeys"
        mode="horizontal"
        :style="{ lineHeight: '64px' }"
      >
        <a-menu-item key="1"> <router-link to="/index/home">HOME</router-link></a-menu-item>
        <a-menu-item key="2">Classic</a-menu-item>
        <a-menu-item key="3">Share</a-menu-item>
        <a-menu-item key="4" style="margin-top: 20px;margin-bottom: -13px;">
          <a-input-search
            v-model:value="value"
            placeholder="input search text"
            style="width: 200px"
            @search="onSearch"
          />
        </a-menu-item>
        
        <a-menu-item key="5" style="margin-left: auto;">
          <a-dropdown>
            <template #overlay>
              <a-menu @click="onClick">
                <a-menu-item key="11"><router-link to="/index/person">个人中心</router-link></a-menu-item>
                <a-menu-item key="12">消息</a-menu-item>
                <a-menu-item key="13">我的喜欢</a-menu-item>
                <a-menu-item key="13">退出登录</a-menu-item>
              </a-menu>
            </template>
            <a class="ant-dropdown-link" @click.prevent>
              <a-avatar src="..\src\assets\images\注意看，这是小帅.jpg" />
              <DownOutlined />
            </a>
          </a-dropdown>
        </a-menu-item>
      </a-menu>
    </a-layout-header>

    <!-- Content (插入页面特有内容) -->
    <a-layout-content :style="{ padding: '0 50px', flex: 1, display: 'flex', flexDirection: 'column', width: '100%' }">
      <slot></slot>
      <router-view></router-view>
    </a-layout-content>     


    <!-- Footer -->
    <a-layout-footer style="text-align: center; padding: 0; background-color: rgb(252,157,154)">
      ONLY FOR YOU by @DODO @Lucas @小何先生
    </a-layout-footer>
  </a-layout>
</template>

<script setup>
import { ref } from 'vue';
import { DownOutlined } from '@ant-design/icons-vue';


const selectedKeys = ref(['1']);
const value = ref('');

const onSearch = (searchValue) => {
  console.log('use value', searchValue);
};

const onClick = ({ key }) => {
  console.log(`Click on item ${key}`);
  if (key === '11') {
    console.log('Clicked on the first menu item');
  } else if (key === '12') {
    console.log('Clicked on the second menu item');
  } else if (key === '13') {
    console.log('Clicked on the third menu item');
  }
};
</script>