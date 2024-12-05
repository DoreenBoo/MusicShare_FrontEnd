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
      justifyContent: 'flex-start' /* 保证内容从上到下排列 */,
      alignItems: 'center',
      width: '100%',
    }"
  >
    <!-- 头像部分 -->
    <a class="ant-dropdown-link" @click.prevent>
      <a-avatar :size="200" src="..\src\assets\images\注意看，这是小帅.jpg" />
      <DownOutlined />
    </a>

    <!-- 显示粉丝和关注 -->
    <h3 style="margin-top: 20px">粉丝：100 关注：50</h3>

    <!-- 个人信息部分 -->
    <div
      style="
        background-color: rgb(200, 200, 169);
        padding: 20px;
        border-radius: 10px;
        width: 100%;
        margin-top: 20px;
      "
    >
      <!-- 显示昵称 -->
      <div style="margin-bottom: 15px">
        <h2 style="display: inline-block; margin-right: 10px">昵称：</h2>
        <span>{{ nickname }}</span>
      </div>

      <!-- 显示手机号 -->
      <div style="margin-bottom: 15px">
        <h2 style="display: inline-block; margin-right: 10px">手机号：</h2>
        <span>{{ phoneNumber }}</span>
      </div>

      <!-- 显示性别 -->
      <div style="margin-bottom: 15px">
        <h2 style="display: inline-block; margin-right: 10px">性别：</h2>
        <span>{{ gender }}</span>
      </div>

      <!-- 显示年龄 -->
      <div style="margin-bottom: 15px">
        <h2 style="display: inline-block; margin-right: 10px">年龄：</h2>
        <span>{{ age }}</span>
      </div>

      <!-- 显示个性签名 -->
      <div style="margin-bottom: 25px">
        <h2 style="display: inline-block; margin-right: 10px">个性签名：</h2>
        <span>{{ signature }}</span>
      </div>
    </div>

    <!-- 三个按钮 -->
    <div style="margin-top: 30px">
      <!-- 1.编辑个人信息抽屉 -->
      <a-button type="primary" @click="showDrawer">
        <template><PlusOutlined /></template>
        编辑个人信息
      </a-button>
      <a-drawer
        title="编辑您的个人信息"
        :width="720"
        :open="open"
        :body-style="{ paddingBottom: '80px' }"
        :footer-style="{ textAlign: 'right' }"
        @close="onClose"
      >
        <a-form :model="form" :rules="rules" layout="vertical">
          <a-row :gutter="16">
            <a-col :span="12">
              <a-form-item label="Nickname" name="nickname">
                <a-input v-model:value="form.nickname" placeholder="Please enter your nickname" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="16">
            <a-col :span="12">
              <a-form-item label="Gender" name="gender">
                <a-select v-model:value="form.gender" placeholder="Please choose the gender">
                  <a-select-option value="男">男</a-select-option>
                  <a-select-option value="女">女</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="Age" name="age">
                <a-input v-model:value="form.age" placeholder="Please enter your age" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="16">
            <a-col :span="24">
              <a-form-item label="Description" name="signature">
                <a-textarea
                  v-model:value="form.signature"
                  :rows="4"
                  placeholder="Please enter your signature"
                />
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
        <template #extra>
          <a-space>
            <a-button @click="onClose">Cancel</a-button>
            <a-button type="primary" @click="onSubmit">Submit</a-button>
          </a-space>
        </template>
      </a-drawer>

      <button
        @click="changePassword"
        style="
          margin-right: 10px;
          padding: 10px;
          background-color: #2196f3;
          color: white;
          border: none;
          border-radius: 5px;
        "
      >
        更改密码
      </button>
      <button
        @click="logout"
        style="
          padding: 10px;
          background-color: #f44336;
          color: white;
          border: none;
          border-radius: 5px;
        "
      >
        退出登录
      </button>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'

// 页面显示的数据
const nickname = ref('小帅')
const phoneNumber = ref('13800000000')
const gender = ref('女')
const age = ref(18)
const signature = ref('保持微笑，走到哪里都能散发光芒。')

// 表单数据
const form = reactive({
  nickname: '',
  age: '',
  gender: '',
  signature: '',
})

// Drawer 显示控制
const open = ref(false)
const showDrawer = () => {
  open.value = true
}
const onClose = () => {
  open.value = false
}

// 提交表单方法
const onSubmit = () => {
  // 更新页面数据
  nickname.value = form.nickname
  gender.value = form.gender
  age.value = form.age
  signature.value = form.signature

  // 关闭 Drawer
  onClose()
}
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
