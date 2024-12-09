<template>
  <!-- 管理员页面 -->
  <div style="min-height: 100vh; position: relative;">
    <!-- 固定在顶部的导航栏 -->
    <div
      style="position: fixed; top: 0; left: 0; width: 100%; background-color: rgb(254, 67, 101); padding: 10px 20px; display: flex; justify-content: space-around; align-items: center; box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2); z-index: 1000;"
    >
      <!-- 跳转到管理用户页面 -->
      <router-link
        to="/adminindex/manageusers"
        class="admin-btn"
      >
        Manage Users
      </router-link>

      <!-- 跳转到审核音乐页面 -->
      <router-link
        to="/adminindex/reviewmusic"
        class="admin-btn"
      >
        Review Music
      </router-link>
    </div>

    <!-- 页面内容 -->
    <div style="padding-top: 80px; display: flex; flex-direction: column; align-items: center;">
      <!-- 仅在访问 AdminIndex 时显示欢迎信息 -->
      <div v-if="$route.name === 'AdminIndex'">
        <h2 class="welcome-text">Welcome, Admin</h2>
      </div>

      <!-- 渲染子路由页面 -->
      <router-view />
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
/* 按钮样式 */
.admin-btn {
  padding: 10px 20px;
  background-color: rgb(255, 255, 255);
  color: rgb(254, 67, 101);
  border-radius: 20px;
  text-decoration: none; /* 移除下划线 */
  font-size: 16px;
  font-weight: bold;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.admin-btn:hover {
  background-color: rgb(249, 205, 173);
  color: black;
}

/* Welcome, Admin 字体样式 */
.welcome-text {
  font-family: "melete", sans-serif; /* 使用自定义字体 */
  font-size: 50px;
  color: rgb(254, 67, 101);
  margin-top: 300px; /* 顶部距固定导航栏150px */
}
</style>
