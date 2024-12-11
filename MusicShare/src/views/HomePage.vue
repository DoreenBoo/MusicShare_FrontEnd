<template>
  <a-breadcrumb style="margin: 16px 0">
    <a-breadcrumb-item>Home</a-breadcrumb-item>

    <div style="display: flex; justify-content: center">
      <select
        v-model="selectedCategory"
        @change="filterCards"
        style="width: 300px; padding: 5px; border: 1px solid #ccc; border-radius: 40px"
      >
        <option value="" disabled>请选择音乐类别</option>
        <option value="全部">全部</option>
        <option v-for="category in categories" :key="category" :value="category">
          {{ category }}
        </option>
      </select>
    </div>
  </a-breadcrumb>

  <div>
    <Carousel autoplay>
      <div><h3>1</h3></div>
      <div><h3>2</h3></div>
      <div><h3>3</h3></div>
      <div><h3>4</h3></div>
    </Carousel>

    <div
      :style="{
        background: 'rgb(249,205,173)',
        padding: '20px',
        minHeight: '550px',
        flex: 1,
        width: '100%',
      }"
    >
      <a-row :gutter="8" style="display: flex; justify-content: center">
        <a-col
          v-for="item in filteredCards"
          :key="item.title"
          :span="6"
          style="display: flex; justify-content: center"
        >
          <a-card hoverable style="width: 300px; margin: 10px" @click="openModal(item)">
            <template #cover>
              <img alt="example" :src="item.image" />
            </template>
            <a-card-meta :title="item.title">
              <template #description>{{ item.description }}</template>
            </a-card-meta>
          </a-card>
        </a-col>
      </a-row>
    </div>

    <!-- 弹窗 -->

    <a-modal v-model:open="isModalVisible" :title="modalContent.title" footer=" ">
      <div>
        <h2>{{ modalContent.title }}</h2>
        <hr />
        <p>{{ modalContent.description }}</p>
        <div style="display: flex; justify-content: space-between; margin-top: 20px; align-items: center;">
          <div style="flex: 1;">
            <span>分享人：{{ modalContent.nickname }}</span>
          </div>
          <div style="display: flex; justify-content: flex-end; gap: 10px;">
            <i
              :class="modalContent.isLiked ? 'iconfont icon-dianzan1' : 'iconfont icon-dianzan'"
              style="font-size: 24px; cursor: pointer"
              @click.stop="toggleLike(modalContent)"
            ></i>
            <i class="iconfont icon-pinglun" style="font-size: 24px; cursor: pointer"></i>
            <i
              :class="modalContent.isCollected ? 'iconfont icon-shoucang1' : 'iconfont icon-shoucang'"
              style="font-size: 24px; cursor: pointer"
              @click.stop="toggleCollect(modalContent)"
            ></i>
          </div>
        </div>
      </div>
    </a-modal>

    <!-- 引入阿里巴巴的图标库 -->
    <link rel="stylesheet" href="//at.alicdn.com/t/c/font_4777430_1zg2x8pq844.css" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Carousel } from 'ant-design-vue'

const categories = ['流行', '摇滚', '嘻哈', '古典', '爵士', '其他']

const cards = [
  {
    title: '流行',
    description: 'This is a handsome girl.',
    image: '../src/assets/images/注意看，这是小帅.jpg',
    category: '流行',
    nickname: '小帅',
    isLiked: false, // 点赞状态
    isCollected: false, // 收藏状态
  },
  {
    title: '摇滚',
    description: '摇滚不死！！！',
    image: '../src/assets/images/注意看，这是小帅.jpg',
    category: '摇滚',
    nickname: '摇滚爱好者',
    isLiked: false, // 点赞状态
    isCollected: false, // 收藏状态
  },
  {
    title: '古典',
    description: 'This is a handsome girl.',
    image: '../src/assets/images/注意看，这是小帅.jpg',
    category: '古典',
    nickname: '古典迷',
    isLiked: false, // 点赞状态
    isCollected: false, // 收藏状态
  },
  {
    title: '其他',
    description: 'This is a handsome girl.',
    image: '../src/assets/images/注意看，这是小帅.jpg',
    category: '其他',
    nickname: '音乐杂食者',
    isLiked: false, // 点赞状态
    isCollected: false, // 收藏状态
  },
]

const selectedCategory = ref('全部')

const filteredCards = computed(() => {
  if (selectedCategory.value === '全部') return cards
  return cards.filter((card) => card.category === selectedCategory.value)
})

const filterCards = () => {
  console.log('选中的类别：', selectedCategory.value)
  console.log('筛选后的卡片：', filteredCards.value)
}

const isModalVisible = ref(false)
const modalContent = ref({})

// 打开弹窗
const openModal = (item) => {
  modalContent.value = item
  isModalVisible.value = true
}

// 点赞
const toggleLike = (item) => {
  item.isLiked = !item.isLiked
}

// 收藏
const toggleCollect = (item) => {
  item.isCollected = !item.isCollected
}
</script>

<style scoped>
select {
  transition: border 0.3s;
}

select:focus {
  border-color: #40a9ff;
  outline: none;
}

:deep(.slick-slide) {
  text-align: center;
  height: 160px;
  line-height: 160px;
  background: #364d79;
  overflow: hidden;
}

:deep(.slick-slide h3) {
  color: #fff;
}
</style>
