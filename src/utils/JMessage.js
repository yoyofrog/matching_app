import JMessage from "jmessage-react-plugin";
import Toast from "./Toast"

export default {
    init() {
        JMessage.init({
            'appkey': 'c0c08d3d8babc318fe25bb0c',
            'isOpenMessageRoaming': true,
            'isProduction': false,
            'channel': ''
        })
    },
    register(username, password) {
        return new Promise((resolve, reject) => {
            JMessage.register({
                username,
                password
            }, resolve, reject)
        })

    },
    login(username, password) {
        return new Promise((resolve, reject) => {
            JMessage.login({
                username,
                password
            }, resolve, reject)
        })

    },
//     极光文本发送
//     @params {String} username 接收信息对象
//     @params {String} text 信息内容
//     @params {Object} extras 附带的一些参数


    // 发送文本消息
    sendTextMessage(username, text, extras = {}) {
        //消息类型 单个即可
        const type = "single"
        return new Promise((resolve, reject) => {
            JMessage.sendTextMessage({
                type, username,
                text, extras
            }, resolve, reject)
        })
    },
    // 发送图片
    sendImageMessage(username,path,extras = {}){
        return new Promise((resovle, reject)=>{
            JMessage.sendImageMessage({
                type:"single", username,
                path, extras
            },
                resolve, reject)
        })

    },
    // 获取未读聊天信息
    getCoversations(){
        return new Promise((resolve, reject)=>{
            JMessage.getConversations(res=>{
                Toast.hideLoading()
                resolve(res)
            }, reject)

        })
    },
    //退出极光
    logout(){
        JMessage.logout()
    }
}