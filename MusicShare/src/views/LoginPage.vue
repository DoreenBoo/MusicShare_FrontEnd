<template>
  <!-- 登录/注册表单 -->
  <div class="login-wrapper">
    <div class="header">Login</div>
    <div class="form-wrapper">
      <!-- 选择登录方式 -->
      <div class="login-option">
        <button
          class="login-method-btn"
          :class="{ active: loginMethod === 'password' }"
          :style="{ backgroundColor: loginMethod === 'password' ? 'rgb(252,157,154)' : '' }"
          @click="loginMethod = 'password'"
        >
          Password
        </button>
        <button
          class="login-method-btn"
          :class="{ active: loginMethod === 'phone' }"
          :style="{ backgroundColor: loginMethod === 'phone' ? 'rgb(252,157,154)' : '' }"
          @click="loginMethod = 'phone'"
        >
          Phone
        </button>
      </div>

      <!-- 账号密码登录 -->
      <div v-if="loginMethod === 'password'">
        <input
          type="text"
          name="phone"
          v-model="phone"
          placeholder="phone"
          class="input-item"
        />
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
        <input
          type="text"
          name="phone"
          v-model="phone"
          placeholder="phone"
          class="input-item"
        />
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
import { ref } from 'vue';

const loginMethod = ref('password'); // 默认登录方式：'password' 或 'phone'
const phone = ref('');
const password = ref('');
const verificationCode = ref('');
const generatedCode = ref(''); // 存储生成的验证码
const countdown = ref(0); // 倒计时
const loginError = ref(false); // 登录错误消息
const isCodeSending = ref(false); // 是否正在发送验证码

// 模拟发送验证码
const sendVerificationCode = () => {
  if (!phone.value) {
    alert('Please enter a valid phone number');
    return;
  }
  isCodeSending.value = true;
  generatedCode.value = Math.floor(100000 + Math.random() * 900000).toString(); // 随机6位验证码
  console.log('Generated Code:', generatedCode.value); // 控制台输出验证码
  setTimeout(() => {
    alert('Verification code sent to your phone!');
    isCodeSending.value = false;
    startCountdown();
  }, 1000); // 模拟网络请求延迟
};

// 启动倒计时
const startCountdown = () => {
  countdown.value = 60;
  const interval = setInterval(() => {
    countdown.value--;
    if (countdown.value <= 0) {
      clearInterval(interval);
    }
  }, 1000);
};

// 处理登录
const handleLogin = () => {
  // 如果选择了密码登录
  if (loginMethod.value === 'password') {
    if (!phone.value || !password.value) {
      loginError.value = true;
      return;
    }
    // 模拟登录操作
    console.log('Logging in with phone and password...', {
      phone: phone.value,
      password: password.value,
    });
    loginError.value = false;
  }
  // 如果选择了手机号验证码登录
  else if (loginMethod.value === 'phone') {
    if (!phone.value || !verificationCode.value || verificationCode.value !== generatedCode.value) {
      loginError.value = true;
      return;
    }
    // 模拟登录操作
    console.log('Logging in with phone and verification code...', {
      phone: phone.value,
      verificationCode: verificationCode.value,
    });
    loginError.value = false;
  }
};
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
