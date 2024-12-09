import axios from 'axios'

// 创建 axios 实例，设置默认配置
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8083', // 统一的基础 URL
  timeout: 10000, // 请求超时
  headers: {
    'Content-Type': 'application/json',
  },
})

// 添加请求拦截器
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth-token') // 获取存储的 token
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}` // 自动添加 token
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// 添加响应拦截器
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error)
    return Promise.reject(error)
  },
)

export default axiosInstance
