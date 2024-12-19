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
      <span @click="handleShowFans" style="cursor: pointer; color: blue">粉丝：{{ fansCount }}</span>
      <span @click="handleShowFollowing" style="cursor: pointer; color: blue">关注: {{ followingCount }}</span>
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
        <a-form :model="form" layout="vertical">
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
import { reactive, ref, onMounted } from 'vue'
import axios from 'axios'
import { PlusOutlined } from '@ant-design/icons-vue'

// 页面显示的数据
const nickname = ref('')
const phoneNumber = ref('')
const gender = ref('')
const age = ref(0)
const signature = ref('')
const avatarSrc = ref(localStorage.getItem('avatarUrl') || ' ') //头像

const getAccessToken = () => {
  return localStorage.getItem('token')
}

// 获取用户信息
const getUserInfo = () => {
  const token = getAccessToken()
  axios
    .post(
      'http://localhost:8083/share-app-api/user/info',
      {},
      {
        headers: {
          Authorization: `${token}`,
        },
      },
    )
    .then((response) => {
      if (response.data.code === 0) {
        const userInfo = response.data.data
        avatarSrc.value = userInfo.avatar || ''
        nickname.value = userInfo.nickname || ''
        phoneNumber.value = userInfo.phone || ''
        gender.value = userInfo.gender || '保密'
        age.value = userInfo.age || 0
        signature.value = userInfo.motto || ''
        localStorage.setItem('avatarUrl', avatarSrc.value)
      } else {
        console.error('获取用户信息失败:', response.data.msg)
      }
    })
    .catch((error) => {
      console.error('请求错误:', error)
    })
}

onMounted(() => {
  getUserInfo()
  fetchFansCount()
  fetchFollowingCount()
})

// 上传头像相关逻辑
const fileInput = ref(null)
const selectImage = () => {
  fileInput.value.click()
}
const onFileChange = (event) => {
  const file = event.target.files[0]
  const token = getAccessToken()
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      avatarSrc.value = e.target.result // 本地预览
    }
    reader.readAsDataURL(file)

    const formData = new FormData()
    formData.append('file', file)

    axios
      .post('http://localhost:8083/share-app-api/user/upload/avatar', formData, {
        headers: {
          Authorization: `${token}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        if (response.data.code === 0) {
          avatarSrc.value = response.data.data
          localStorage.setItem('avatarUrl', avatarSrc.value)
          console.log('头像上传成功:', avatarSrc.value)
        } else {
          console.error('头像上传失败:', response.data.msg)
        }
      })
      .catch((error) => {
        console.error('请求错误:', error)
      })
  }
}

// 粉丝和关注相关逻辑
const fans = ref([])
const following = ref([])

// 将后端返回的数据转换为前端需要的格式
const transformUserData = (data) => {
  return data.map(user => ({
    id: user.id,
    avatar: user.avatar,
    name: user.nickname,
    followed: !!user.followed_id,
    gender: user.gender,
    motto: user.motto
  }))
}

// 获取粉丝列表
const fetchFans = (page = 0, size = 10) => {
  const token = getAccessToken()
  return axios
    .post(
      'http://localhost:8083/share-app-api/user/Fan',
      { page, size },
      {
        headers: { Authorization: `${token}` },
      }
    )
    .then((response) => {
      console.log('粉丝列表响应:', response.data)
      if (response.data.code === 0) {
        fans.value = transformUserData(response.data.data)
      } else {
        console.error('获取粉丝列表失败:', response.data.msg)
      }
    })
    .catch((error) => {
      console.error('获取粉丝列表请求错误:', error)
    })
}

// 获取关注列表
const fetchFollowing = (page = 0, size = 10) => {
  const token = getAccessToken()
  return axios
    .post(
      'http://localhost:8083/share-app-api/user/Followed',
      { page, size },
      {
        headers: { Authorization: `${token}` },
      }
    )
    .then((response) => {
      console.log('关注列表响应:', response.data)
      if (response.data.code === 0) {
        following.value = transformUserData(response.data.data)
      } else {
        console.error('获取关注列表失败:', response.data.msg)
      }
    })
    .catch((error) => {
      console.error('获取关注列表请求错误:', error)
    })
}

// 控制粉丝和关注弹窗
const fansModalVisible = ref(false)
const followingModalVisible = ref(false)

const handleShowFans = async () => {
  await fetchFans()
  fansModalVisible.value = true
}

const handleShowFollowing = async () => {
  await fetchFollowing()
  followingModalVisible.value = true
}

const closeFans = () => {
  fansModalVisible.value = false
}

const closeFollowing = () => {
  followingModalVisible.value = false
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
      if (response.data.code === 0) {
        fansCount.value = response.data.data
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
      if (response.data.code === 0) {
        followingCount.value = response.data.data
      } else {
        console.error('关注数量获取失败:', response.data.message)
      }
    })
    .catch((error) => {
      console.error('请求错误:', error)
    })
}

// 编辑信息相关
const form = reactive({
  nickname: '',
  age: '',
  gender: '',
  signature: '',
})

// Drawer 显示控制
const open = ref(false)
const showDrawer = () => {
  // 打开编辑个人信息抽屉时，可以将当前信息填入form中
  form.nickname = nickname.value
  form.gender = gender.value === '男' ? '1' : (gender.value === '女' ? '2' : '')
  form.age = age.value
  form.signature = signature.value
  open.value = true
}
const onClose = () => {
  open.value = false
}

// 提交表单方法
const onSubmit = () => {
  const token = getAccessToken()
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
          Authorization: `${token}`,
        },
      },
    )
    .then((response) => {
      if (response.data.code === 0) {
        console.log('个人信息修改成功')
        nickname.value = form.nickname
        gender.value = form.gender === '1' ? '男' : (form.gender === '2' ? '女' : '保密')
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

// 密码更改相关
const passwordDrawerOpen = ref(false)
const passwordForm = reactive({
  phoneNumber: '',
  verificationCode: '',
  newPassword: '',
  confirmPassword: '',
})
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
  axios
    .post(
      `http://localhost:8083/share-app-api/user/changePassword?phone=${passwordForm.phoneNumber}&code=${passwordForm.verificationCode}&password=${passwordForm.newPassword}`,
      null,
      {
        headers: {
          Authorization: `${token}`,
        },
      },
    )
    .then((response) => {
      if (response.data.code === 0) {
        console.log('密码修改成功')
        closePasswordDrawer()
      } else {
        console.error('密码修改失败:', response.data.message)
      }
    })
    .catch((error) => {
      console.error('请求错误:', error)
    })

  passwordForm.phoneNumber = ''
  passwordForm.verificationCode = ''
  passwordForm.newPassword = ''
  passwordForm.confirmPassword = ''
}

// 换绑手机号相关
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

const sendCode = () => {
  axios
    .post(
      'http://localhost:8083/share-app-api/communication/sendSms',
      new URLSearchParams({
        phone: phoneForm.newPhone,
      }).toString(),
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      },
    )
    .then((response) => {
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
        phone: passwordForm.phoneNumber,
      }).toString(),
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      },
    )
    .then((response) => {
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
  const token = getAccessToken()
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
          Authorization: `${token}`,
        },
      },
    )
    .then((response) => {
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
