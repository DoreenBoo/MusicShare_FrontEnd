<template>
  <a-breadcrumb style="margin: 16px 0">
    <a-breadcrumb-item>Follow</a-breadcrumb-item>
  </a-breadcrumb>
  <div>
    <div :style="{
      background: 'rgb(249,205,173)',
      padding: '30px',
      minHeight: '700px',
      flex: 1,
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
    }">
      <a-row :gutter="8">
        <a-col v-for="item in cards" :key="item.title" :span="6" style="display: flex; justify-content: center;">
          <CardComponent :card="item" @updateCard="updateCard" />
        </a-col>
      </a-row>
    </div>
  </div>
  <link rel="stylesheet" href="//at.alicdn.com/t/c/font_4777430_1zg2x8pq844.css" />
</template>

<script setup>
import { useCardStore } from '@/stores/useCardStore'
import CardComponent from '../components/CardComponent.vue'  // 确保路径正确

const cardStore = useCardStore()
const cards = cardStore.getCards() // 获取卡片数据

const updateCard = (updatedCard) => {
  // 更新卡片的逻辑
  const index = cards.findIndex(card => card.title === updatedCard.title);
  if (index !== -1) {
    cards[index] = updatedCard; // 更新卡片数据
  }
}
</script>

<style lang="scss" scoped>

</style>