import JMessage from "jmessage-react-plugin";

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
        return new Promise((resolve, reject)=>{
            JMessage.register({
                username,
                password
                }, resolve, reject)
        })

    },
    login(username, password) {
        return new Promise((resolve, reject)=>{
            JMessage.login({
                username,
                password
                }, resolve, reject)
        })

    }

}