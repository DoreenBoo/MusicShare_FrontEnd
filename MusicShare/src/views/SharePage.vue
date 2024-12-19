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


      <!-- 音乐文件上传 -->
      <div style="margin-bottom: 15px">
        <label for="musicFile" style="font-size: 16px">上传音乐</label>
        <input
          id="musicFile"
          type="file"
          accept="audio/*"
          @change="handleFileChange"
          style="margin-top: 5px"
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
import axios from 'axios'

// 定义页面的数据
const musicTitle = ref('')
const musicDescription = ref('')
const musicType = ref('pop')
const musicFile = ref(null)
const imageFile = ref(null)
const previewImage = ref(null) // 图片预览地址

const getAccessToken = () => {
  return localStorage.getItem('token')
}

// 处理文件上传
const handleFileChange = (event) => {
  const file = event.target.files[0]
  if (file && file.type.startsWith('audio/')) {
    musicFile.value = file
  } else {
    alert('请选择一个有效的音乐文件')
    event.target.value = '' // 清空文件输入
  }
}

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
    event.target.value = '' // 清空文件输入
  }
}
// 定义热门歌曲列表
const popularSongs = ref([])  // 存储热门歌曲列表
// 提交表单
// 提交表单
const submitForm = async () => {
  const token = getAccessToken() // 获取登录令牌
  if (!musicTitle.value || !musicDescription.value || !musicFile.value || !imageFile.value) {
    alert('请填写所有必填项并上传音乐和图片文件')
    return
  }

// 创建 FormData 对象
  const formData = new FormData()
  formData.append('name', musicTitle.value)
  formData.append('description', musicDescription.value)
  formData.append('keywords', musicType.value) // 根据实际情况调整
  formData.append('cover', imageFile.value)
  formData.append('music', musicFile.value)
  
   // 发送 Axios 请求
  axios.post('http://localhost:8083/share-app-api/user/UploadMusic', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `${token}`,
      
    }
  })
  .then(response => {
    // 假设后端返回的数据结构为 { success: true, message: "上传成功" }
    if (response.data && response.data.code === 0) {
      alert('上传成功！')
      // 保存上传数据到 localStorage
      const uploadedData = {
        title: musicTitle.value,
        description: musicDescription.value,
        type: musicType.value,
        cover: URL.createObjectURL(imageFile.value), // 创建图片的临时 URL
        music: URL.createObjectURL(musicFile.value), // 创建音乐文件的临时 URL
      }

      // 获取已有的上传数据（如果有的话），并添加新的数据
      let uploadedList = JSON.parse(localStorage.getItem('uploadedMusicList') || '[]')
      uploadedList.push(uploadedData)

      // 保存回 localStorage
      localStorage.setItem('uploadedMusicList', JSON.stringify(uploadedList))

      // 清空表单
      musicTitle.value = ''
      musicDescription.value = ''
      musicType.value = 'pop'
      musicFile.value = null
      imageFile.value = null
      previewImage.value = null

      // 重置文件输入框
      document.getElementById('musicFile').value = ''
      document.getElementById('imageFile').value = ''
    } else {
      alert('上传失败：' + (response.data.message || '未知错误'))
    }
  })
  .catch(error => {
    console.error('上传错误:', error)
    alert('上传过程中发生错误，请稍后再试。')
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
