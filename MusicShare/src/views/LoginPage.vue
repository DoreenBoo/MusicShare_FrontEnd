<template>
  <!-- 登录/注册表单 -->
  <div class="login-wrapper">
    <div class="header">Login/Register</div>
    <div class="form-wrapper">
      <!-- 选择登录方式 -->
      <div class="login-option">
        <button
          class="login-method-btn"
          :class="{ active: loginMethod === 'password' }"
          :style="{
            backgroundColor: loginMethod === 'password' ? 'rgb(254, 67, 101)' : 'rgb(252,157,154)',
          }"
          @click="loginMethod = 'password'"
        >
          Password
        </button>
        <button
          class="login-method-btn"
          :class="{ active: loginMethod === 'phone' }"
          :style="{
            backgroundColor: loginMethod === 'phone' ? 'rgb(254, 67, 101)' : 'rgb(252,157,154)',
          }"
          @click="loginMethod = 'phone'"
        >
          Phone
        </button>
      </div>

      <!-- 账号密码登录 -->
      <div v-if="loginMethod === 'password'">
        <input type="text" name="phone" v-model="phone" placeholder="phone" class="input-item" />
        <input
          type="password"
          name="password"
          v-model="password"
          placeholder="password"
          class="input-item"
        />
      </div>

      <!-- 手机号验证码登录 -->
      <div v-if="loginMethod === 'phone'">
        <input type="text" name="phone" v-model="phone" placeholder="phone" class="input-item" />
        <div class="verification-code-wrapper">
          <input
            type="text"
            v-model="verificationCode"
            placeholder="verification code"
            class="input-item"
          />
          <button
            class="code-btn"
            :disabled="isCodeSending || countdown > 0"
            @click="sendVerificationCode"
          >
            {{ countdown > 0 ? `${countdown}s` : 'Get Code' }}
          </button>
        </div>
      </div>

      <div v-if="loginError" class="error-message">Invalid credentials</div>

      <button class="btn" @click="handleLogin">Login</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const loginMethod = ref('password') // 默认登录方式：'password' 或 'phone'
const phone = ref('')
const password = ref('')
const verificationCode = ref('')
const generatedCode = ref('') // 存储生成的验证码
const countdown = ref(0) // 倒计时
const loginError = ref(false) // 登录错误消息
const errorMessage = ref('') // 错误消息
const isCodeSending = ref(false) // 是否正在发送验证码
const router = useRouter() // 路由实例

// 模拟发送验证码
const sendVerificationCode = () => {
  if (!phone.value) {
    alert('Please enter a valid phone number')
    return
  }
  isCodeSending.value = true
  axios
    .post('http://localhost:8083/music-share/common/sendSms', null, {
      params: {
        phone: phone.value,
      },
    })
    .then((response) => {
      console.log('Verification code sent successfully', response.data) // 输出响应数据
      alert('Verification code sent to your phone!')
      isCodeSending.value = false
      startCountdown()
    })
    .catch((error) => {
      console.error('Error sending verification code:', error)
      isCodeSending.value = false
    })
}

// 启动倒计时
const startCountdown = () => {
  countdown.value = 60
  const interval = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) {
      clearInterval(interval)
    }
  }, 1000)
}

