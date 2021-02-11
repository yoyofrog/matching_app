export default {
    validatePhone(phone) {
        const reg = /^1[3|5|7|8|]\d{9}$/
        return reg.test(phone)
    },
    renderRichText(text){
        const finalList = []
        const rule = /(\/\{.+?\})/g
        const emoArr = text.match(rule);
        if (emoArr === null) {
            finalList.push({text: text})
        } else {
            const txtArr = text.replace(rule, "$$").split("$$")
            while (txtArr.length) {
                finalList.push({text:txtArr.shift()})
                if (emoArr.length) {
                    finalList.push({image:emoArr.shift()})
                }
            }
        }
        return finalList
    }
}