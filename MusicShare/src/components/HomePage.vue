<template>
  <a-layout class="layout" style="min-height: 100vh; width: 100%; margin: 0;">
    <!-- Header -->
    <a-layout-header style="padding: 0; height: 64px;">
      <div class="logo" />
      <a-menu
        v-model:selectedKeys="selectedKeys"
        theme="dark"
        mode="horizontal"
        :style="{ lineHeight: '64px' }"
      >
        <a-menu-item key="1">nav 1</a-menu-item>
        <a-menu-item key="2">nav 2</a-menu-item>
        <a-menu-item key="3">nav 3</a-menu-item>
      </a-menu>
    </a-layout-header>

    <!-- Content -->
    <a-layout-content :style="{ padding: '0 50px', flex: 1, display: 'flex', flexDirection: 'column', width: '100%' }">
      <a-breadcrumb style="margin: 16px 0">
        <a-breadcrumb-item>Home</a-breadcrumb-item>
        <a-breadcrumb-item>List</a-breadcrumb-item>
        <a-breadcrumb-item>App</a-breadcrumb-item>
      </a-breadcrumb>

      <!-- Cards Section -->
      <div :style="{ background: '#fff', padding: '24px', minHeight: '280px', flex: 1, width: '100%' }">
        <a-row gutter={16}>
          <a-col :span="8" v-for="item in cards" :key="item.title">
            <a-card
              :title="item.title"
              :extra="item.extra"
              :hoverable="true"
              :style="{ width: '100%' }"
            >
              <p>{{ item.content }}</p>
            </a-card>
          </a-col>
        </a-row>
      </div>
    </a-layout-content>

    <!-- Footer -->
    <a-layout-footer style="text-align: center; padding: 0; background-color: #001529;">
      Ant Design ©2018 Created by Ant UED
    </a-layout-footer>
  </a-layout>
</template>

<script setup>
import { ref } from 'vue';

const selectedKeys = ref(['1']);

const cards = [
  {
    title: 'Card 1',
    extra: 'More',
    content: 'This is a description for card 1.',
  },
  {
    title: 'Card 2',
    extra: 'More',
    content: 'This is a description for card 2.',
  },
  {
    title: 'Card 3',
    extra: 'More',
    content: 'This is a description for card 3.',
  },
];
</script>

<style scoped>
/* Ensure the layout takes up the full height and width */
body, html {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}

.site-layout-content {
  min-height: 280px;
  padding: 24px;
  background: #fff;
}

.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  width: 100%;
}

.layout-header {
  padding: 0;
  background-color: #001529;
}

.layout-footer {
  padding: 0 24px;
  text-align: center;
  background-color: #001529;
  color: #fff;
}

.site-layout-content {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  flex: 1;
}

#components-layout-demo-top .logo {
  float: left;
  width: 120px;
  height: 31px;
  margin: 16px 24px 16px 0;
  background: rgba(255, 255, 255, 0.3);
}

.ant-row-rtl #components-layout-demo-top .logo {
  float: right;
  margin: 16px 0 16px 24px;
}
</style>