// 处理登录
const handleLogin = () => {
  // 如果选择了密码登录
  if (loginMethod.value === 'password') {
    if (!phone.value || !password.value) {
      loginError.value = true
      errorMessage.value = 'Phone number and password are required'
      return
    }
    // 模拟登录操作
    axios
      .post(
        'http://localhost:8083/music-share/auth/login_by_password',  // 假设你已经创建了此API
        {
          phone: phone.value,
          password: password.value
        },
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      )
      .then((response) => {
        console.log('Response Data:', response.data) // 打印后端返回的数据

        const { code, msg, data } = response.data // 解构 data 字段
        const { remark } = data // 从 data 中提取 remark
        console.log('Remark:', remark) // 打印 remark

        if (code === 0) {
          console.log('Login successful:', msg)
          localStorage.setItem('token', data.accessToken) // 将 token 存储到 localStorage
          localStorage.setItem('remark', remark) // 将 remark 存储到 localStorage
          console.log('User remark:', remark)

          // 根据 remark 字段判断跳转路径
          if (remark === 'admin') {
            router.push('/adminindex/manageusers') // 如果 remark 为 admin，跳转到 /adminindex
          } else {
            router.push('/index/home') // 普通用户跳转到 /index/home
          }
        } else {
          loginError.value = true
          errorMessage.value = msg || 'Login failed'
        }
      })
      .catch((error) => {
        console.error('Login failed:', error.response?.data || error)
        loginError.value = true
        errorMessage.value = 'Invalid phone number or password'
      })
  }
  // 如果选择了手机号验证码登录
  else if (loginMethod.value === 'phone') {
    if (!phone.value || !verificationCode.value) {
      loginError.value = true
      errorMessage.value = 'Phone number or verification code is required'
      return
    }
    // 登录操作
    axios
      .post(
        'http://localhost:8083/music-share/auth/login_by_code',
        {
          phone: phone.value,
          code: verificationCode.value,
        },
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      )
      .then((response) => {
        console.log('Response Data:', response.data) // 打印后端返回的数据

        const { code, msg, data } = response.data // 解构 data 字段
        const { remark } = data // 从 data 中提取 remark
        console.log('Remark:', remark) // 打印 remark

        if (response.data.code === 0) {
          console.log('Login successful:', msg)
          localStorage.setItem('token', response.data.accessToken)
          localStorage.setItem('remark', remark) // 将remark存储到本地存储
          localStorage.setItem('phoneNumber', phone.value); // 将手机号存储到 localStorage
          // 打印 remark 来确认它的值
          console.log('User remark:', remark)

          // 根据remark字段判断跳转路径
          if (remark === 'admin') {
            router.push('/adminindex/manageusers') // 如果remark为admin，跳转到/admin
          } else {
            router.push('/index/home') // 普通用户跳转到/index/home
          }
        } else {
          loginError.value = true
          errorMessage.value = msg || 'Login failed'
        }
      })
      .catch((error) => {
        console.error('Login failed:', error.response?.data || error)
        loginError.value = true
        errorMessage.value = 'Invalid verification code or other login error'
      })
  }
}
</script>

<style>
.login-wrapper {
  background-color: rgb(249, 205, 173);
  width: 358px;
  height: 650px;
  border-radius: 40px;
  padding: 0 50px;
}

.header {
  font-size: 38px;
  font-weight: bold;
  text-align: center;
  line-height: 200px;
}

.input-item {
  display: block;
  width: 100%;
  margin-bottom: 20px;
  border: 0;
  padding: 10px;
  border-bottom: 1px solid rgb(128, 125, 125);
  font-size: 15px;
  outline: none;
  border-radius: 40px;
}

.verification-code-wrapper {
  display: flex;
  align-items: center;
}

.code-btn {
  background-color: rgb(254, 67, 101);
  color: #fff;
  border: none;
  border-radius: 20px;
  margin-left: 10px;
  padding: 5px 15px;
  cursor: pointer;
  font-size: 12px;
}

.code-btn:disabled {
  background-color: gray;
  cursor: not-allowed;
}

.login-option {
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.login-method-btn {
  padding: 10px 30px;
  background-color: rgb(254, 67, 101);
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-size: 14px;
  width: 48%;
  transition: background-color 0.3s;
}

.login-method-btn.active {
  background-color: #ff3e5b;
}

.btn {
  text-align: center;
  padding: 10px;
  width: 100%;
  margin-top: 40px;
  background-color: rgb(254, 67, 101);
  border-color: rgb(254, 67, 101);
  color: #fff;
  border-radius: 40px;
}

.msg {
  text-align: center;
  line-height: 88px;
}

a {
  text-decoration-line: none;
  color: #abc1ee;
}

.error-message {
  color: red;
  text-align: center;
  margin-bottom: 10px;
}
</style>
