<template>
  <a-breadcrumb style="margin: 16px 0">
    <a-breadcrumb-item>My Collection</a-breadcrumb-item>
  </a-breadcrumb>

  <div>
    <!-- Cards Section -->
    <div
      :style="{
        background: 'rgb(249,205,173)',
        padding: '30px',
        minHeight: '700px',
        flex: 1,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }"
    >
      <a-row :gutter="8" justify="center">
        <a-col :span="6" v-for="item in cards" :key="item.title" style="display: flex; justify-content: center;">
          <a-card hoverable style="width: 250px; margin: 10px;">
            <template #cover>
              <img alt="example" :src="item.image" />
            </template>
            <a-card-meta :title="item.title">
              <template #description>
                {{ item.description }}
              </template>
            </a-card-meta>
          </a-card>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script setup>
// 收藏的音乐卡片数据
const cards = [
  {
    title: '流行专辑',
    description: '这是一张流行音乐专辑。',
    image: '../src/assets/images/注意看，这是小帅.jpg',
  },
  {
    title: '摇滚专辑',
    description: '摇滚不死！！！',
    image: '../src/assets/images/注意看，这是小帅.jpg',
  },
  {
    title: '古典专辑',
    description: '这是一张古典音乐专辑。',
    image: '../src/assets/images/注意看，这是小帅.jpg',
  },
  {
    title: '其他专辑',
    description: '这是一张其他类型音乐专辑。',
    image: '../src/assets/images/注意看，这是小帅.jpg',
  },
];
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
