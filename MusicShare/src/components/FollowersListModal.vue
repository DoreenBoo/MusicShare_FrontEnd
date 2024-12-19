<!-- src/components/UserListModal.vue -->
<template>
  <a-modal :visible="visible" :title="title" @cancel="onClose" footer="">
    <div>
      <a-spin :spinning="loading">
        <ul class="user-list">
          <li v-for="item in list" :key="item.id" class="user-item">

            <a>
              <img :src="item.avatar" alt="avatar" class="user-avatar" />
            </a>
            <span class="user-name">{{ item.name }}</span>
            <a-button
              type="primary"
              class="follow-btn"
              @click="onFollow(item)"
            >
              {{ item.followed ? '已关注' : '关注' }}
            </a-button>
          </li>
        </ul>
      </a-spin>
    </div>
  </a-modal>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  visible: Boolean,
  title: String,
  list: {
    type: Array,
    default: () => []
  }, // 用户列表: 每项包含 { id, avatar, name, followed }
  loading: Boolean
})

const emit = defineEmits(['close', 'follow', 'avatarClick'])

const onClose = () => {
  emit('close')
}

const onFollow = (item) => {
  emit('follow', item)
}


</script>

<style scoped>
.user-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.user-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  border-bottom: 1px solid #ccc;
  padding: 10px 0;
}

.user-avatar-link {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  cursor: pointer;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.user-name {
  flex: 1;
  font-size: 16px;
  color: #333;
}

.follow-btn {
  margin-left: 10px;
}
</style>
