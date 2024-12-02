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
        <!-- <a-menu-item key="2">nav 2</a-menu-item>
        <a-menu-item key="3">nav 3</a-menu-item> -->
        <!-- 搜索框 -->
        <a-menu-item key="4" style="margin-top: 20px;margin-bottom: -13px; ">
          <a-input-search
      v-model:value="value"
      placeholder="input search text"
      style="width: 200px"
      @search="onSearch"
    />
        </a-menu-item>


       <!-- 头像 -->
        
  <a-menu-item key="5" style="margin-left: auto;">
          <a-dropdown>
            <template #overlay>
              <a-menu @click="onClick">
                <router-link to="/person">个人中心</router-link>
                <!-- <a-menu-item key="11">个人中心</a-menu-item> -->
                <a-menu-item key="12">消息</a-menu-item>
                <a-menu-item key="13">我的喜欢</a-menu-item>
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
    <div><h3>1</h3></div>
    <div><h3>2</h3></div>
    <div><h3>3</h3></div>
    <div><h3>4</h3></div>
  </Carousel>
 </div>


      
      <!-- Cards Section -->
      <div :style="{ background: 'rgb(249,205,173)', padding: '30px', minHeight: '280px', flex: 1, width: '100%' }">
        <a-row :gutter =8>
          <a-col :span="6" v-for="item in cards" :key="item.title">
            <a-card hoverable style="width: 250px">
              <template #cover>
                <img alt="example" :src="item.image" />
              </template>
              <a-card-meta :title="item.title">
                <template #description>{{ item.description }}</template>
              </a-card-meta>
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
 import { DownOutlined } from '@ant-design/icons-vue';

 const selectedKeys = ref(['1']);
// 搜索框
const value = ref('');
const onSearch = searchValue => {
  console.log('use value', searchValue);
  console.log('or use this.value', value.value);
};


// 头像
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
// 卡片内容
const cards = [
  {
    title: '注意看，这是小帅',
    description: 'This is a handsome girl.',
    image: '../src/assets/images/注意看，这是小帅.jpg',
  },
  {
    title: '注意看，这是小帅',
    description: 'This is a handsome girl.',
    image: '../src/assets/images/注意看，这是小帅.jpg',
  },
  {
    title: '注意看，这是小帅',
    description: 'This is a handsome girl.',
    image: '../src/assets/images/注意看，这是小帅.jpg',
  },
    {
    title: '注意看，这是小帅',
    description: 'This is a handsome girl.',
    image: '../src/assets/images/注意看，这是小帅.jpg',
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

/* 走马灯 */
:deep(.slick-slide) {
  text-align: center;
  height: 160px;
  line-height: 160px;
  background: #364d79;
  overflow: hidden;
}
:deep(.slick-slide h3) {
  color: #fff;
}
</style>
