import JsonP from 'jsonp';
import axios from 'axios';
import {Modal} from "antd";

export default class Axios {
    static jsonp(options){
        return new Promise((resolve, reject)=>{//resolve:成功，reject：失败
            JsonP(options.url,{
                param: 'callback'
            },function (err, response) {
                //TODO
                if (response.status === 'success') {
                    // debugger;
                    resolve(response);
                }else {
                    reject(response);
                }
            })
        })//return new Promise 后就能使用 .then
    }

    static ajax(options) {
        let loading;
        if (options.data && options.data.isShowLoading === true){//如果要加载页面
            loading = document.getElementById('ajaxLoading');
            loading.style.display = 'block';
        }
        const baseApi = "https://www.easy-mock.com/mock/5dd2936aa881483f4735b823/hotel/";

        return new Promise((resolve,reject)=>{//(成功，失败)
            axios({
                url: options.url,
                method: 'get',
                baseURL: baseApi,
                timeout: 5000,
                params: (options.data && options.data.params)
            }).then((response) => {

                if (loading){//关闭正在加载
                    loading.style.display = 'none';
                }

                if (response.status == '200') {
                    const {data} = response;

                    if (data.code == '0') {//判断自定义的状态码
                        resolve(data.data);//直接将返回数据放入，不考虑其他
                    }else{
                        Modal.info({
                            title:"提示",
                            content: data.msg
                        })
                    }
                }else{
                    reject(response.data);
                }
            });
        });
    }
}
