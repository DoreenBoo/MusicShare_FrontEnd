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
import { ref ,onMounted} from 'vue'
import axios from 'axios';
import CardComponent from '../components/CardComponent.vue'  // 确保路径正确

// 模拟从数据源获取用户收藏的音乐卡片数据
const collectedCards = ref([])

// 获取登录令牌
const getAccessToken = () => {
  return localStorage.getItem('token')
}
// 发送请求获取收藏的音乐卡片数据
const fetchCollectedCards = () => {
  const token = getAccessToken()

  axios
    .post(
      'http://localhost:8083/share-app-api/user/Favorites', // 替换为你的收藏接口路径
      {},
      {
        headers: {
          Authorization: token,
        },
      }
    )
    .then((response) => {
      if (response.data.code === 0 && Array.isArray(response.data.data)) {
        // 将后端返回的数据映射到卡片数据格式
        collectedCards.value = response.data.data.map((item) => ({
          id: item.music_id, // 假设后端返回的数据中有 music_id
          title: item.song_name || '未知标题',
          description: item.description || '暂无描述',
          cover: item.cover || '默认图片路径',
          nickname: item.author_name || '未知用户',
          isLiked: false,
          isCollected: true,
          link: item.link || '', // 下载链接
        }))
        console.log('收藏数据加载成功:', collectedCards.value)
      } else {
        console.error('获取收藏数据失败:', response.data.msg)
      }
    })
    .catch((error) => {
      console.error('请求收藏数据失败:', error)
    })
}
// 更新卡片的状态
const updateCard = (updatedCard) => {
  if (!updatedCard.isCollected) {
    // 如果卡片被取消收藏，则从列表中移除
    collectedCards.value = collectedCards.value.filter(card => card.id !== updatedCard.id)
  } else {
    // 如果卡片仍然被收藏，则更新卡片数据
    const index = collectedCards.value.findIndex(card => card.id === updatedCard.id)
    if (index !== -1) {
      collectedCards.value[index] = updatedCard;
    }
  }
}
// 页面加载时获取收藏数据
onMounted(() => {
  fetchCollectedCards()
})
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