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
  <div class="login-container">
    <h1>登录</h1>
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="username">用户名</label>
        <input
          id="username"
          v-model="username"
          type="text"
          placeholder="请输入用户名"
        />
      </div>
      <div class="form-group">
        <label for="password">密码</label>
        <input
          id="password"
          v-model="password"
          type="password"
          placeholder="请输入密码"
        />
      </div>
      <button type="submit">登录</button>
    </form>
  </div>
</template>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
