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

    <!-- 走马灯显示 -->
    <div>
      <Carousel autoplay>
        <!-- 渲染每首歌的封面 -->
        <div v-for="song in popularSongs" :key="song.id">
          <img
            :src="song.cover" 
            alt="热门歌曲封面"
            style="width: 100%; height: 200px; object-fit: cover"
          />
        </div>
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
import { ref, computed, onMounted } from 'vue'
import { Carousel } from 'ant-design-vue'
import useCardStore from '../stores/cardStore' 
import CardComponent from '../components/CardComponent.vue'
import axios from 'axios'

const cardStore = useCardStore()  // 使用 useCardStore

const categories = ['流行', '摇滚', '嘻哈', '古典', '爵士', '其他']
const selectedCategory = ref('全部')

const popularSongs = ref([])  // 存储热门歌曲列表

// 获取登录令牌
const getAccessToken = () => {
  return localStorage.getItem('token')
}

// 获取热门歌曲数据


// 获取热门歌曲数据
const fetchPopularSongs = () => {
  const token = getAccessToken()  // 获取登录令牌
  axios.post(
    'http://localhost:8083/share-app-api/user/GetHostMusic', 
    {},
    {
      params: {
        number: 4  // 确保 number 参数在 URL 查询字符串中
      },
    
      headers: {
        'Content-Type': 'application/json',  // 确保数据以 JSON 格式发送
        'Authorization': `${token}`,  // 使用 Bearer token 格式
      },
    }
  )
  .then((response) => {
    // 处理返回的歌曲数据
    if (response.data && response.data.data) {
      popularSongs.value = response.data.data
    }
  })
  .catch((error) => {
    console.error('获取热门歌曲失败:', error)
  })
}

// 在组件加载时获取热门歌曲
onMounted(() => {
  fetchPopularSongs()
})


// 动态计算过滤后的卡片
const filteredCards = computed(() => {
  const allCards = cardStore.getCards;
  return selectedCategory.value === '全部'
    ? allCards
    : allCards.filter((card) => card.category === selectedCategory.value);
});

const filterCards = () => {
  console.log(`筛选分类：${selectedCategory.value}`);
};

// 处理卡片更新
const updateCard = (updatedCard) => {
  cardStore.updateCard(updatedCard)
}

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
  height: 200px;
  line-height: 160px;
  background: #364d79;
  overflow: hidden;
}

:deep(.slick-slide h3) {
  color: #fff;
}
</style>
