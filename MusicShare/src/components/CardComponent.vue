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
        <hr />
        <p>{{ card.description }}</p>
        <p>
          分享链接：<a :href="card.link" target="_blank">{{ card.link }}</a>
        </p>
        <div
          style="
            display: flex;
            justify-content: space-between;
            margin-top: 20px;
            align-items: center;
          "
        >
          <div style="flex: 1">
            <span>分享人：{{ card.nickname }}</span>
          </div>
          <div style="display: flex; justify-content: flex-end; gap: 10px">
            <i
              :class="card.isLiked ? 'iconfont icon-dianzan1' : 'iconfont icon-dianzan'"
              style="font-size: 24px; cursor: pointer"
              @click.stop="toggleLike"
            ></i>
            <i
              class="iconfont icon-pinglun"
              style="font-size: 24px; cursor: pointer"
              @click.stop="toggleComments"
            ></i>
            <i
              :class="card.isCollected ? 'iconfont icon-shoucang1' : 'iconfont icon-shoucang'"
              style="font-size: 24px; cursor: pointer"
              @click.stop="toggleCollect"
            ></i>
          </div>
        </div>

        <!-- 评论区 -->
        <div v-if="showComments" style="margin-top: 20px">
          <a-input
            v-model="newComment"
            placeholder="添加评论..."
            @pressEnter="addComment"
            style="margin-bottom: 10px"
          />
          <a-button type="primary" @click="addComment">提交</a-button>
          <a-list
            class="comment-list"
            :header="`${comments.length} replies`"
            item-layout="horizontal"
            :data-source="comments"
          >
            <template #renderItem="{ item }">
              <a-list-item>
                <a-comment :author="item.author" :avatar="item.avatar">
                  <template #actions>
                    <span v-for="(action, index) in item.actions" :key="index">{{ action }}</span>
                  </template>
                  <template #content>
                    <p>{{ item.content }}</p>
                  </template>
                  <template #datetime>
                    <a-tooltip :title="item.datetime.format('YYYY-MM-DD HH:mm:ss')">
                      <span>{{ item.datetime.fromNow() }}</span>
                    </a-tooltip>
                  </template>
                </a-comment>
              </a-list-item>
            </template>
          </a-list>
        </div>
      </div>
    </a-modal>
  </a-card>
</template>

<script setup>
import { ref, defineEmits } from 'vue'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

const props = defineProps({
  card: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['updateCard'])

const isModalVisible = ref(false)
const newComment = ref('')
const comments = ref([]) // 存储评论列表
const showComments = ref(false) // 控制评论区域的显示状态

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

const toggleComments = () => {
  showComments.value = !showComments.value // 切换评论区域的显示状态
}

const addComment = () => {
  if (newComment.value.trim()) {
    const comment = {
      author: '当前用户', // 这里可以替换为当前用户的名字
      avatar: 'https://joeschmoe.io/api/v1/random', // 用户头像
      content: newComment.value,
      datetime: dayjs(),
      actions: ['Reply to'],
    }
    comments.value.push(comment) // 添加新评论
    newComment.value = '' // 清空输入框
  }
}
</script>

<style scoped>
/* 添加样式 */
.comment-list {
  margin-top: 20px;
}
</style>
