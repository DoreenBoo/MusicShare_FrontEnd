
import { ref } from 'vue'
import axios from 'axios'


// 定义响应数据
export const fans = ref([])
export const following = ref([])

const getAccessToken = () => {
  return localStorage.getItem('token')
}

// 获取粉丝列表
export const fetchFans = () => {
  const token = getAccessToken()
  axios
    .post(
      'http://localhost:8083/share-app-api/user/Fan',
      {}, // POST 请求体为空
      {
        headers: { Authorization: `${token}` },
      }
    )
    // 输出调试信息
    console.log('粉丝列表响应:', response.data)
    .then((response) => {
      if (response.data.code === 0) {
        fans.value = response.data.data // 假设返回的 `data` 是粉丝列表
      } else {
        console.error('获取粉丝列表失败:', response.data.message)
      }
    })
    .catch((error) => {
      console.error('获取粉丝列表请求错误:', error)
    })
}

// 获取关注列表
export const fetchFollowing = () => {
  const token = getAccessToken()
  axios
    .post(
      'http://localhost:8083/share-app-api/user/Followed',
      {}, // POST 请求体为空
      {
        headers: { Authorization: `${token}` },
      }
    )
    // 输出调试信息
    console.log('关注列表响应:', response.data)

    .then((response) => {
      if (response.data.code === 0) {
        following.value = response.data.data // 假设返回的 `data` 是关注列表
      } else {
        console.error('获取关注列表失败:', response.data.message)
      }
    })
    .catch((error) => {
      console.error('获取关注列表请求错误:', error)
    })
}
