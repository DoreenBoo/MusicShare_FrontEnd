<template>
  <!-- 页面特定内容 -->
  <a-breadcrumb style="margin: 16px 0">1
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
    <div style="margin-bottom: 20px">
      <h3>Share Your Music!</h3>
    </div>

    <!-- 音乐上传表单 -->
    <form @submit.prevent="submitForm" style="width: 100%; display: flex; flex-direction: column">
      <!-- 标题输入框 -->
      <div style="margin-bottom: 15px">
        <label for="title" style="font-size: 16px">Title</label>
        <input
          id="title"
          v-model="musicTitle"
          type="text"
          placeholder="输入标题"
          style="padding: 10px; width: 100%; border-radius: 40px; margin-top: 5px"
        />
      </div>

      <!-- 文案输入框 -->
      <div style="margin-bottom: 15px">
        <label for="description" style="font-size: 16px">Text</label>
        <textarea
          id="description"
          v-model="musicDescription"
          placeholder="输入音乐文案"
          rows="4"
          style="padding: 10px; width: 100%; border-radius: 40px; margin-top: 5px"
        ></textarea>
      </div>

      <!-- 音乐类型选择 -->
      <div style="margin-bottom: 15px">
        <label for="musicType" style="font-size: 16px">MusicType</label>
        <select
          id="musicType"
          v-model="musicType"
          style="padding: 10px; width: 100%; border-radius: 40px; margin-top: 5px"
        >
          <option value="pop">流行</option>
          <option value="rock">摇滚</option>
          <option value="hiphop">嘻哈</option>
          <option value="classical">古典</option>
          <option value="jazz">爵士</option>
          <option value="other">其他</option>
        </select>
      </div>

      <!-- 分享链接 -->
      <div style="margin-bottom: 15px">
        <label for="sharelink" style="font-size: 16px">分享链接</label>
        <input
          id="sharelink"
          v-model="shareLink"
          type="text"
          placeholder="输入分享链接"
          style="padding: 10px; width: 100%; border-radius: 40px; margin-top: 5px"
        />
      </div>

      <!-- 图片文件上传 -->
      <div style="margin-bottom: 15px">
        <label for="imageFile" style="font-size: 16px">上传封面</label>
        <input
          id="imageFile"
          type="file"
          accept="image/*"
          @change="handleImageChange"
          style="margin-top: 5px"
        />
      </div>

      <!-- 预览图片 -->
      <div v-if="previewImage" style="margin-bottom: 15px; text-align: center;">
        <img :src="previewImage" alt="Preview" style="max-width: 100%; max-height: 200px; border-radius: 10px" />
      </div>

      <!-- 提交按钮 -->
      <div style="margin-top: 20px; display: flex; justify-content: center;">
        <button
          type="submit"
          class="custom-button"
        >
          Share ->
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// 定义页面的数据
const musicTitle = ref('')
const musicDescription = ref('')
const musicType = ref('pop')
const musicFile = ref(null)
const shareLink = ref('')
const imageFile = ref(null)
const previewImage = ref(null) // 图片预览地址

// 处理图片上传
const handleImageChange = (event) => {
  const file = event.target.files[0]
  if (file && file.type.startsWith('image/')) {
    imageFile.value = file
    // 创建图片预览
    const reader = new FileReader()
    reader.onload = (e) => {
      previewImage.value = e.target.result
    }
    reader.readAsDataURL(file)
  } else {
    alert('请选择一个有效的图片文件')
  }
}

// 提交表单
const submitForm = () => {
  if (!musicTitle.value || !musicDescription.value || !musicFile.value || !shareLink.value || !imageFile.value) {
    alert('请填写所有必填项并上传音乐和图片文件')
    return
  }

  console.log('分享的音乐信息：', {
    title: musicTitle.value,
    description: musicDescription.value,
    type: musicType.value,
    musicFile: musicFile.value.name,
    shareLink: shareLink.value,
    imageFile: imageFile.value.name,
  })
}
</script>

<style scoped>
button {
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}
.custom-button {
  background-color: rgb(131, 175, 155); /* 默认背景颜色 */
  color: white;
  border-color: rgb(255, 255, 255); /* 默认边框颜色 */
  transition: background-color 0.3s, border-color 0.3s; /* 添加平滑过渡效果 */
  font-size: 50px;
  width: 300px;
  height: 100px;
  border-radius: 40px; /* 设置圆角 */
  border: none; /* 移除默认的边框 */
}

/* 鼠标悬停时的背景颜色 */
.custom-button:hover {
  background-color: rgb(254, 67, 101);
  border-color: rgb(254, 67, 101); /* 悬停时改变边框颜色 */
}
</style>
