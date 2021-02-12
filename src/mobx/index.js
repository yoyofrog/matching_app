import { observable, action,makeObservable } from "mobx";

class RootStore {
    constructor() {
        makeObservable(this)
    }
  // observable 表示数据可监控 表示是全局数据
    @observable
    mobile = "";
    @observable
    //token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ODY3LCJuYW1lIjoiMTM2MTY1MjAyNjEiLCJpYXQiOjE2MTIwNTMzNzIsImV4cCI6MTYzNzk3MzM3Mn0.9XmJ8AFHdWl-hes35ZECLn1zbURZGzx1Cr-VTSEq2dg"
    token = ""
    @observable
    userId = "";
  // action行为 表示 changeName是个可以修改全局共享数据的方法
  @action
  setUserInfo(mobile, token, userId) {
    this.mobile = mobile;
    this.token = token;
    this.userId = userId
  }
  @action
  clearUserInfo(mobile, token, userId) {
    this.mobile = '';
    this.token = '';
    this.userId = ''
  }
}

export default new RootStore();