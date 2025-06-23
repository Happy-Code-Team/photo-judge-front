import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// 你可以在这里添加请求/响应拦截器
// instance.interceptors.request.use(config => { ... });
// instance.interceptors.response.use(response => { ... });

export default instance;