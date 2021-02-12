import { observable, action,makeObservable } from "mobx";

class UserStore {
    constructor() {
        makeObservable(this)
    }
  // observable 表示数据可监控 表示是全局数据
    @observable
    user ={}
//     id: 7
// vcode: "888888"
// mobile: "18665711978"
// email: null
// header: "/upload/161175058541418665711978.jpg"
// nick_name: "嘎"
// age: 23
// gender: "男"
// birthday: "2021-01-26T16:00:00.000Z"
// city: "成都"
// address: "四川省成都市崇州市羊马镇逸家住宿"
// xueli: "其他"
// amount: (...)
// status: 0
// lng: 103.77963
// lat: 30.63249
// Distance: 1269880.5
// login_time: "2021-02-04T16:30:29.000Z"
// marry: "已婚"
// guid: "186657119781591501526289"

  // action行为 表示 changeName是个可以修改全局共享数据的方法
    @action
    setUser = (user)=> {
        this.user = user
    }
    @action
    clearUser =()=>{
        this.user = {}
    }

}

export default new UserStore();