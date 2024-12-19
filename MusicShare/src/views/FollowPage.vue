<template>
  <a-breadcrumb style="margin: 16px 0">
    <a-breadcrumb-item>Follow</a-breadcrumb-item>
  </a-breadcrumb>
  <div>
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
      <a-row :gutter="8">
        <a-col
          v-for="item in followedWorks"
          :key="item.id"
          :span="6"
          style="display: flex; justify-content: center"
        >
          <CardComponent :card="item" @updateCard="updateCard" />
        </a-col>
      </a-row>
    </div>
  </div>
  <link rel="stylesheet" href="//at.alicdn.com/t/c/font_4777430_1zg2x8pq844.css" />
</template>

<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue'
import useCardStore from '../useCardStore' // 确保路径正确
import CardComponent from '../components/CardComponent.vue' // 确保路径正确


const followedWorks = ref([])  // 定义 followedWorks 作为响应式变量
const cardStore = useCardStore()
// 获取登录令牌
const getAccessToken = () => {
  return localStorage.getItem('token')
}

// 获取关注的作品

const fetchFollowedWorks = (userId) => {
  const token = getAccessToken() // 获取登录令牌

  axios
    .post(
      'http://localhost:8083/share-app-api/user/GetAllFollowedWorks',
      {},
      {
        headers: {
          Authorization: `${token}`, // 添加 Authorization 头部
        },
      },
    )
    .then((response) => {
      if (response.data.code === 0 && Array.isArray(response.data.data)) {
        followedWorks.value = response.data.data // 获取关注的作品数据并保存到 state 中
        console.log('从后端接收到的数据:', followedWorks.value)
      } else {
        console.error('返回的数据格式不正确:', response.data)
      }
    })
    .catch((error) => {
      console.error('请求关注作品失败:', error)
    })
}
// 更新卡片
const updateCard = (updatedCard) => {
  const index = followedWorks.value.findIndex((card) => card.id === updatedCard.id)
  if (index !== -1) {
    followedWorks.value[index] = updatedCard
  }
}

// 在组件加载时调用 fetchFollowedWorks 来获取关注作品数据
onMounted(() => {
  fetchFollowedWorks()
})
</script>

<style lang="scss" scoped>
/* 添加样式（如有需要） */
</style>
