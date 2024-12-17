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
      justifyContent: 'flex-start',
      alignItems: 'center',
      width: '100%',
    }"
  >
    <!-- 头像部分 -->
    <a class="ant-dropdown-link" @click.prevent="selectImage">
      <a-avatar :size="200" :src="avatarSrc" />
    </a>
    <input type="file" ref="fileInput" @change="onFileChange" style="display: none" />

    <!-- 显示粉丝和关注 -->
    <h3 style="margin-top: 20px; display: flex; gap: 10px">
      <span @click="showFans" style="cursor: pointer; color: blue">粉丝：{{ fansCount }}</span>
      <span @click="showFollowing" style="cursor: pointer; color: blue"
        >关注: {{ followingCount }}</span
      >
    </h3>
    <!-- 引入粉丝与关注弹窗组件 -->
    <FollowersListModal
      :visible="fansModalVisible"
      :list="fans"
      title="粉丝列表"
      @close="closeFans"
    />
    <FollowersListModal
      :visible="followingModalVisible"
      :list="following"
      title="关注列表"
      @close="closeFollowing"
    />
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
      <div style="margin-bottom: 15px; display: flex; align-items: center">
        <h2 style="display: inline-block; margin-right: 10px">手机号：</h2>
        <span>{{ phoneNumber }}</span>
        <a-button type="link" @click="showPhoneDrawer" style="margin-left: 10px">换绑</a-button>
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

    <!-- 编辑个人信息按钮 -->
    <div style="margin-top: 30px">
      <a-button type="primary" @click="showDrawer">
        <template>
          <PlusOutlined />
        </template>
        编辑个人信息
      </a-button>
      <a-button type="primary" @click="showPasswordDrawer">
        <template>
          <PlusOutlined />
        </template>
        修改密码
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
                  <a-select-option value="1">男</a-select-option>
                  <a-select-option value="2">女</a-select-option>
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
      <!-- 更改密码 Drawer -->
      <a-drawer
        title="修改密码"
        :width="400"
        :open="passwordDrawerOpen"
        :footer-style="{ textAlign: 'right' }"
        @close="closePasswordDrawer"
      >
        <a-form :model="passwordForm" layout="vertical">
          <a-form-item label="手机号" name="phoneNumber">
            <a-input v-model:value="passwordForm.phoneNumber" placeholder="请输入手机号" />
          </a-form-item>

          <a-form-item label="验证码" name="verificationCode">
            <a-input v-model:value="passwordForm.verificationCode" placeholder="请输入验证码" />
          </a-form-item>

          <a-button type="primary" block style="margin-bottom: 16px" @click="sendCode2">
            Get Code
          </a-button>

          <a-form-item label="新密码" name="newPassword">
            <a-input-password v-model:value="passwordForm.newPassword" placeholder="请输入新密码" />
          </a-form-item>

          <a-form-item label="确认新密码" name="confirmPassword">
            <a-input-password
              v-model:value="passwordForm.confirmPassword"
              placeholder="请再次输入新密码"
            />
          </a-form-item>

          <a-button type="primary" block @click="submitPasswordChange">
            Confirm Modification
          </a-button>
        </a-form>
      </a-drawer>
    </div>

    <!-- 换绑手机号 Drawer -->
    <a-drawer
      title="换绑手机号"
      :width="400"
      :open="phoneDrawerOpen"
      :footer-style="{ textAlign: 'right' }"
      @close="closePhoneDrawer"
    >
      <a-form :model="phoneForm" layout="vertical">
        <a-form-item label="新手机号" name="newPhone">
          <a-input v-model:value="phoneForm.newPhone" placeholder="请输入新手机号" />
        </a-form-item>
        <a-form-item label="验证码" name="verificationCode">
          <a-input v-model:value="phoneForm.verificationCode" placeholder="请输入验证码" />
        </a-form-item>
        <a-button type="primary" block style="margin-bottom: 16px" @click="sendCode">
          Get Code
        </a-button>
        <a-button type="primary" block @click="submitPhoneChange"> Submit </a-button>
      </a-form>
    </a-drawer>
  </div>
</template>

<script setup>
import FollowersListModal from '../components/FollowersListModal.vue'
import { fans, following } from '../mockData'
import { reactive, ref } from 'vue'
import axios from 'axios'

