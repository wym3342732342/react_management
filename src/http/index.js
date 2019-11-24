import Axios from 'axios';
import qs from 'qs';
import {message} from "antd";

const SUCCESS = 0;//成功状态码


const http = Axios.create();
http.defaults.timeout = 5 *1000;
http.defaults.baseURL = 'https://www.easy-mock.com/mock/5dd2936aa881483f4735b823/hotel';
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
        if (response.status === 200) {
            const {data} = response;
            if (data.code === SUCCESS) {//判断自定义的状态码
                //判断是否生登陆状态的请求
                // if (data.msg === "notLogin") {
                //     //没有登陆
                //     window.location.href = '/login';
                // }
                return Promise.resolve(data);
            }else{
                message.error(data.msg);
                return Promise.reject({code:data.code,msg:data.msg});
            }
        }
        message.error("系统错误");
        return Promise.reject(null);
    },
    (error) => {
        message.error("网络连接超时，请稍后重试！");
        return Promise.reject(error);
    }
);
export default http;