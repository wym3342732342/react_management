import Axios from 'axios';
import qs from 'qs';
import {message} from "antd";

const SUCCESS = 200;//成功状态码
const NO_ACCESS = 403;//无权访问
const NOT_LOGGED_IN = 302;//无权访问


const http = Axios.create();

http.defaults.withCredentials=true// 允许携带cookie
http.defaults.timeout = 5 *1000;
http.defaults.baseURL = 'http://localhost:8081';
http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';


//请求拦截
http.interceptors.request.use((config) => {

    if (config.method === 'post') {
        config.data = qs.stringify(config.data);
    }
    return config;
});
//响应拦截
http.interceptors.response.use(
    (response) => {
        // console.log(response.data);
        if (response.status === SUCCESS) {
            //判断是否生登陆状态的请求
            // if (data.msg === "notLogin") {
            //     //没有登陆
            //
            // }
            return Promise.resolve(response.data);
        }

    },
    (error) => {
        const {response} = error;
        if (!response) {
            return Promise.reject(null);
        }
        if ((response.status === NOT_LOGGED_IN || response.status === NO_ACCESS)&&response.data==="toLogin") {
            window.location.href = '/login';
        }
        message.error(response.data.message !=="No message available"?response.data.message:"失败的请求！");//发生异常
        return Promise.reject(error);
    }
);
export default http;