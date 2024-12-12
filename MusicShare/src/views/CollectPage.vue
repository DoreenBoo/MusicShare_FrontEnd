<template>
  <a-breadcrumb style="margin: 16px 0">
    <a-breadcrumb-item>My Collection</a-breadcrumb-item>
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
        display: 'flex',
        flexDirection: 'column',
      }"
    >
      <a-row :gutter="8" justify="center">
        <a-col :span="6" v-for="item in collectedCards" :key="item.title" style="display: flex; justify-content: center;">
          <CardComponent 
            :card="item" 
            @updateCard="updateCard" 
          />
        </a-col>
      </a-row>
    </div>
  </div>
    <link rel="stylesheet" href="//at.alicdn.com/t/c/font_4777430_1zg2x8pq844.css" />
</template>

<script setup>
import { ref } from 'vue'
import CardComponent from '../components/CardComponent.vue'  // 确保路径正确

// 模拟从数据源获取用户收藏的音乐卡片数据
const collectedCards = ref([
  {
    title: '流行专辑',
    description: '这是一张流行音乐专辑。',
    image: '../src/assets/images/注意看，这是小帅.jpg',
    nickname: '用户A',
    isLiked: false,
    isCollected: true,
  },
  {
    title: '摇滚专辑',
    description: '摇滚不死！！！',
    image: '../src/assets/images/注意看，这是小帅.jpg',
    nickname: '用户B',
    isLiked: false,
    isCollected: true,
  },
  {
    title: '古典专辑',
    description: '这是一张古典音乐专辑。',
    image: '../src/assets/images/注意看，这是小帅.jpg',
    nickname: '用户C',
    isLiked: false,
    isCollected: true,
  },
  {
    title: '其他专辑',
    description: '这是一张其他类型音乐专辑。',
    image: '../src/assets/images/注意看，这是小帅.jpg',
    nickname: '用户D',
    isLiked: false,
    isCollected: true,
  },
]);

const updateCard = (updatedCard) => {
  const index = collectedCards.value.findIndex(card => card.title === updatedCard.title);
  if (index !== -1) {
    collectedCards.value[index] = updatedCard; // 更新卡片数据
  }
}
</script>

<style scoped>
/* 卡片样式 */
a-card {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

a-card-meta {
  text-align: center;
}

a-card img {
  width: 100%;
  border-radius: 10px;
}

/* 让卡片在屏幕上居中 */
a-row {
  display: flex;
  justify-content: center;
}
</style>