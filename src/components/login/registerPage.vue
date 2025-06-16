<template>
  <div class="register-container">
    <el-card class="register-card" shadow="always">
      <template #header>
        <div class="header">
          <span>注册</span>
        </div>
      </template>
      <el-form :model="registerForm" :rules="rules" ref="registerFormRef" label-width="100px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="registerForm.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="registerForm.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input type="password" v-model="registerForm.confirmPassword" placeholder="请再次输入密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('registerFormRef')">注册</el-button>
          <el-button @click="resetForm('registerFormRef')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import axios from '@/utils/axios';

const registerFormRef = ref(null);

const registerForm = reactive({
  username: '',
  password: '',
  confirmPassword: ''
});

const rules = reactive({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '用户名长度在 3 到 20 个字符', trigger: 'blur' },
    {
      validator: async (rule, value, callback) => {
        try {
          // 调用接口判断用户名是否存在
          const response = await checkUsernameExists(value); // 替换为你的接口调用
          if (response.data.code !== 200) {
            callback(new Error(response.data.message));
          } else {
            callback();
          }
        } catch (error) {
          callback(new Error('验证失败，请稍后重试'));
        }
      },
      trigger: 'blur'
    }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 30, message: '密码长度在 6 到 30 个字符', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: '请再次输入密码', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value !== registerForm.password) {
          callback(new Error('两次输入的密码不一致'));
        } else {
          callback();
        }
      },
      trigger: 'blur'
    }
  ]
});

const submitForm = (formName) => {
  registerFormRef.value.validate((valid) => {
    if (valid) {
      alert('注册成功!');
    } else {
      console.log('error submit!!');
      return false;
    }
  });
};

const resetForm = (formName) => {
  registerFormRef.value.resetFields();
};

async function  checkUsernameExists(username) {
  try {
    const response = await axios.get(`/user/checkUsername?username=${username}`);
    // 假设接口返回的数据格式为 { exists: true/false }
    return response;
  } catch (error) {
    console.error("Error checking username:", error);
    return { exists: false }; // 发生错误时，可以返回一个默认值，例如 { exists: false }
  }
}
</script>

<style scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f2f6fc;
}

.register-card {
  width: 400px;
}

.header {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  font-weight: bold;
  color: #333;
}
</style>
