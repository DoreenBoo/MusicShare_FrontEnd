<template>
  <div>
    <a-breadcrumb style="margin: 16px 0">
      <a-breadcrumb-item>Home</a-breadcrumb-item>
      <div style="display: flex; justify-content: center">
        <select
          v-model="selectedCategory"
          @change="filterCards"
          style="width: 300px; padding: 5px; border: 1px solid #ccc; border-radius: 40px"
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
        <a-row :gutter="8" style="display: flex; justify-content: center">
          <a-col
            v-for="item in filteredCards"
            :key="item.title"
            :span="6"
            style="display: flex; justify-content: center"
          >
            <CardComponent :card="item" @updateCard="updateCard" />
          </a-col>
        </a-row>
      </div>
    </div>

    <link rel="stylesheet" href="//at.alicdn.com/t/c/font_4777430_1zg2x8pq844.css" />
  </div>
</template>

<script setup>
import { ref, computed ,onMounted} from 'vue'
import { Carousel } from 'ant-design-vue'
import { useCardStore } from '../stores/cardStore' 
import CardComponent from '../components/CardComponent.vue'

const cardStore = useCardStore()

const categories = ['流行', '摇滚', '嘻哈', '古典', '爵士', '其他']
const selectedCategory = ref('全部')

// 动态计算过滤后的卡片
const filteredCards = computed(() => {
  const allCards = cardStore.getCards;
  return selectedCategory.value === '全部'
    ? allCards
    : allCards.filter((card) => card.category === selectedCategory.value);
});

// 处理卡片更新
const updateCard = (updatedCard) => {
  cardStore.updateCard(updatedCard);
};

const filterCards = () => {
  console.log(`筛选分类：${selectedCategory.value}`);
};

// 在组件挂载时获取卡片数据
onMounted(() => {
  cardStore.fetchCards();
});
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
