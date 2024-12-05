<template>
    <!-- 页面特定的内容 -->
    <a-breadcrumb style="margin: 16px 0">
      <a-breadcrumb-item>Home</a-breadcrumb-item>
      <a-breadcrumb-item>PersonalCenter</a-breadcrumb-item>
    </a-breadcrumb>

    <!-- 页面具体的内容 -->
    <div>
            <a class="ant-dropdown-link" @click.prevent>
              <a-avatar :size="300" shape="square" src="..\src\assets\images\注意看，这是小帅.jpg" />
              <DownOutlined />
            </a>
      <h2>用户名</h2>
      <h2>id</h2>
      <h2>个性签名</h2>
      

    </div>

</template>


<script setup>

</script>

<style>

</style>
