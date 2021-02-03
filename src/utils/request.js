import axios from 'axios'
import {BASE_URI} from "./pathMap";
import Toast from '../utils/Toast'
import rootStore from '../mobx'
const instance = axios.create({
    baseURL: BASE_URI
})
instance.interceptors.request.use(function (config) {
    Toast.showLoading('loading')
    return config
}), function(error){
    return Promise.reject(error)
}

instance.interceptors.response.use(function (response) {
    Toast.hideLoading()
    return response.data
})

export default {
    get: instance.get,
    post: instance.post,
    //post 自动带上token

    
    privateGet:(url,data={},options={})=>{
        const token = rootStore.token;
        const headers = options.headers||{}
        return instance.get(url, {
            ...options,
            params: data,
            headers:{
                //主要Bearer后面有个空格
                 "Authorization": `Bearer ${token}`,
                ...headers
            }
        })
    },
    privatePost:(url,data={},options={})=>{
        const token = rootStore.token;
        const headers = options.headers||{}
        return instance.post(url, data, {
            ...options,
            headers:{
                //主要Bearer后面有个空格
                 "Authorization": `Bearer ${token}`,
                ...headers
            }
        })
    }
}