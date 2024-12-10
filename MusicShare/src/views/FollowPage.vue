<template>
  <a-breadcrumb style="margin: 16px 0">
    <a-breadcrumb-item>Follow</a-breadcrumb-item>
  </a-breadcrumb>
  <div>
    <!-- Cards Section -->
    <div
      :style="{
        background: 'rgb(249,205,173)',
        padding: '30px',
        minHeight: '700px',
        flex: 1,
        width: '100%',

      }"
    >
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

<style lang="scss" scoped></style>
