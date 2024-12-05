<template>
  <!-- 页面特定的内容 -->
  <a-breadcrumb style="margin: 16px 0">
    <a-breadcrumb-item>Home</a-breadcrumb-item>
    <a-breadcrumb-item>PersonalCenter</a-breadcrumb-item>
  </a-breadcrumb>

  <!-- 页面具体的内容 -->
  <div
    :style="{
      background: 'rgb(249,205,173)',
      padding: '30px',
      minHeight: '600px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start', /* 保证内容从上到下排列 */
      alignItems: 'center',
      width: '100%',
    }"
  >
    <!-- 头像部分 -->
    <a class="ant-dropdown-link" @click.prevent>
      <a-avatar :size="200"  src="..\src\assets\images\注意看，这是小帅.jpg" />
      <DownOutlined />
    </a>

    <!-- 显示粉丝和关注 -->
    <h3 style="margin-top: 20px;">粉丝：100 关注：50</h3>

    <!-- 个人信息部分 -->
    <div style="background-color: rgb(200, 200, 169); padding: 20px; border-radius: 10px; width: 100%; margin-top: 20px;">
      <!-- 显示昵称 -->
      <div style="margin-bottom: 15px;">
        <h2 style="display: inline-block; margin-right: 10px;">昵称：</h2>
        <span>{{ nickname }}</span>
      </div>

      <!-- 显示手机号 -->
      <div style="margin-bottom: 15px;">
        <h2 style="display: inline-block; margin-right: 10px;">手机号：</h2>
        <span>{{ phoneNumber }}</span>
      </div>

      <!-- 显示性别 -->
      <div style="margin-bottom: 15px;">
        <h2 style="display: inline-block; margin-right: 10px;">性别：</h2>
        <span>{{ gender }}</span>
      </div>

      <!-- 显示年龄 -->
      <div style="margin-bottom: 15px;">
        <h2 style="display: inline-block; margin-right: 10px;">年龄：</h2>
        <span>{{ age }}</span>
      </div>

      <!-- 显示个性签名 -->
      <div style="margin-bottom: 25px;">
        <h2 style="display: inline-block; margin-right: 10px;">个性签名：</h2>
        <span>{{ signature }}</span>
      </div>
    </div>

    <!-- 三个按钮 -->
    <div style="margin-top: 30px;">
      <button @click="editProfile" style="margin-right: 10px; padding: 10px; background-color: #4CAF50; color: white; border: none; border-radius: 5px;">编辑个人信息</button>
      <button @click="changePassword" style="margin-right: 10px; padding: 10px; background-color: #2196F3; color: white; border: none; border-radius: 5px;">更改密码</button>
      <button @click="logout" style="padding: 10px; background-color: #f44336; color: white; border: none; border-radius: 5px;">退出登录</button>
    </div>
  </div>
</template>

<script setup>
// 引入必要的组件和数据
import { ref } from 'vue';

// 定义个人信息
const nickname = ref('小帅');
const phoneNumber = ref('13800000000');
const gender = ref('男');
const age = ref(25);
const signature = ref('保持微笑，走到哪里都能散发光芒。');

// 定义按钮的点击事件
const editProfile = () => {
  console.log('编辑个人信息');
  // 这里可以跳转到编辑页面或弹出编辑框
};

const changePassword = () => {
  console.log('更改密码');
  // 这里可以跳转到更改密码页面
};

const logout = () => {
  console.log('退出登录');
  // 这里可以进行退出登录的操作
};
</script>

<style scoped>
button {
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

button:hover {
  opacity: 0.9;
}
</style>
