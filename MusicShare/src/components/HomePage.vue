<template>
  <a-layout class="layout" style="min-height: 100vh; width: 100%; margin: 0;background-color: rgb(252,157,154)">
    <!-- Header -->
    <a-layout-header style="padding: 0; height: 64px;background-color:rgb(254, 67, 101);">
      <div class="logo" />
      <a-menu
        v-model:selectedKeys="selectedKeys"
        
        mode="horizontal"
        :style="{ lineHeight: '64px' }"
      >
        <a-menu-item key="1">Home</a-menu-item>
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

<!-- 走马灯 -->
 <div>
  
  <Carousel autoplay>
    <div> <img src="E:\VueProject\MusicShare_FrontEnd\MusicShare\src\assets\images\image.png" alt="Logo" class="carousel-image" /></div>
    <div><h3>2</h3></div>
    <div><h3>3</h3></div>
    <div><h3>4</h3></div>
  </Carousel>
 </div>


      
      <!-- Cards Section -->
      <div :style="{ background: ' rgb(249,205,173)', padding: '24px', minHeight: '280px', flex: 1, width: '100%' }">
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
    <a-layout-footer style="text-align: center; padding: 0; background-color: rgb(252,157,154)">
      ONLY FOR YOU by @DODO @Lucas @小何先生
    </a-layout-footer>
  </a-layout>
</template>

<script setup>
// import { Carousel } from 'antd';
import { Carousel } from 'ant-design-vue';
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

<style>
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
  background-color:rgb(254, 67, 101);
}

.layout-footer {
  padding: 0 24px;
  text-align: center;
  background-color: rgb(254, 67, 101);
  color: #6d1b1b;
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

/* 1. 先确保 Carousel 容器的宽度设置 */
.a-carousel {
  max-width: 50%;  /* 让 Carousel 容器自适应宽度 */
  width: 50%;      /* 确保 Carousel 占满整个容器 */
}

/* 2. 调整图片的大小 */
.carousel-image {
  width: 20%;       /* 图片宽度占满 Carousel */
  height: auto;      /* 高度自适应，保持比例 */
  object-fit: contain; /* 图片裁剪方式，确保图片内容完整显示 */

}
</style>
