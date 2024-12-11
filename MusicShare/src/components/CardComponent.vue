<template>
  <a-card hoverable style="width: 300px; margin: 10px" @click="openModal">
    <template #cover>
      <img alt="example" :src="card.image" />
    </template>
    <a-card-meta :title="card.title">
      <template #description>{{ card.description }}</template>
    </a-card-meta>

    <a-modal v-model:open="isModalVisible" :title="card.title" footer=" ">
      <div>
        <h2>{{ card.title }}</h2>
        <hr />
        <p>{{ card.description }}</p>
        <div style="display: flex; justify-content: space-between; margin-top: 20px; align-items: center;">
          <div style="flex: 1;">
            <span>分享人：{{ card.nickname }}</span>
          </div>
          <div style="display: flex; justify-content: flex-end; gap: 10px;">
            <i
              :class="card.isLiked ? 'iconfont icon-dianzan1' : 'iconfont icon-dianzan'"
              style="font-size: 24px; cursor: pointer"
              @click.stop="toggleLike"
            ></i>
            <i class="iconfont icon-pinglun" style="font-size: 24px; cursor: pointer"></i>
            <i
              :class="card.isCollected ? 'iconfont icon-shoucang1' : 'iconfont icon-shoucang'"
              style="font-size: 24px; cursor: pointer"
              @click.stop="toggleCollect"
            ></i>
          </div>
        </div>
      </div>
    </a-modal>
  </a-card>
</template>

<script setup>
import { ref, defineEmits } from 'vue'

const props = defineProps({
  card: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['updateCard'])

const isModalVisible = ref(false)

const openModal = () => {
  isModalVisible.value = true
}

const toggleLike = () => {
  const updatedCard = { ...props.card, isLiked: !props.card.isLiked }
  emit('updateCard', updatedCard)
}

const toggleCollect = () => {
  const updatedCard = { ...props.card, isCollected: !props.card.isCollected }
  emit('updateCard', updatedCard)
}
</script>

<style scoped>
/* 添加样式 */
</style>