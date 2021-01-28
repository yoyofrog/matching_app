import axios from 'axios'
import {BASE_URI} from "./pathMap";
import Toast from '../utils/Toast'
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
    post: instance.post
}