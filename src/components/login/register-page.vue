<template>
  <div class="register-container register-bg">
    <el-card class="register-card" shadow="always">
      <template #header>
        <div class="header">
          <span>注册</span>
        </div>
      </template>
      <el-form :model="registerForm" :rules="rules" ref="registerFormRef" label-width="100px">
        <el-form-item label="用户编码" prop="userCode">
          <el-input v-model="registerForm.userCode" placeholder="请输入用户名, 数字或字符" @dblclick="selectAll"></el-input>
        </el-form-item>

        <el-form-item label="用户名" prop="userName">
          <el-input v-model="registerForm.userName" placeholder="请输入用户名" @dblclick="selectAll">
          </el-input>
          <el-button @click="generateRandomUsername">
            <font-awesome-icon icon="dice" />
          </el-button>
        </el-form-item>

        <el-form-item label="密码" prop="userPassword">
          <el-input type="password" v-model="registerForm.userPassword" placeholder="请输入密码" @dblclick="selectAll"></el-input>
        </el-form-item>

        <el-form-item label="确认密码" prop="confirmuserPassword">
          <el-input type="password" v-model="registerForm.confirmuserPassword" placeholder="请再次输入密码" @dblclick="selectAll"></el-input>
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
import {nextTick, onMounted, reactive, ref} from 'vue';
import axios from '@/utils/axios';
import ApiResponse from "@/components/response/ApiResponse.js";
import {useRouter} from 'vue-router';

const router = useRouter();

const registerFormRef = ref(null);

const registerForm = reactive({
  userCode: '',
  userName: '',
  userPassword: '',
  confirmuserPassword: ''
});

const rules = reactive({
  userCode: [
    { required: true, message: '请输入用户编码', trigger: 'blur' },
    { min: 3, max: 20, message: '用户编码长度在 3 到 20 个字符', trigger: 'blur' },
    {
      validator: async (rule, value, callback) => {
        const pattern = /^[a-zA-Z0-9]+$/;
        if (!pattern.test(value)) {
          callback(new Error('用户编码只能包含字母和数字'));
        } else {
          try {
            // 调接口判断用户 userCode 是否存在
            const response = await checkUserCodeExist(value);
            console.log(response);
            if (response.data.code !== 200) {
              callback(new Error(response.data.message));
            } else {
              callback();
            }
          } catch (error) {
            console.error("Error checking username:", error);
            callback(new Error('验证失败，请稍后重试'));
          }
        }
      },
      trigger: 'blur'
    }
  ],
   userName: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '用户名长度在 3 到 20 个字符', trigger: 'blur' },

  ],
  userPassword: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 30, message: '密码长度在 6 到 30 个字符', trigger: 'blur' }
  ],
  confirmuserPassword: [
    { required: true, message: '请再次输入密码', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value !== registerForm.userPassword) {
          callback(new Error('两次输入的密码不一致'));
        } else {
          callback();
        }
      },
      trigger: 'blur'
    }
  ]
});

const submitForm = async () => {
  registerFormRef.value.validate(async (valid) => {
    if (valid) {
      try {
        await axios.post('/user/register', registerForm);
        alert("注册成功");
        await router.push('/login');
      } catch (error) {
        alert("注册失败：" + (error.response?.data?.message || error.message));
      }
    } else {
      console.log("登录表单校验不通过");
    }
  });
};

const resetForm = () => {
  registerFormRef.value.resetFields();
};

/** 检查用户输入的 code 是否已经存在，code 用来标识用户的身份，不允许重复 */
async function checkUserCodeExist(userCode) {
  try {
    console.log(userCode);
    return await axios.get(`/user/checkUserCodeIsExist?userCode=${encodeURIComponent(userCode)}`);
  } catch (error) {
    console.error("Error checking username:", error);
    // 调用服务失败，将 userCode 清空，放置用户因失败跳过校验
    registerForm.userCode = '';
    return new ApiResponse(500, "调用校验用户名服务失败");
  }
}

/** 随机生成用户名 */
const generateRandomUsername = () => {
  let randomName = '';
  for (let i = 0; i < 3; i++) {
    // 汉字 Unicode 范围：\u4e00-\u9fa5
    const unicode = 0x4e00 + Math.floor(Math.random() * (0x9fa5 - 0x4e00 + 1));
    randomName += String.fromCharCode(unicode);
  }
  registerForm.userName = randomName;
};

/** 全选文本框内容 */
const selectAll = (event) => {
  event.target.select();
};

onMounted(() => {
  generateRandomUsername();
});
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
  background: rgba(255, 255, 255, 0.3); /* 半透明白色背景 */
  box-shadow: none; /* 去除阴影，如需保留可调整透明度 */
  backdrop-filter: blur(8px); /* 可选：增加毛玻璃效果 */
}

.header {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  font-weight: bold;
  color: #333;
}

.register-bg {
  height: 100vh;
  width: 100vw;
  background: url('@/assets/images/register.jpg') no-repeat center center;
  background-size: cover;
  overflow: hidden;
}

/* 选中时高亮颜色 */
:deep(input::selection),
:deep(textarea::selection) {
  background: #ffe066;
  color: #333;
}
</style>
