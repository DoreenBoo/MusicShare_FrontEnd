<template>
    <a-breadcrumb style="margin: 16px 0">
        <a-breadcrumb-item>My Shared Music</a-breadcrumb-item>
    </a-breadcrumb>

    <div>
        <!-- Cards Section -->
        <div :style="{
    background: ' rgb(249, 205, 173)',
            padding: '30px',
            minHeight: '700px',
            flex: 1,
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
        }">
            <a-row :gutter="8" justify="center">
                <a-col :span="6" v-for="item in sharedCards" :key="item.title"
                    style="display: flex; justify-content: center;">
                    <CardComponent :card="item" @removeSharedCard="removeSharedCard" />
                </a-col>
            </a-row>
        </div>
    </div>
    <link rel="stylesheet" href="//at.alicdn.com/t/c/font_4777430_1zg2x8pq844.css" />
</template>

<script setup>
import { ref } from 'vue';
import CardComponent from '../components/CardComponent.vue'; // 确保路径正确

// 模拟从数据源获取用户分享的音乐卡片数据
const sharedCards = ref([
    {
        title: '浪漫单曲',
        description: '一首浪漫的单曲分享给大家。',
        image: '../src/assets/images/注意看，这是小帅.jpg',
        nickname: '杜雨竹',
        isLiked: true,
        isCollected: false,
    },
    {
        title: '爵士乐精选',
        description: '一张爵士乐精选合集。',
        image: '../src/assets/images/注意看，这是小帅.jpg',
        nickname: '杜雨竹',
        isLiked: true,
        isCollected: false,
    },
    {
        title: '流行金曲',
        description: '推荐这张流行金曲专辑！',
        image: '../src/assets/images/注意看，这是小帅.jpg',
        nickname: '杜雨竹',
        isLiked: true,
        isCollected: false,
    },
]);

// 删除用户分享的音乐
const removeSharedCard = (cardToRemove) => {
    sharedCards.value = sharedCards.value.filter(card => card.title !== cardToRemove.title);
};
</script>

<style scoped>
/* 卡片样式 */
a-card {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

a-card-meta {
    text-align: center;
}

a-card img {
    width: 100%;
    border-radius: 10px;
}

/* 让卡片在屏幕上居中 */
a-row {
    display: flex;
    justify-content: center;
}
</style>
