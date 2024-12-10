<template>
  <a-breadcrumb style="margin: 16px 0">
    <a-breadcrumb-item>Home</a-breadcrumb-item>

    <div style="display: flex; justify-content: center;">
      <select
        v-model="selectedCategory"
        @change="filterCards"
        style="width: 300px; padding: 5px; border: 1px solid #ccc; border-radius: 40px;"
      >
        <option value="" disabled>请选择音乐类别</option>
        <option value="全部">全部</option>
        <option v-for="category in categories" :key="category" :value="category">
          {{ category }}
        </option>
      </select>
    </div>
  </a-breadcrumb>

  <div>
    <Carousel autoplay>
      <div><h3>1</h3></div>
      <div><h3>2</h3></div>
      <div><h3>3</h3></div>
      <div><h3>4</h3></div>
    </Carousel>

    <div
      :style="{
        background: 'rgb(249,205,173)',
        padding: '20px',
        minHeight: '550px',
        flex: 1,
        width: '100%',
      }"
    >
      <a-row :gutter="8" style="display: flex; justify-content: center;">
        <a-col v-if="filteredCards.length === 0">
          <div>没有找到匹配的卡片</div>
        </a-col>
        <a-col
          v-for="item in filteredCards"
          :key="item.title"
          :span="6"
          style="display: flex; justify-content: center;"
        >
          <a-card hoverable style="width: 300px; margin: 10px;">
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
import { ref, computed } from 'vue';
import { Carousel } from 'ant-design-vue';

const categories = ['流行', '摇滚', '嘻哈', '古典', '爵士','其他'];

const cards = [
  {
    title: '流行',
    description: 'This is a handsome girl.',
    image: '../src/assets/images/注意看，这是小帅.jpg',
    category: '流行',
  },
  {
    title: '摇滚',
    description: '摇滚不死！！！',
    image: '../src/assets/images/注意看，这是小帅.jpg',
    category: '摇滚',
  },
  {
    title: '古典',
    description: 'This is a handsome girl.',
    image: '../src/assets/images/注意看，这是小帅.jpg',
    category: '古典',
  },
  {
    title: '其他',
    description: 'This is a handsome girl.',
    image: '../src/assets/images/注意看，这是小帅.jpg',
    category: '其他',
  },
];

const selectedCategory = ref('全部');

const filteredCards = computed(() => {
  if (selectedCategory.value === '全部') return cards;
  return cards.filter((card) => card.category === selectedCategory.value);
});

const filterCards = () => {
  console.log('选中的类别：', selectedCategory.value);
  console.log('筛选后的卡片：', filteredCards.value);
};
</script>

<style scoped>
select {
  transition: border 0.3s;
}

select:focus {
  border-color: #40a9ff;
  outline: none;
}

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