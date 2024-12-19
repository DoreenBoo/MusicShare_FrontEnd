<!-- src/components/ParentComponent.vue -->
<template>
  <div>
    <a-button type="default" @click="showFans">获取粉丝</a-button>
    <a-button type="default" @click="showFollowed" style="margin-left: 10px"> 获取关注 </a-button>

    <UserListModal
      :visible="modalVisible"
      :title="modalTitle"
      :list="userList"
      :loading="loading"
      @close="handleClose"
      @follow="handleFollow"
      @avatarClick="handleAvatarClick"
    />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import UserListModal from './UserListModal.vue' // 确保路径正确
import { fans, following, fetchFans, fetchFollowing } from '../composables/useFan.js' // 调整路径

const modalVisible = ref(false)
const modalTitle = ref('')
const userList = ref([])
const loading = ref(false)

// 监听粉丝列表的变化
watch(fans, (newFans) => {
  if (modalTitle.value === '粉丝列表') {
    userList.value = newFans
    loading.value = false
  }
})

// 监听关注列表的变化
watch(following, (newFollowing) => {
  if (modalTitle.value === '关注列表') {
    userList.value = newFollowing
    loading.value = false
  }
})

const showFans = () => {
  modalTitle.value = '粉丝列表'
  modalVisible.value = true
  loading.value = true
  fetchFans()
}

const showFollowed = () => {
  modalTitle.value = '关注列表'
  modalVisible.value = true
  loading.value = true
  fetchFollowing()
}

const handleClose = () => {
  modalVisible.value = false
}

const handleFollow = (item) => {
  // 切换关注状态
  item.followed = !item.followed

  // 如果需要同步后端，可以在这里发送请求
  /*
  axios.post('http://localhost:8083/share-app-api/user/Follow', {
    userId: item.id,
    follow: item.followed
  }, {
    headers: { Authorization: `Bearer ${getAccessToken()}` },
  })
    .then(response => {
      if (response.data.code === 0) {
        // 更新成功
      } else {
        console.error('更新关注状态失败:', response.data.message)
        // 还原状态
        item.followed = !item.followed
      }
    })
    .catch(error => {
      console.error('更新关注状态请求错误:', error)
      // 还原状态
      item.followed = !item.followed
    })
  */
}

const handleAvatarClick = (item) => {
  // 处理头像点击事件，例如跳转到用户详情页
  console.log('点击了头像:', item)
  // 示例：使用 Vue Router 跳转
  // router.push(`/user/${item.id}`)
}
</script>

<style scoped>
a-button {
  margin: 10px;
}
</style>
