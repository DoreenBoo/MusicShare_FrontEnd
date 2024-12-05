<template>
  <!-- 登录/注册表单 -->
  <div class="login-wrapper">
    <div class="header">Login</div>
    <div class="form-wrapper">
      <!-- 选择登录方式 -->
      <div class="login-option">
        <button
          class="login-method-btn"
          :class="{'active': loginMethod === 'username'}"
          @click="loginMethod = 'username'"
        >
          Password
        </button>
        <button
          class="login-method-btn"
          :class="{'active': loginMethod === 'phone'}"
          @click="loginMethod = 'phone'"
        >
          Phone
        </button>
      </div>

      <!-- 账号密码登录 -->
      <div v-if="loginMethod === 'username'">
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

    <div class="msg">
      Don't have an account?
      <router-link to="/register">Sign up</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginMethod: 'username', // 默认登录方式：'username' 或 'phone'
      username: '',
      password: '',
      phone: '',
      verificationCode: '',
      generatedCode: '', // 存储生成的验证码
      countdown: 0, // 倒计时
      loginError: false, // 登录错误消息
      isCodeSending: false, // 是否正在发送验证码
    };
  },
  methods: {
    // 模拟发送验证码
    sendVerificationCode() {
      if (!this.phone) {
        alert('Please enter a valid phone number');
        return;
      }
      this.isCodeSending = true;
      this.generatedCode = Math.floor(100000 + Math.random() * 900000).toString(); // 随机6位验证码
      console.log('Generated Code:', this.generatedCode); // 控制台输出验证码
      setTimeout(() => {
        alert('Verification code sent to your phone!');
        this.isCodeSending = false;
        this.startCountdown();
      }, 1000); // 模拟网络请求延迟
    },
    // 启动倒计时
    startCountdown() {
      this.countdown = 60;
      const interval = setInterval(() => {
        this.countdown--;
        if (this.countdown <= 0) {
          clearInterval(interval);
        }
      }, 1000);
    },
    handleLogin() {
      // 如果选择了用户名密码登录
      if (this.loginMethod === 'username') {
        if (!this.username || !this.password) {
          this.loginError = true;
          return;
        }
        // 模拟登录操作
        console.log('Logging in with username and password...', {
          username: this.username,
          password: this.password,
        });
        this.loginError = false;
      }
      // 如果选择了手机号验证码登录
      else if (this.loginMethod === 'phone') {
        if (!this.phone || !this.verificationCode || this.verificationCode !== this.generatedCode) {
          this.loginError = true;
          return;
        }
        // 模拟登录操作
        console.log('Logging in with phone and verification code...', {
          phone: this.phone,
          verificationCode: this.verificationCode,
        });
        this.loginError = false;
      }
    },
  },
};
</script>

<style>
/* 登录框样式 */
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
