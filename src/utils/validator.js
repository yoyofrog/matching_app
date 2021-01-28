export default {
    validatePhone(phone) {
        const reg = /^1[3|5|7|8|]\d{9}$/
        return reg.test(phone)
    }
}