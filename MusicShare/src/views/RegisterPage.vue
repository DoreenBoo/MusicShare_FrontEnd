<template>
  <!-- 注册表单 -->
  <div class="register-wrapper">
    <div class="header">Register</div>
    <div class="form-wrapper">
      <input 
        type="number" 
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
      <input 
        type="text" 
        name="username" 
        v-model="username" 
        placeholder="username" 
        class="input-item" 
      />
      <input 
        type="password" 
        name="password" 
        v-model="password" 
        placeholder="password" 
        class="input-item" 
      />
      <input 
        type="password" 
        name="confirmPassword" 
        v-model="confirmPassword" 
        placeholder="confirm password" 
        class="input-item" 
      />
      <div v-if="passwordMismatch" class="error-message">Passwords do not match</div>
      <div v-if="codeError" class="error-message">Invalid verification code</div>
      <button class="btn" @click="handleRegister">Register</button>
    </div>
    <div class="msg">
      Already have an account?
      <router-link to="/login">Login</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref} from 'vue';

const phone = ref('');
const verificationCode = ref('');
const generatedCode = ref(''); // 存储生成的验证码
const username = ref('');
const password = ref('');
const confirmPassword = ref('');
const passwordMismatch = ref(false); // 控制密码错误消息
const codeError = ref(false); // 控制验证码错误消息
const isCodeSending = ref(false); // 控制是否在发送验证码
const countdown = ref(0); // 倒计时

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

// 处理注册
const handleRegister = () => {
  // 检查密码是否一致
  if (password.value !== confirmPassword.value) {
    passwordMismatch.value = true;
    return;
  } else {
    passwordMismatch.value = false;
  }
  // 检查验证码是否正确
  if (verificationCode.value !== generatedCode.value) {
    codeError.value = true;
    return;
  } else {
    codeError.value = false;
  }
  // 这里可以执行注册操作，例如发送请求到后台
  console.log('Registering...', {
    phone: phone.value,
    username: username.value,
    password: password.value,
  });
};
</script>

<style>
.register-wrapper {
  background-color: rgb(249, 205, 173);
  width: 358px;
  height: 650px;
  border-radius: 40px;
  padding: 0 50px;
  margin: 0 auto;
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
  align-self: flex-start;
}

.code-btn:disabled {
  background-color: gray;
  cursor: not-allowed;
}

.input-item::placeholder {
  text-transform: uppercase;
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
