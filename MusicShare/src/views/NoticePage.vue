<template>
  <!-- 页面特定的内容 -->
  <a-breadcrumb style="margin: 16px 0">
    <a-breadcrumb-item>Home</a-breadcrumb-item>
    <a-breadcrumb-item>Message Center</a-breadcrumb-item>
  </a-breadcrumb>

  <!-- 页面具体的内容 -->
  <div
    :style="{
      background: 'rgb(249,205,173)',
      padding: '30px',
      minHeight: '600px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start', /* 保证内容从上到下排列 */
      alignItems: 'center',
      width: '100%',
    }"
  >
    <!-- 消息类型选择按钮 -->
    <div style="margin-bottom: 20px;">
      <button
        v-for="(button, index) in messageTypes"
        :key="index"
        @click="setActiveType(button)"
        :style="{
          marginRight: '15px',
          padding: '10px 20px',
          backgroundColor: activeType === button ? 'rgb(131, 175, 155)' : ' rgb(200, 200, 169)',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
        }"
      >
        {{ button }}
      </button>
    </div>

    <!-- 消息内容部分 -->
    <div v-if="activeType === '粉丝'" style="width: 100%; padding: 20px; background-color: rgb(200, 200, 169); border-radius: 10px;">
      <h3>粉丝通知：</h3>
      <p>你有新的粉丝！快来看看是谁关注了你吧。</p>
    </div>
    <div v-if="activeType === '评论'" style="width: 100%; padding: 20px; background-color: rgb(200, 200, 169); border-radius: 10px;">
      <h3>评论通知：</h3>
      <p>有人评论了你发布的内容！赶紧去查看吧。</p>
    </div>

    <div v-if="activeType === '通知'" style="width: 100%; padding: 20px; background-color: rgb(200, 200, 169); border-radius: 10px;">
      <h3>系统通知：</h3>
      <p>系统公告：我们即将进行一次版本更新，敬请期待！</p>
    </div>
  </div>
</template>

<script setup>
// 引入 Vue 的响应式数据
import { ref } from 'vue';
import axios from 'axios';

const getAccessToken = () => {
  return localStorage.getItem('token')
}
// 定义消息类型
const messageTypes = ['粉丝', '评论',  '通知'];

// 当前选择的消息类型
const activeType = ref('粉丝');

// 用于存储从后端获取的数据
const fans = ref([]);
const comments = ref([]);
const notifications = ref([]);

// 设置当前激活的消息类型
const setActiveType = (type) => {
  activeType.value = type;
// 根据消息类型请求数据
  if (type === '粉丝') {
    fetchFans();
  } else if (type === '评论') {
    fetchComments();
  } else if (type === '通知') {
    fetchNotifications();
  }
};

// 获取粉丝数据
const fetchFans = () => {
  const token = getAccessToken()
  console.log('Authorization:', `Bearer ${token}`)
  axios.post('http://localhost:8083/share-app-api/user/Fan',
    {
        headers: {
          Authorization: `${token}`, // 确保带上正确的授权信息
        },
      },
  ) 
  
    .then((response) => {
      fans.value = response.data; // 假设后端返回的数据是粉丝列表
    })
    .catch((error) => {
      console.error('获取粉丝数据失败:', error);
    });
};

// 获取评论数据
const fetchComments = () => {
  const token = getAccessToken()
  axios.post('http://localhost:8083/share-app-api/user/Comment',
    {
        headers: {
          Authorization: `${token}`, // 确保带上正确的授权信息
        },
      },
  ) 
    .then((response) => {
      comments.value = response.data; // 假设后端返回的数据是评论列表
    })
    .catch((error) => {
      console.error('获取评论数据失败:', error);
    });
};

// 获取通知数据
const fetchNotifications = () => {
  const token = getAccessToken()
  axios.post('http://localhost:8083/share-app-api/user/GetNotification',
    {
        headers: {
          Authorization: `${token}`, // 确保带上正确的授权信息
        },
      },
  ) 
    .then((response) => {
      notifications.value = response.data; // 假设后端返回的数据是通知列表
    })
    .catch((error) => {
      console.error('获取通知数据失败:', error);
    });
};

// 初始加载粉丝数据
fetchFans();
</script>

<style scoped>
button {
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
  width: 293px;
}

button:hover {
  opacity: 0.9;
}

button:active {
  transform: scale(1.05);
}

/* 消息类型内容部分样式 */
div {
  margin-top: 20px;
}

h3 {
  font-size: 18px;
  font-weight: 600;
}
</style>