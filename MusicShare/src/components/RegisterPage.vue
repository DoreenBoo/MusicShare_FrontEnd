<template>
  <!-- 注册表单 -->
  <div class="register-wrapper">
    <div class="header">Register</div>
    <div class="form-wrapper">
      <input type="text" name="username" v-model="username" placeholder="username" class="input-item" />
      <input type="password" name="password" v-model="password" placeholder="password" class="input-item" />
      <input type="password" name="confirmPassword" v-model="confirmPassword" placeholder="confirm password" class="input-item" />
      <div v-if="passwordMismatch" class="error-message">Passwords do not match</div>
      <button class="btn" @click="handleRegister">Register</button>
    </div>
    <div class="msg">
      Already have an account?
      <router-link to="/login">Login</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      confirmPassword: '',
      passwordMismatch: false, // 用于控制错误消息的显示
    };
  },
  methods: {
    handleRegister() {
      // 检查密码是否相同
      if (this.password !== this.confirmPassword) {
        this.passwordMismatch = true;
      } else {
        this.passwordMismatch = false;
        // 这里可以执行注册操作，例如发送请求到后台
        console.log('Registering...', {
          username: this.username,
          password: this.password,
        });
      }
    },
  },
};
</script>

<style>
.register-wrapper {
  background-color: rgb(249, 205, 173);
  width: 358px;
  height: 588px;
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
