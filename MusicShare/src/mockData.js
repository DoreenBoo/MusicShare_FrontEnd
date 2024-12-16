import { ref } from 'vue'

// 模拟粉丝数据
export const fans = ref([
  { id: 1, name: '粉丝A' },
  { id: 2, name: '粉丝B' },
  { id: 3, name: '粉丝C' },
])

// 模拟关注数据
export const following = ref([
  { id: 1, name: '关注A' },
  { id: 2, name: '关注B' },
  { id: 3, name: '关注C' },
])
