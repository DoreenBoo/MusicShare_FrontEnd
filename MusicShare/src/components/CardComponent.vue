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
          <a-button type="primary" shape="round" :size="size" @click="downloadMusic">
            <template #icon>
              <DownloadOutlined />
            </template>
            Download
          </a-button>
        </p>
        <div style="
            display: flex;
            justify-content: space-between;
            margin-top: 20px;
            align-items: center;
          ">
          <div style="flex: 1">
            <span>分享人：{{ card.nickname }}</span>
            <a-button type="primary" style="margin-left: 10px;">关注</a-button>
          </div>
          <div style="display: flex; justify-content: flex-end; gap: 10px">
            <i class="iconfont icon-pinglun" style="font-size: 24px; cursor: pointer" @click.stop="toggleComments"></i>
            <i :class="card.isCollected ? 'iconfont icon-shoucang1' : 'iconfont icon-shoucang'"
              style="font-size: 24px; cursor: pointer" @click.stop="toggleCollect"></i>
          </div>
        </div>

        <!-- 评论区 -->
        <div v-if="showComments" style="margin-top: 20px">
          <a-input v-model="newComment" placeholder="添加评论..." @pressEnter="addComment" style="margin-bottom: 10px" />
          <a-button type="primary" @click="addComment">提交</a-button>
          <a-list class="comment-list" :header="`${comments.length} replies`" item-layout="horizontal"
            :data-source="comments">
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
import axios from 'axios'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)
import { DownloadOutlined } from '@ant-design/icons-vue';

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

// 获取用户的 access token
const getAccessToken = () => {
  return localStorage.getItem('token')  // 从 localStorage 获取 token，确保该 token 是你在用户登录时存储的
}

const openModal = () => {
  isModalVisible.value = true
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
const isDownloading = ref(false) // 用来表示是否正在下载

// 下载音乐文件的方法
const downloadMusic = () => {
  isDownloading.value = true // 开始下载，显示加载状态
  const token = getAccessToken() // 获取登录令牌
  const downloadUrl = props.card.link // 使用card中的link属性作为下载链接

  axios
    .get(downloadUrl, {
      headers: {
        Authorization: `${token}`,
      },
      responseType: 'blob', // 表明响应类型是文件流
    })
    .then((response) => {
      // 获取文件名，可以根据后端响应的内容来获取
      const contentDisposition = response.headers['content-disposition']
      const fileName = contentDisposition ? contentDisposition.split('filename=')[1] : 'music_file.mp3'

      // 创建一个下载链接
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', fileName) // 设置下载文件名
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link) // 下载完成后清理
      window.URL.revokeObjectURL(url)
    })
    .catch((error) => {
      console.error('下载错误:', error)
      alert('下载过程中发生错误，请稍后再试。')
    })
    .finally(() => {
      isDownloading.value = false // 下载完成或失败后，恢复按钮状态
    })
}


</script>

<style scoped>
.comment-list {
  margin-top: 20px;
}
</style>