// 页面显示的数据
const nickname = ref('小帅')
const phoneNumber = ref('13800000000')
const gender = ref('女')
const age = ref(18)
const signature = ref('保持微笑，走到哪里都能散发光芒。')

// 头像
const avatarSrc =ref(localStorage.getItem('avatarUrl')); // 从本地存储读取头像 URL
const fileInput = ref(null);

const selectImage = () => {
  fileInput.value.click() // 触发文件选择对话框
}

const onFileChange = (event) => {
  const file = event.target.files[0]
  const token = getAccessToken()
  if (file) {

    // 预览本地文件（FileReader 生成 blob URL）
    const reader = new FileReader();
    reader.onload = (e) => {
      avatarSrc.value = e.target.result; // 临时展示本地预览的图片
    };

    reader.readAsDataURL(file);
    //文件上传
    const formData = new FormData()
    formData.append('file', file) // 将文件附加到FormData对象



    // 发送头像上传请求
    axios
      .post(
        'http://localhost:8083/share-app-api/user/upload/avatar',
         formData ,
        {
          headers: {
            Authorization: `${token}`,
            'Content-Type': 'multipart/form-data', // 设置为文件上传格式
          },
        },
      )
      .then((response) => {
        if (response.data.code === 0) {
          // 成功上传，更新头像
          avatarSrc.value = response.data.data ;// 假设后端返回的是头像 URL
           localStorage.setItem('avatarUrl', avatarSrc.value);
          console.log('头像上传成功:', avatarSrc.value);
        } else {
          console.error('头像上传失败:', response.data.msg)
        }
      })
      .catch((error) => {
        console.error('请求错误:', error)
      })
  }
}
// 控制粉丝和关注弹窗
const fansModalVisible = ref(false)
const followingModalVisible = ref(false)

const showFans = () => {
  fetchFansCount()
  fansModalVisible.value = true
}
const closeFans = () => {
  fetchFollowingCount()
  fansModalVisible.value = false
}

// 动态粉丝和关注数
const fansCount = ref(0)
const followingCount = ref(0)

const fetchFansCount = () => {
  const token = getAccessToken()
  axios
    .post(
      'http://localhost:8083/share-app-api/user/CountFan',
      {},
      {
        headers: {
          Authorization: `${token}`,
        },
      },
    )
    .then((response) => {
      console.log('粉丝数量:', response.data)
      if (response.data.code === 0) {
        fansCount.value = response.data.data // 假设后端返回的是粉丝数
        console.log('粉丝数量获取成功:', fansCount.value)
      } else {
        console.error('粉丝数量获取失败:', response.data.message)
      }
    })
    .catch((error) => {
      console.error('请求错误:', error)
    })
}

const fetchFollowingCount = () => {
  const token = getAccessToken()
  axios
    .post(
      'http://localhost:8083/share-app-api/user/CountFollowed',
      {},
      {
        headers: {
          Authorization: `${token}`,
        },
      },
    )
    .then((response) => {
      console.log('关注数量:', response.data)
      if (response.data.code === 0) {
        followingCount.value = response.data.data // 假设后端返回的是关注数
        console.log('关注数量获取成功:', followingCount.value)
      } else {
        console.error('关注数量获取失败:', response.data.message)
      }
    })
    .catch((error) => {
      console.error('请求错误:', error)
    })
}
const showFollowing = () => {
  followingModalVisible.value = true
}
const closeFollowing = () => {
  followingModalVisible.value = false
}

