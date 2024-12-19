<template>
  <a-card hoverable style="width: 300px; margin: 10px" @click="openModal">
    <template #cover>
      <img alt="example" :src="card.cover" />
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
        <div
          style="
            display: flex;
            justify-content: space-between;
            margin-top: 20px;
            align-items: center;
          "
        >
          <div style="flex: 1">
            <span>分享人：{{ card.author }}</span>
            <a-button type="primary" style="margin-left: 10px" @click="addFollow">{{
              card.isFollowed ? '取消关注' : '关注'
            }}</a-button>
          </div>
          <div style="display: flex; justify-content: flex-end; gap: 10px">
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
import axios from 'axios'
dayjs.extend(relativeTime)
import { DownloadOutlined } from '@ant-design/icons-vue'

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

const getAccessToken = () => {
  return localStorage.getItem('token')
}

const openModal = () => {
  isModalVisible.value = true
}

// 修改后的收藏/取消收藏逻辑
const toggleCollect = () => {
  console.log(props.card) // 检查 card 对象的结构
  const token = getAccessToken()
  const formData = new URLSearchParams()
  formData.append('music_id', props.card.id)
  if (!props.card.isCollected) {
    // 当前未收藏，执行添加收藏请求
    axios
      .post('http://localhost:8083/share-app-api/user/AddFavorites', formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `${token}`,
        },
      })
      .then((response) => {
        if (response.data.code === 0) {
          const updatedCard = { ...props.card, isCollected: true }
          emit('updateCard', updatedCard)
          console.log('收藏成功')
        } else {
          console.error('收藏失败:', response.data.msg)
        }
      })
      .catch((error) => {
        console.error('请求错误:', error)
      })
  } else {
    // 当前已收藏，执行取消收藏请求
    axios
      .post('http://localhost:8083/share-app-api/user/DeleteFavorites', null, {
        params: {
          id: props.card.id, // 假设使用同一个id取消收藏，如需收藏记录ID请根据后端修改
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `${token}`,
        },
      })
      .then((response) => {
        if (response.data.code === 0) {
          const updatedCard = { ...props.card, isCollected: false }
          emit('updateCard', updatedCard)
          console.log('取消收藏成功')
        } else {
          console.error('取消收藏失败:', response.data.msg)
        }
      })
      .catch((error) => {
        console.error('请求错误:', error)
      })
  }
}

const toggleComments = () => {
  showComments.value = !showComments.value // 切换评论区域的显示状态
}
const addFollow = () => {
  const token = getAccessToken()
  const url = props.card.isFollowed ? '/remove-follow' : '/add-follow' // 根据当前状态判断请求的 URL
  axios
    .post(
      'http://localhost:8083/share-app-api/user/GetNotification',
      {
        followedId: props.card.id,
      },
      {
        headers: {
          Authorization: `${token}`, // 确保带上正确的授权信息
        },
      },
    ) // 向后端发送请求，传递目标用户 ID
    .then((response) => {
      // 假设后端返回结果表明关注状态已经更新
      const updatedCard = { ...props.card, isFollowed: !props.card.isFollowed }
      emit('updateCard', updatedCard) // 更新父组件的数据
    })
    .catch((error) => {
      console.error('关注操作失败', error)
    })
}

const addComment = () => {
 
  console.log('提交按钮被点击了');
  if (newComment.value.trim()) {
    // 获取评论者信息（可以通过登录的用户信息来获得）
    const commenterId = 1; // 假设获取当前登录用户的 ID
    const commenterNickname = '当前用户'; // 当前用户昵称
    const commenterAvatar = 'https://joeschmoe.io/api/v1/random'; // 当前用户头像，可以从用户信息中动态获取
    const commentMusicId = props.card.id; // 当前音乐的 ID
    const recipientId = 0; // 如果评论是公开的，recipient_id 可以是 0

    // 构建评论对象
    const comment = {
      content: newComment.value, // 用户输入的评论内容
      likes_count: 0, // 初始时点赞数为 0
      commenter_id: commenterId,
      comment_nickname: commenterNickname,
      comment_avatar: commenterAvatar,
      comment_music_id: commentMusicId,
      recipient_id: recipientId,
    };

    // 发送评论到后端
    const token = getAccessToken();
    const formData = new URLSearchParams();

    formData.append('content', newComment.value);
    formData.append('likes_count', 0);
    formData.append('commenter_id', commenterId);
    formData.append('comment_nickname', commenterNickname);
    formData.append('comment_avatar', commenterAvatar);
    formData.append('comment_music_id', commentMusicId);
    formData.append('recipient_id', recipientId);

    axios
      .post('http://localhost:8083/share-app-api/user/AddComment', formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded', // 设置为 JSON 格式
          Authorization: `${token}`,
        },
      })
      .then((response) => {
        if (response.data.code === 0) {
          // 评论成功后，更新评论列表
          comments.value.push(comment);
          newComment.value = ''; // 清空输入框
        } else {
          console.error('评论失败:', response.data.msg);
        }
      })
      .catch((error) => {
        console.error('请求错误:', error);
      });
  }
};
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
      const fileName = contentDisposition
        ? contentDisposition.split('filename=')[1]
        : 'music_file.mp3'

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
/* 添加样式 */
.comment-list {
  margin-top: 20px;
}
</style>
