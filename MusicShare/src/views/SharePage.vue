<template>
  <!-- 页面特定内容 -->
  <a-breadcrumb style="margin: 16px 0">
    <a-breadcrumb-item>Home</a-breadcrumb-item>
    <a-breadcrumb-item>MusicShare</a-breadcrumb-item>
  </a-breadcrumb>

  <!-- 页面具体内容 -->
  <div
    :style="{
      background: 'rgb(249,205,173)',
      padding: '30px',
      minHeight: '600px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
      width: '100%',
    }"
  >
    <!-- 用户自定义标题 -->
    <div style="margin-bottom: 20px;">
      <h3>Share Your Music!</h3>
    </div>

    <!-- 音乐上传表单 -->
    <form @submit.prevent="submitForm">
      <!-- 标题输入框 -->
      <div style="margin-bottom: 15px;">
        <label for="title" style="font-size: 16px;">Title</label>
        <input
          id="title"
          v-model="musicTitle"
          type="text"
          placeholder="输入标题"
          style="padding: 10px; width: 100%; border-radius:40px; margin-top: 5px;"
        />
      </div>

      <!-- 文案输入框 -->
      <div style="margin-bottom: 15px;">
        <label for="description" style="font-size: 16px;">Text</label>
        <textarea
          id="description"
          v-model="musicDescription"
          placeholder="输入音乐文案"
          rows="4"
          style="padding: 10px; width: 100%; border-radius: 40px; margin-top: 5px;"
        ></textarea>
      </div>

      <!-- 音乐类型选择 -->
      <div style="margin-bottom: 15px;">
        <label for="musicType" style="font-size: 16px;">MusicType</label>
        <select
          id="musicType"
          v-model="musicType"
          style="padding: 10px; width: 100%; border-radius: 40px; margin-top: 5px;"
        >
          <option value="pop">流行</option>
          <option value="rock">摇滚</option>
          <option value="hiphop">嘻哈</option>
          <option value="classical">古典</option>
          <option value="jazz">爵士</option>
        </select>
      </div>
      <div style="margin-top: 30px; width: '100%';">
      <h3>分享链接</h3>
      <input
        v-model="shareLink"
        type="text"
        placeholder="分享链接"
        style="width: 100%; padding: 10px; font-size: 16px; border: 1px solid #ccc; border-radius: 40px;"
      />
      <button
        @click="copyLink"
        style="margin-top: 10px; padding: 10px; background-color: #2196F3; color: white; border: none; border-radius: 40px;"
      >
        Copy
      </button>
    </div>

      <!-- 音乐文件上传 -->
      <div style="margin-bottom: 15px;">
        <label for="musicFile" style="font-size: 16px;">上传音乐</label>
        <input
          id="musicFile"
          type="file"
          accept="audio/*"
          @change="handleFileChange"
          style="margin-top: 5px;"
        />
      </div>

      <!-- 提交按钮 -->
      <div style="margin-top: 20px;">
        <button
          type="submit"
          style="padding: 10px 20px; background-color: rgb(254, 67, 101); color: white; border: none; border-radius: 40px;"
        >
        Share
        </button>
      </div>
    </form>

    <!-- 分享链接区域 (选填) -->
    
  </div>
</template>

<script setup>
import { ref } from 'vue';

// 定义页面的数据
const musicTitle = ref('');
const musicDescription = ref('');
const musicType = ref('pop');
const musicFile = ref(null);
const shareLink = ref('');

// 处理文件上传
const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file && file.type.startsWith('audio/')) {
    musicFile.value = file;
  } else {
    alert('请选择一个有效的音乐文件');
  }
};

// 提交表单，生成分享链接
const submitForm = () => {
  if (!musicTitle.value || !musicDescription.value || !musicFile.value) {
    alert('请填写所有必填项并上传音乐文件');
    return;
  }

  // 如果没有提供 shareLink，则不自动生成链接
  if (!shareLink.value) {
    shareLink.value = `https://musicshare.com/${musicType.value}/${encodeURIComponent(musicTitle.value)}`;
  }

  console.log('分享的音乐信息：', {
    title: musicTitle.value,
    description: musicDescription.value,
    type: musicType.value,
    file: musicFile.value.name,
    link: shareLink.value,
  });
};

// 复制分享链接
const copyLink = () => {
  if (shareLink.value) {
    navigator.clipboard.writeText(shareLink.value).then(() => {
      alert('链接已复制！');
    });
  } else {
    alert('没有生成分享链接');
  }
};
</script>

<style scoped>
button {
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

button:hover {
  opacity: 0.9;
}
</style>
