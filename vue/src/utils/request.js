import axios from 'axios'

const request = axios.create({
    baseURL: 'http://localhost:9090',
    timeout: 5000
})

//拦截器
//添加一个请求拦截器
request.interceptors.request.use(config => {
    //config.headers.languagetype = 'CN'; // 举例，加上一个公共头部
    //config.data = Qs.stringify(config.data); // 处理数据，可不写
    return config;
  },
  err => {
    return Promise.reject(err);
  });

//添加一个响应拦截器
request.interceptors.response.use(res => {
  //在这里对返回的数据进行处理
  console.log(res.data, '网络正常');
  return res.data;
}, err => {
  console.log('网络开了小差！请重试...');
  return Promise.reject(err);
})

export default request
