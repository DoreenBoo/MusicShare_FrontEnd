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
    <div v-if="activeType === '评论'" style="width: 100%; padding: 20px; background-color: rgb(200, 200, 169); border-radius: 10px;">
      <h3>评论通知：</h3>
      <p>有人评论了你发布的内容！赶紧去查看吧。</p>
    </div>

    <div v-if="activeType === '通知'" style="width: 100%; padding: 20px; background-color: rgb(200, 200, 169); border-radius: 10px;">
       <h3>系统通知：</h3>
      <div v-for="(notification, index) in notifications" :key="notification.id">
        <p><strong>通知内容：</strong> {{ notification.content }}</p>
      </div>
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
const messageTypes = [ '评论',  '通知'];

// 当前选择的消息类型
const activeType = ref('评论');

// 用于存储从后端获取的数据
const comments = ref([]);
const notifications = ref([]);

// 设置当前激活的消息类型
const setActiveType = (type) => {
  activeType.value = type;
// 根据消息类型请求数据
  if (type === '评论') {
    fetchComments();
  } else if (type === '通知') {
    fetchNotifications();
  }
};


// 获取评论数据
const fetchComments = () => {
  const token = getAccessToken()
  axios.post('http://localhost:8083/share-app-api/user/Comment',{}, 
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
  axios.post('http://localhost:8083/share-app-api/user/GetNotification',{},
    {
        headers: {
          Authorization: `${token}`, // 确保带上正确的授权信息
        },
      },
  ) 
    .then((response) => {
      console.log('获取的通知数据:', response.data); // 打印返回的数据
       notifications.value = response.data.data; // 修改为从 data 中提取通知数组
    })
    .catch((error) => {
      console.error('获取通知数据失败:', error);
    });
};

// 初始加载默认类型的数据
if (activeType.value === '评论') {
  fetchComments();
} else if (activeType.value === '通知') {
  fetchNotifications();
}
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