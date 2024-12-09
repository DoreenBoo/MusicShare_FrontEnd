<template>
  <div style="display: flex; justify-content: space-between; padding: 20px;">
    <!-- 左侧审核音乐列表 -->
    <div style="flex: 1; margin-right: 20px;">
      <h2>审核音乐信息</h2>
      
      <!-- 搜索框 -->
      <div style="margin-bottom: 20px;width: 700px;">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="搜索音乐标题、描述或类型"
          style="padding: 10px; width: 100%; border-radius: 40px; border: 1px solid #ccc;"
        />
      </div>

      <!-- 音乐列表 -->
      <div style="margin-top: 20px;">
        <table border="1" style="width: 100%; border-collapse: collapse;">
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
              <td>{{ music.title }}</td>
              <td>{{ music.description }}</td>
              <td>{{ music.type }}</td>
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
    <div style="flex: 1; margin-left: 20px;width: 500px;">
      <div style="margin-bottom: 20px;">
        <h3>通过的音乐</h3>
        <div style="padding: 10px; background-color: rgb(249, 205, 173); border-radius: 40px; min-height: 250px;">
          <ul>
            <li v-for="music in approvedMusic" :key="music.id">{{ music.title }}</li>
          </ul>
        </div>
      </div>

      <div>
        <h3>拒绝的音乐</h3>
        <div style="padding: 10px; background-color: rgb(249, 205, 173); border-radius: 40px; min-height: 250px;">
          <ul>
            <li v-for="music in rejectedMusic" :key="music.id">{{ music.title }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// 示例音乐数据
const musicList = ref([
  { id: 1, title: '音乐1', description: '描述1', type: '流行' },
  { id: 2, title: '音乐2', description: '描述2', type: '摇滚' },
  { id: 3, title: '音乐3', description: '描述3', type: '嘻哈' },
  { id: 4, title: '音乐4', description: '描述4', type: '古典' },
])

// 搜索条件
const searchQuery = ref('')

// 审核通过和拒绝的音乐
const approvedMusic = ref([])
const rejectedMusic = ref([])

// 审核通过函数
const approveMusic = (musicId) => {
  const music = musicList.value.find((music) => music.id === musicId)
  if (music) {
    approvedMusic.value.push(music) // 添加到通过的音乐列表
    musicList.value = musicList.value.filter((music) => music.id !== musicId) // 从待审核列表中移除
  }
  alert(`音乐 ID ${musicId} 审核通过`)
}

// 审核拒绝函数
const rejectMusic = (musicId) => {
  const music = musicList.value.find((music) => music.id === musicId)
  if (music) {
    rejectedMusic.value.push(music) // 添加到拒绝的音乐列表
    musicList.value = musicList.value.filter((music) => music.id !== musicId) // 从待审核列表中移除
  }
  alert(`音乐 ID ${musicId} 审核拒绝`)
}

// 计算属性：过滤后的音乐列表
const filteredMusicList = computed(() => {
  const query = searchQuery.value.toLowerCase()
  return musicList.value.filter((music) => {
    return (
      music.title.toLowerCase().includes(query) ||
      music.description.toLowerCase().includes(query) ||
      music.type.toLowerCase().includes(query)
    )
  })
})
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 10px;
  text-align: left;
}

button {
  padding: 5px 10px;
  margin: 5px;
  cursor: pointer;
}

button:hover {
  background-color: rgb(254, 67, 101);
  color: white;
}
</style>
