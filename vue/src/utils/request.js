//引入 axios
import axios from "axios";

const request = axios.create({
  baseURL: 'http://localhost:9090',
  timeout: 50000
})

// 数据请求拦截
request.interceptors.request.use((config) => {

  return config;
}, (error) => {
  return Promise.reject(error);
});
// 响应拦截器
request.interceptors.response.use(
    response => {
        return response;
        // 未设置状态码则默认成功状态
        // const code = response.data.code || 200;
        // // 获取错误信息
        // const errorCode = {
        //     '401': '认证失败，无法访问系统资源',
        //     '403': '当前操作没有权限',
        //     '404': '访问资源不存在',
        //     'default': '系统未知错误,请反馈给管理员'
        // };
        // const msg = errorCode[code] || response.data.msg || errorCode['default'];
        // if (code === 500) {
        //     return Promise.reject(new Error(msg))
        // } else if (code !== 200) {
        //     return Promise.reject('error')
        // }else{
        //     return response.data
        // }
    },
    error => {
        console.log('err:' + error);
        let { message } = error;
        if (message == "Network Error") {
            message = "后端接口连接异常";
        }
        else if (message.includes("timeout")) {
            message = "系统接口请求超时";
        }
        else if (message.includes("Request failed with status code")) {
            message = "系统接口" + message.substr(message.length - 3) + "异常";
        }
        return Promise.reject(message);
    }
)

export default request;
