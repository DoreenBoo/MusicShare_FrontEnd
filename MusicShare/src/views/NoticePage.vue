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
      <p>系统公告：我们即将进行一次版本更新，敬请期待！</p>
    </div>
  </div>
</template>

<script setup>
// 引入 Vue 的响应式数据
import { ref } from 'vue';

// 定义消息类型
const messageTypes = ['评论', '通知'];

// 当前选择的消息类型
const activeType = ref('粉丝');

// 设置当前激活的消息类型
const setActiveType = (type) => {
  activeType.value = type;
};
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