// 表单数据
const form = reactive({
  nickname: '',
  age: '',
  gender: '',
  signature: '',
})
const passwordForm = reactive({
  phoneNumber: '',
  verificationCode: '',
  newPassword: '',
  confirmPassword: '',
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
  // 调用后端 API 修改信息
  console.log('传给后端的性别值:', form.gender)

  const token = getAccessToken() // 获取令牌
  axios
    .post(
      'http://localhost:8083/share-app-api/user/update',
      {
        nickname: form.nickname,
        age: form.age,
        gender: form.gender,
        signature: form.signature,
      },
      {
        headers: {
          Authorization: `${token}`, // 确保带上正确的授权信息
        },
      },
    )
    .then((response) => {
      if (response.data.code === 0) {
        console.log('个人信息修改成功')
        nickname.value = form.nickname
        gender.value = form.gender
        age.value = form.age
        signature.value = form.signature
        onClose()
      } else {
        console.error('个人信息修改失败:', response.data.message)
      }
    })
    .catch((error) => {
      console.error('请求错误:', error)
    })
}

// 关闭 Drawer

const getAccessToken = () => {
  return localStorage.getItem('token')
}
// 密码更改 Drawer 显示控制
const passwordDrawerOpen = ref(false)
const showPasswordDrawer = () => {
  passwordDrawerOpen.value = true
}

const closePasswordDrawer = () => {
  passwordDrawerOpen.value = false
}

const submitPasswordChange = () => {
  if (passwordForm.newPassword !== passwordForm.confirmPassword) {
    console.log('两次输入的密码不一致')
    return
  }

  const token = getAccessToken()
  console.log('Token:', token)
  axios
    .post(
      `http://localhost:8083/share-app-api/user/changePassword?phone=${passwordForm.phoneNumber}&code=${passwordForm.verificationCode}&password=${passwordForm.newPassword}`,
      null, // 根据后端接口修改URL

      {
        headers: {
          Authorization: `${token}`, // 确保带上正确的授权信息
        },
      },
    )
    .then((response) => {
      if (response.data.code === 0) {
        console.log('密码修改成功')
        // 提交成功后的后续处理，比如清空表单、提示用户成功
        closePasswordDrawer()
      } else {
        console.error('密码修改失败:', response.data.message)
      }
    })
    .catch((error) => {
      console.error('请求错误:', error)
    })

  // 在此处处理密码修改逻辑，例如发起 API 请求

  // 清空表单数据
  passwordForm.phoneNumber = ''
  passwordForm.verificationCode = ''
  passwordForm.newPassword = ''
  passwordForm.confirmPassword = ''

  // 关闭 Drawer
  closePasswordDrawer()
}

// 手机号换绑 Drawer 控制
const phoneDrawerOpen = ref(false)
const phoneForm = reactive({
  newPhone: '',
  verificationCode: '',
})
const showPhoneDrawer = () => {
  phoneDrawerOpen.value = true
}
const closePhoneDrawer = () => {
  phoneDrawerOpen.value = false
}

// 换绑手机号逻辑
const sendCode = () => {
  axios
    .post(
      'http://localhost:8083/share-app-api/communication/sendSms',
      new URLSearchParams({
        phone: phoneForm.newPhone,
        // 参数名改为 'phone' 符合后端要求
      }).toString(),
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      },
    )

    .then((response) => {
      console.log('验证码发送结果:', response.data)
      if (response.data.code === 0) {
        console.log('验证码发送成功')
      } else {
        console.error('验证码发送失败:', response.data.message)
      }
    })
    .catch((error) => {
      console.error('请求错误:', error)
    })
}
const sendCode2 = () => {
  axios
    .post(
      'http://localhost:8083/share-app-api/communication/sendSms',
      new URLSearchParams({
        phone: passwordForm.phoneNumber, // 参数名改为 'phone' 符合后端要求
      }).toString(),
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      },
    )

    .then((response) => {
      console.log('验证码发送结果:', response.data)
      if (response.data.code === 0) {
        console.log('验证码发送成功')
      } else {
        console.error('验证码发送失败:', response.data.message)
      }
    })
    .catch((error) => {
      console.error('请求错误:', error)
    })
}
const submitPhoneChange = () => {
  console.log('submitPhoneChange 方法被调用')
  const token = getAccessToken() // 获取令牌
  console.log('Authorization:', `Bearer ${token}`)
  axios
    .post(
      'http://localhost:8083/share-app-api/communication/changePhone',
      new URLSearchParams({
        phone: phoneForm.newPhone,
        code: phoneForm.verificationCode,
      }).toString(),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Bearer ${token}`, // 确保带上正确的授权信息
        },
      },
    )
    .then((response) => {
      console.log('换绑手机号结果:', response.data)
      if (response.data.code === 0) {
        phoneNumber.value = phoneForm.newPhone
        localStorage.setItem('token', response.data.accessToken)
        console.log('手机号换绑成功')
        closePhoneDrawer()
      } else {
        console.error('手机号换绑失败:', response.data.message)
      }
    })
    .catch((error) => {
      console.error('请求错误:', error)
    })
}
</script>

<style scoped>
button {
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
  margin: 10px;
}

button:hover {
  opacity: 0.9;
}
</style>
