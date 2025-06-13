<script setup>
import {ref} from 'vue';
import axios from '@/utils/axios';

const username = ref('');
const password = ref('');

const handleLogin = async () => {
  if (username.value && password.value) {
    try {
      const response = await axios.post('/login', {
        userName: username.value,
        password: password.value
      });
      if (response.data.code === 200) {
        alert('登录成功');
      } else {
        alert('登录失败：' + (response.data.message || '未知错误'));
      }
    } catch (error) {
      alert('请求出错：' + (error.response?.data?.message || error.message));
    }
  } else {
    alert('请输入用户名和密码');
  }
};
</script>

<template>
  <div class="login-bg">
    <el-card class="login-card">
      <h1 style="text-align:center;">登录</h1>
      <el-form @submit.prevent="handleLogin" :model="{ username, password }" label-width="80px">
        <el-form-item label="用户名">
          <el-input v-model="username" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="password" type="password" placeholder="请输入密码" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit" style="width:100%;">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<style scoped>
.login-bg {
  min-height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  /*background: linear-gradient(135deg, #74ebd5 0%, #ACB6E5 100%); 渐变的形式*/
  background: url("/photos/login.jpeg") no-repeat center center;
  background-size: cover;
}

body {
  min-height: 100vh;
  margin: 0;
  font-family: 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Arial', sans-serif;
}

.login-card {
  max-width: 400px;
  padding: 32px 32px 24px 32px;
  border-radius: 18px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.18);
  background: rgba(255, 255, 255, 0.3); /* 透明度调低 */
  border: none;
  backdrop-filter: blur(8px); /* 毛玻璃效果，可选 */
}

h1 {
  text-align: center;
  margin-bottom: 30px;
  font-weight: 600;
  color: #409eff;
  letter-spacing: 2px;
}

.el-form-item {
  margin-bottom: 28px;
}

.el-input {
  height: 44px;
  font-size: 16px;
}

.el-button {
  height: 44px;
  font-size: 18px;
  border-radius: 8px;
  letter-spacing: 2px;
}

.el-card {
  border: none;
}
</style>
