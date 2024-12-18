import { defineStore } from 'pinia'
import axios from 'axios'

// 获取登录令牌
const getAccessToken = () => {
  return localStorage.getItem('token')
}

export const useCardStore = defineStore('cardStore', {
  state: () => ({
    cards: [], // 卡片数据
  }),
  getters: {
    getCards: (state) => state.cards, // 获取所有卡片
  },
  actions: {
    // 获取所有卡片数据
    fetchCards() {
      const token = getAccessToken() // 获取登录令牌
      axios
        .post(
          'http://localhost:8083/music-share/user/GetLatestMusic',
          {},
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `${token}`, // 添加 Authorization 头部
            },
          },
        ) // 后端接口
        .then((response) => {
          console.log('返回的数据:', response.data) // 打印返回的数据

          // 确保返回的数据格式符合预期
          if (response.data.code === 0 && Array.isArray(response.data.data)) {
            const songs = response.data.data // 获取 data 数组

            // 按照 id 降序排列（id 越大越新）
            const sortedSongs = songs.sort((a, b) => b.id - a.id)

            // 获取最新的 20 条数据
            const latestSongs = sortedSongs.slice(0, 20)

            this.cards = latestSongs.map((song) => ({
              title: song.song_name,
              author: song.author_name,
              description: song.description,
              image: song.cover,
              link: song.link,
              isCollected: false,
              category: song.keywords || '其他',
            }))
          } else {
            console.error('返回的数据格式不符合预期:', response.data)
          }
        })
        .catch((error) => {
          console.error('Error fetching cards:', error)
        })
    },
    // 更新卡片
    updateCard(updatedCard) {
      const index = this.cards.findIndex((card) => card.title === updatedCard.title)
      if (index !== -1) {
        this.cards.splice(index, 1, updatedCard)
      }
    },
  },
})
