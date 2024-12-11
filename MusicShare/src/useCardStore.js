import { ref } from 'vue'

const cards = ref([
  {
    title: '流行',
    description: 'This is a handsome girl.',
    image: '../src/assets/images/注意看，这是小帅.jpg',
    category: '流行',
    nickname: '小帅',
    isLiked: false,
    isCollected: false,
  },
  {
    title: '摇滚',
    description: '摇滚不死！！！',
    image: '../src/assets/images/注意看，这是小帅.jpg',
    category: '摇滚',
    nickname: '摇滚爱好者',
    isLiked: false,
    isCollected: false,
  },
  {
    title: '古典',
    description: 'This is a handsome girl.',
    image: '../src/assets/images/注意看，这是小帅.jpg',
    category: '古典',
    nickname: '古典迷',
    isLiked: false,
    isCollected: false,
  },
  {
    title: '其他',
    description: 'This is a handsome girl.',
    image: '../src/assets/images/注意看，这是小帅.jpg',
    category: '其他',
    nickname: '音乐杂食者',
    isLiked: false,
    isCollected: false,
  },
])

const useCardStore = () => {
  const getCards = () => cards.value

  const updateCard = (updatedCard) => {
    const index = cards.value.findIndex((card) => card.title === updatedCard.title)
    if (index !== -1) {
      cards.value[index] = updatedCard
    }
  }

  return {
    getCards,
    updateCard,
  }
}

export default useCardStore
