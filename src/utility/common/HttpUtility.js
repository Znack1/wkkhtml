/*
 * @Descripttion: 
 * @version: 1.0
 * @Author: zkc
 * @Date: 2021-05-27 09:28:35
 * @LastEditors: zkc
 * @LastEditTime: 2022-03-29 11:58:28
 * @input: no param
 * @out: no param
 */
import axios from 'axios';
import qs from 'qs';
axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
 export class Http {
    constructor() {
        this.axiosInstance = axios.create({ timeout: 30000 });
    }

    init(){
        // request拦截器
        this.axiosInstance.interceptors.request.use(config => {

            // 是否需要设置 token
            const isToken = (config.headers || {}).isToken === false
            let loginIndex = -1;// 登录不加token  否则请求不通过
            let logoutIndex = -1;
            if (config.url) {
                loginIndex = config.url.indexOf('login');
                logoutIndex = config.url.indexOf('logout');
            }
            // if (loginIndex== -1 && logoutIndex == -1 && getToken() &&  typeof(getToken() !="undefined") &&  !isToken) {
            //   //  config.headers['Authorization'] = 'Bearer ' + getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
            //   config.headers['Authorization'] = 'Bearer e7441d55-84ff-4e3f-9eb1-6f5fe137bc87'
            // }
            // if(loginIndex== -1 && logoutIndex == -1 && typeof(getToken() =="undefined")){
            //   Message({
            //     message: '请您登录之后再进行操作',
            //     type: 'error'
            //   })
            //   Promise.reject('请您登录之后再进行操作') 
            // }
            // get请求映射params参数
            if (config.method === 'get' && config.params) {
                let url = config.url + '?';
                for (const propName of Object.keys(config.params)) {
                    const value = config.params[propName];
                    var part = encodeURIComponent(propName) + "=";
                    if (typeof (value) !== "undefined" && value) {
                        if (typeof value === 'object') {
                            for (const key of Object.keys(value)) {
                                let params = propName + '[' + key + ']';
                                var subPart = encodeURIComponent(params) + "=";
                                url += subPart + encodeURIComponent(value[key]) + "&";
                            }
                        } else {
                            url += part + encodeURIComponent(value) + "&";
                        }
                    }
                }
                url = url.slice(0, -1);
                config.params = {};
                config.url = url;
            }
            return config
        }, error => {
            console.log(error)
            Promise.reject(error)
        })

        // 响应拦截器
        this.axiosInstance.interceptors.response.use(res => {

            // 未设置状态码则默认成功状态
            // const code = res.data.code || 200;
            // // 获取错误信息
            // const msg = errorCode[code] || res.data.msg || errorCode['default']
            // if (code === 401) {
            //   MessageBox.confirm('登录状态已过期，您可以继续留在该页面，或者重新登录', '系统提示', {
            //       confirmButtonText: '重新登录',
            //       cancelButtonText: '取消',
            //       type: 'warning'
            //     }
            //   ).then(() => {
            //     store.dispatch('LogOut').then(() => {
            //       location.href = '/index';
            //     })
            //   })
            // } else if (code === 500) {
            //   Message({
            //     message: msg,
            //     type: 'error'
            //   })
            //   return Promise.reject(new Error(msg))
            // } else if (code !== 200) {
            //   Notification.error({
            //     title: msg
            //   })
            //   return Promise.reject('error')
            // } else {
            //   return res.data
            // }
            return res.data
        },
            error => {
                console.log('err' + error)
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
                Message({
                    message: message,
                    type: 'error',
                    duration: 5 * 1000
                })
                return Promise.reject(error)
            }
        )

        return this;
    }

    async get (url, params) {
        const res = await this.axiosInstance.get(url, { params: params });
        return res;
    }

    /**
     * axios post请求
     * @param url=服务器地址
     * @param params=请求参数
     * @param encode = (如需要传送application/x-www-form-urlencoded格式参数,使用qs.stringify转换) 如果参数是数组的形式，传参数的时候先JSON.stringify（）转化数组，再传过来
     * @param config :object axios得配置
     * @returns {Promise<*>}
     */
    async post (url, data, config = {}) {
        data = data;
       

        // config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
        const res = await this.axiosInstance.post(url, data, config);
        return res;
    }

    async put (url, data) {
        const res = await this.axiosInstance.put(url, data);
        return res;
    }

    async delete (url, data) {
        const res = await this.axiosInstance.delete(url, data);
        return res;
    }
}
