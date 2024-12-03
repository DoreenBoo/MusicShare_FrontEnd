<template>
    <!-- 页面特定的内容 -->
    <a-breadcrumb style="margin: 16px 0">
      <a-breadcrumb-item>首页</a-breadcrumb-item>
    </a-breadcrumb>

    <!-- 页面具体的内容 -->
    <div>
      <!-- 走马灯 -->
      <Carousel autoplay>
        <div><h3>1</h3></div>
        <div><h3>2</h3></div>
        <div><h3>3</h3></div>
        <div><h3>4</h3></div>
      </Carousel>

      <!-- Cards Section -->
      <div :style="{ background: 'rgb(249,205,173)', padding: '30px', minHeight: '500px', flex: 1, width: '100%' }">
        <a-row :gutter="8">
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
    </div>

</template>

<script setup>
import { Carousel } from 'ant-design-vue';

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
/* 样式内容保持不变 */
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
