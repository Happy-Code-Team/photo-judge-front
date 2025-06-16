<script setup>
import {ref} from 'vue';
import axios from '@/utils/axios';
import { UserFilled, Lock } from '@element-plus/icons-vue'


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
  <div class="login-bg fix">
    <div class="login-card r">
      <el-form class="login-form" @submit.prevent="handleLogin" :model="{ username, password }" size="large">
        <el-form-item label="">
          <el-input v-model="username" placeholder="输入用户名">
            <template #prefix>
              <el-icon><UserFilled /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="">
          <el-input v-model="password" type="password" placeholder="输入密码">
            <template #prefix>
              <el-icon><Lock /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" plain round native-type="submit" style="width:100%;">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style scoped>
.login-bg {
  height: 100vh;
  width: 100vw;
  background: url('@/assets/images/login.jpeg') no-repeat center center;
  background-size: cover;
  overflow: hidden;
}

.login-card {
  max-width: 400px;
  padding: 32px 32px 24px 32px;
  /* border-radius: 18px; */
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.18);
  background: rgba(255, 255, 255, 0.2); /* 透明度调低 */
  border: none;
  backdrop-filter: blur(8px); /* 毛玻璃效果，可选 */
  height: 100vh;
}
.login-form{
  margin-top: 100px;
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
</style>
