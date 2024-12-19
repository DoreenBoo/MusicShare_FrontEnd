<template>
  <div style="display: flex; justify-content: space-between; padding: 20px">
    <!-- 左侧审核音乐列表 -->
    <div style="flex: 1; margin-right: 20px">
      <h2>审核音乐信息</h2>

      <!-- 搜索框 -->
      <div style="margin-bottom: 20px; width: 700px">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="搜索音乐标题、描述或类型"
          style="padding: 10px; width: 100%; border-radius: 40px; border: 1px solid #ccc"
        />
        <!-- 搜索按钮 -->
        <button @click="searchMusic" style="padding: 10px 20px; border-radius: 40px; background-color: #3498db; color: white; border: none; cursor: pointer;">
          搜索
        </button>
      </div>

      <!-- 音乐列表 -->
      <div style="margin-top: 20px">
        <table border="1" style="width: 100%; border-collapse: collapse">
          <thead>
            <tr>
              <th>标题</th>
              <th>描述</th>
              <th>类型</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="music in filteredMusicList" :key="music.id">
              <td>{{ music.song_name }}</td>
              <td>{{ music.description }}</td>
              <td>{{ music.keywords }}</td>
              <td>
                <button @click="approveMusic(music.id)">通过</button>
                <button @click="rejectMusic(music.id)">拒绝</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- 右侧通过和拒绝的音乐 -->
    <div style="flex: 1; margin-left: 20px; width: 500px">
      <div style="margin-bottom: 20px">
        <h3>通过的音乐</h3>
        <div
          style="
            padding: 10px;
            background-color: rgb(249, 205, 173);
            border-radius: 40px;
            min-height: 250px;
          "
        >
          <ul>
            <li v-for="music in approvedMusic" :key="music.id">{{ music.song_name }}</li>
          </ul>
        </div>
      </div>

      <div>
        <h3>拒绝的音乐</h3>
        <div
          style="
            padding: 10px;
            background-color: rgb(249, 205, 173);
            border-radius: 40px;
            min-height: 250px;
          "
        >
          <ul>
            <li v-for="music in rejectedMusic" :key="music.id">{{ music.song_name }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed,onMounted } from 'vue'
import axios from 'axios'

// 示例音乐数据
const musicList = ref([])

// 搜索条件
const searchQuery = ref('')

// 审核通过和拒绝的音乐
const approvedMusic = ref([])
const rejectedMusic = ref([])

const getAccessToken = () => {
  return localStorage.getItem('token')
}
const searchMusic=()=>{
  const token = getAccessToken() // 获取登录令牌
  axios
    .post(
      'http://localhost:8083/share-app-api/manager/SearchMusic', // 假设你的接口是这个地址
      new URLSearchParams({ keyword: searchQuery.value }), // 发送关键词
      {
        headers: {
          Authorization: `${token}`, // 添加 Bearer token
        },
      }
    )
    .then((response) => {
      if (response.data && response.data.data) {
        musicList.value = response.data.data || [] // 假设返回的结构为 { data: [...] }
      } else {
        alert('没有找到相关音乐')
      }
    })
    .catch((error) => {
      console.error('搜索音乐失败:', error)
    })
}

// 获取待审核的音乐
const fetchMusicNeedAudit = () => {
  const token = getAccessToken() // 获取登录令牌
  axios
    .post('http://localhost:8083/share-app-api/manager/GetMusicNeedAudit', {},{
      headers: {
        Authorization: `${token}`,
      },
    }

    )
    .then((response) => {
      if (response.data && response.data.data) {
        musicList.value = response.data.data || [] // 假设返回的结构为 { data: [...] }
      } else {
        alert('获取待审核音乐失败')
      }
    })
    .catch((error) => {
      console.error('获取待审核音乐失败:', error)
    })
}

// 审核通过函数
const approveMusic = (musicId) => {
  if (!musicId) {
    alert('无效的音乐 ID');
    return;
  }

  const token = getAccessToken() // 获取登录令牌
  axios
    .post(
      'http://localhost:8083/share-app-api/manager/UpdateMusic',
      new URLSearchParams({  music_id: musicId, status: '上线中' }),
       {
        headers: {
          Authorization: `${token}`, // 添加 Bearer token
      
        },
      }
    )
    .then((response) => {
      if (response.data) {
        const music = musicList.value.find((music) => music.id === musicId)
        if (music) {
          approvedMusic.value.push(music) // 添加到通过的音乐列表
          musicList.value = musicList.value.filter((music) => music.id !== musicId) // 从待审核列表中移除
        }
        alert(`音乐 ID ${musicId} 审核通过`)
      } else {
        alert('更新音乐状态失败')
      }
    })
    .catch((error) => {
      console.error('审核通过失败:', error)
    })
}

// 审核拒绝函数
const rejectMusic = (musicId) => {
  const token = getAccessToken() // 获取登录令牌
  axios
    .post(
      'http://localhost:8083/share-app-api/manager/DeleteMusic',
      new URLSearchParams({  id: musicId }),
      {
        headers: {
          Authorization: `${token}`, // 添加 Bearer token
      
        },
      }
    )
    .then((response) => {
      if (response.data) {
        const music = musicList.value.find((music) => music.id === musicId)
        if (music) {
          rejectedMusic.value.push(music) // 添加到拒绝的音乐列表
          musicList.value = musicList.value.filter((music) => music.id !== musicId) // 从待审核列表中移除
        }
        alert(`音乐 ID ${musicId} 审核拒绝`)
      } else {
        alert('更新音乐状态失败')
      }
    })
    .catch((error) => {
      console.error('审核拒绝失败:', error)
    })
}

// 计算属性：过滤后的音乐列表
const filteredMusicList = computed(() => {
  const query = searchQuery.value.toLowerCase()
  return musicList.value.filter((music) => {
    return (
      music.song_name.toLowerCase().includes(query) ||
      music.description.toLowerCase().includes(query) ||
      music.keywords.toLowerCase().includes(query)
    )
  })
})

// 页面加载时获取待审核音乐
onMounted(() => {
  fetchMusicNeedAudit()
})
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 10px;
  text-align: left;
}

button {
  padding: 5px 10px;
  margin: 5px;
  cursor: pointer;
  border-radius: 40px;
}

button:hover {
  background-color: rgb(254, 67, 101);
  color: white;
}
</style>
