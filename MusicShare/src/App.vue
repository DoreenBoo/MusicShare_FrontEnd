<template>
  <!-- 图标位于页面右下角 -->
  <img alt="Vue logo" style="width: 20px; position: fixed; bottom: 20px; right: 20px;" src="./assets/images/icon.png">
  <!-- Vue Router 显示匹配到的组件 -->
      <router-view></router-view> 
 
<!-- 修改主题变量  -->
   <a-config-provider
    :theme="{
      token: {
        colorPrimary: 'rgb(252,157,154)',
      },
    }"
  >
  </a-config-provider>
</template>

<script setup>

</script>

<style>
body {
  background-image: url("./assets/images/icon.png"); /* 替换为图片路径 */
  background-size: 400px;
  background-repeat: no-repeat; 
  background-color: #57659E; 
   margin: 0; /* 去除默认边距 */
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
    display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

</style>
