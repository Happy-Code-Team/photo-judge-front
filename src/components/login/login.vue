<template>
  <div class="login-bg fix">
    <div class="login-card r">
      <el-form class="login-form" @submit.prevent="handleLogin" :model="loginForm" size="large">
        <el-form-item label="">
          <el-input v-model="loginForm.userCode" placeholder="输入用户账号" @dblclick="CommonUtil.selectAll($event)">
            <template #prefix>
              <el-icon><UserFilled /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="">
          <el-input v-model="loginForm.userPassword" type="password" placeholder="输入密码">
            <template #prefix>
              <el-icon><Lock /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item class="button-group">
          <el-button type="primary" plain round native-type="submit">登录</el-button>
          <el-button type="primary" plain round @click="goToRegister">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import {reactive, ref} from 'vue';
import axios from '@/utils/axios';
import {useRouter} from 'vue-router';
import { UserFilled, Lock } from '@element-plus/icons-vue'
import { CommonUtil } from '@/utils/CommonUtil.js';

const router = useRouter();

const loginForm  = reactive({
  userCode: '',
  userPassword: ''
})


const handleLogin = async () => {
  if (!loginForm.userCode || !loginForm.userPassword) {
    alert('请输入用户名和密码');
    return;
  }
  try {
    const response = await axios.post('/user/login', loginForm);
    if (response.data.code === 200) {
      alert('登录成功');
      await router.push('/home');
    } else {
      alert('登录失败：' + (response.data.message || '未知错误'));
    }
  } catch (error) {
    alert('请求出错：' + (error.response?.data?.message || error.message));
  }
};

const goToRegister = () => {
 router.push('/register');
};
</script>

<style scoped>
.login-bg {
  height: 100vh;
  width: 100vw;
  background: url('@/assets/images/login.jpg') no-repeat center center;
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

.button-group {
  display: flex;
  gap: 16px; /* 按钮之间的间距 */
  align-items: center;
  margin-bottom: 0;
  width: 100%; /* 确保容器占据可用宽度 */
}

/* 针对 button-group 内部的按钮 */
.button-group el-button {
  flex-grow: 1; /* 让按钮平均占据可用空间 */
}

/* 选中时高亮颜色 */
:deep(input::selection),
:deep(textarea::selection) {
  background: #ffe066;
  color: #333;
}
</style>
