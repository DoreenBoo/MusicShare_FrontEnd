<template>
    <a-breadcrumb style="margin: 16px 0">
        <a-breadcrumb-item>My Shared Music</a-breadcrumb-item>
    </a-breadcrumb>

    <div>
        <!-- Cards Section -->
        <div :style="{
    background: ' rgb(249, 205, 173)',
            padding: '30px',
            minHeight: '700px',
            flex: 1,
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
        }">
            <a-row :gutter="8" justify="center">
                <a-col :span="6" v-for="item in sharedCards" :key="item.title"
                    style="display: flex; justify-content: center;">
                    <CardComponent :card="item" @removeSharedCard="removeSharedCard" />
                </a-col>
            </a-row>
        </div>
    </div>
    <link rel="stylesheet" href="//at.alicdn.com/t/c/font_4777430_1zg2x8pq844.css" />
</template>

<script setup>
import { ref ,onMounted} from 'vue';
import CardComponent from '../components/CardComponent.vue'; // 确保路径正确
import axios from 'axios';

// 存储分享的卡片数据
const sharedCards = ref([]);

// 获取登录令牌
const getAccessToken = () => {
  return localStorage.getItem('token');
}

// 发送请求获取用户分享的音乐作品
const fetchSharedMusic = () => {
  const token = getAccessToken();

  axios
    .post(
      'http://localhost:8083/share-app-api/user/GetMyWorks', // 替换为你的分享音乐接口路径
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
        sharedCards.value = response.data.data.map((item) => ({
          id: item.music_id, // 假设后端返回的数据中有 music_id
          title: item.song_name || '未知标题',
          description: item.description || '暂无描述',
          cover: item.cover || '默认图片路径',
          isLiked: false,
          isCollected: false,
          link: item.link || '', // 下载链接
        }));
        console.log('分享的音乐数据加载成功:', sharedCards.value);
      } else {
        console.error('获取分享音乐数据失败:', response.data.msg);
      }
    })
    .catch((error) => {
      console.error('请求分享音乐数据失败:', error);
    });
};

// 删除用户分享的音乐
const removeSharedCard = (cardToRemove) => {
  sharedCards.value = sharedCards.value.filter(card => card.id !== cardToRemove.id);
};

// 页面加载时获取分享的音乐数据
onMounted(() => {
  fetchSharedMusic();
});

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
