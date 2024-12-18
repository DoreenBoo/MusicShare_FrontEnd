<template>
    <a-modal :visible="visible" :title="title" @cancel="onClose" footer="">
        <div>
            <ul class="user-list">
                <li v-for="item in list" :key="item.id" class="user-item">
                    <!-- 点击头像 -->
                    <a @click="onAvatarClick(item)" class="user-avatar-link">
                        <img :src="item.avatar" alt="avatar" class="user-avatar" />
                    </a>
                    <span class="user-name">{{ item.name }}</span>
                    <a-button type="primary" class="follow-btn" @click="onFollow(item)">
                        {{ item.followed ? '取消关注' : '加关注' }}
                    </a-button>
                </li>
            </ul>
        </div>
    </a-modal>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

defineProps({
    visible: Boolean,
    title: String,
    list: Array, // 用户列表: 每项包含 { id, avatar, name, followed }
});

const emit = defineEmits(['close', 'follow', 'avatarClick']);

const onClose = () => {
    emit('close');
};

const onFollow = (item) => {
    emit('follow', item);
};

const onAvatarClick = (item) => {
    emit('avatarClick', item); // 点击头像时触发事件
};
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

</style>
