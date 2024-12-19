
import { ref } from 'vue'
import axios from 'axios'
import { message } from 'ant-design-vue'



// 定义响应数据
export const fans = ref([])
export const following = ref([])

const getAccessToken = () => {
  return localStorage.getItem('token')
}

// 将后端数据转换为前端需要的格式
const transformUserData = (data) => {
  return data.map(user => ({
    id: user.id,
    avatar: user.avatar,
    name: user.nickname, // 映射 nickname 为 name
    followed: !!user.followed_id, // 根据 followed_id 确定是否已关注
    gender: user.gender,
    motto: user.motto
  }))
}
// 获取粉丝列表
export const fetchFans = (page = 0, size = 10) => {
  const token = getAccessToken()
  axios
    .post(
      'http://localhost:8083/share-app-api/user/Fan',
      { page, size }, // POST 请求体为空
      {
        headers: { Authorization: `${token}` },
      }
    )
    // 输出调试信息
   
    .then((response) => {
       console.log('粉丝列表响应:', response.data)
      if (response.data.code === 0) {
        fans.value = response.data.data // 假设返回的 `data` 是粉丝列表
        return response.data.data.length
      } else {
        console.error('获取粉丝列表失败:', response.data.msg)
      }
    })
    .catch((error) => {
      console.error('获取粉丝列表请求错误:', error)
    })
}

// 获取关注列表
export const fetchFollowing = (page = 0, size = 10) => {
  const token = getAccessToken()
  axios
    .post(
      'http://localhost:8083/share-app-api/user/Followed',
      {page, size }, // POST 请求体为空
      {
        headers: { Authorization: `${token}` },
      }
    )
    // 输出调试信息
    console.log('关注列表响应:', response.data)

    .then((response) => {
      if (response.data.code === 0) {
        following.value = response.data.data // 假设返回的 `data` 是关注列表
        return response.data.data.length
      } else {
        console.error('获取关注列表失败:', response.data.msg)
      }
    })
    .catch((error) => {
      console.error('获取关注列表请求错误:', error)
    })
}

