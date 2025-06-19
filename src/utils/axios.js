import axios from 'axios';

const instance = axios.create({
  // baseURL: 'http://localhost:8089/photo', // 根据你的后端地址修改
  baseURL: '/photo',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// 你可以在这里添加请求/响应拦截器
// instance.interceptors.request.use(config => { ... });
// instance.interceptors.response.use(response => { ... });

export default instance;

