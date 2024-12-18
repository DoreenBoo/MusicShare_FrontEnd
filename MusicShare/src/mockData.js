import { ref } from 'vue'

// 模拟粉丝数据
export const fans = ref([
  {
    id: 1,
    name: '粉丝A',
    avatar:
      'https://tse3-mm.cn.bing.net/th/id/OIP-C.cS2yqZtAr8qlpq8MO6SI0AAAAA?w=216&h=216&c=7&r=0&o=5&dpr=1.5&pid=1.7',
  },
  {
    id: 2,
    name: '粉丝B',
    avatar:
      'https://tse2-mm.cn.bing.net/th/id/OIP-C.MM6eHlxWb5-2gA4W3T8eOAAAAA?w=175&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7',
  },
  {
    id: 3,
    name: '粉丝C',
    avatar:
      'https://tse3-mm.cn.bing.net/th/id/OIP-C.o6PZmq_-1pL2iRcw-nYIwAAAAA?w=200&h=200&c=7&r=0&o=5&dpr=1.5&pid=1.7',
  },
])

// 模拟关注数据
export const following = ref([
  {
    id: 1,
    name: '关注A',
    avatar:
      'https://tse1-mm.cn.bing.net/th/id/OIP-C.mLYBeTCiw41uzRAgoARGnQAAAA?w=177&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7',
  },
  {
    id: 2,
    name: '关注B',
    avatar:
      'https://tse2-mm.cn.bing.net/th/id/OIP-C.XPI57eEscaidFS1Nt9bN4gAAAA?w=215&h=210&c=7&r=0&o=5&dpr=1.5&pid=1.7',
  },
  {
    id: 3,
    name: '关注C',
    avatar:
      'https://tse3-mm.cn.bing.net/th/id/OIP-C.ja3KTOAdQk3LM73DJiFRsAAAAA?w=178&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7',
  },
])
