import axios from "axios";
import { Message } from "element-ui";
import { getToken, setToken, removeToken } from "./utils/token";

const baseUrl = process.env.VUE_APP_ENV == 'dev' ? '/api' : process.env.VUE_APP_BASE_API + '/api';
console.log("process.env.VUE_APP_ENV >>>", process.env.VUE_APP_ENV, process.env.VUE_APP_BASE_API)
const service = axios.create({
    baseURL: baseUrl, //baseUrl会自动加载到请求地址上
    timeout: 3000, //设置超时
});

service.interceptors.request.use((config) => {
    console.log("获取到请求的数据 config .>>>", config);
    //这里在请求头里添加token
    const token = getToken("token");
    config.headers.Authorization = `Bearer ${token}`;
    return config;
}, (error) => {
    console.log("error >>>>", error);
    return Promise.reject(error);
});

service.interceptors.response.use((response) => {
    console.log("获取到响应的数据", response);
    const { status, message } = response;
    const { authorization } = response.headers;

    authorization && setToken("token", authorization);

    if (status !== 200) {
        Message({ message: message || 'error', type: "warning" });
        return;
    }

    return response;
}, (error) => {
    const { status, data } = error.response;
    if (status === 401) {
        //token过期
        Message({ message: data?.errInfo || 'error', type: "warning" });
        removeToken("token");
    }

    return Promise.reject(error);
});

export default service;