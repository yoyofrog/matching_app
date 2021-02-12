import React, {Component} from 'react'
import {View, Text, TextInput} from 'react-native'
import THNav from "../../subComponents/THNav"
import request from "../../utils/request";
import {ACCOUNT_CHECKHEADIMAGE, BASE_URI, MY_INFO, MY_SUBMITUSERINFO} from "../../utils/pathMap"
import {inject, observer} from "mobx-react";
import {ListItem,Avatar, Overlay} from "react-native-elements";
import Icon from "../../subComponents/iconfont";
import {pxToDp} from "../../utils/stylesKits";
import date from "../../utils/date"
import ImageCropPicker from "react-native-image-crop-picker";
import {Toast} from "teaset"
import DatePicker from "react-native-datepicker";
import Picker from "react-native-picker";
import cityJson from "../../res/citys.json";


@inject("userStore")
@observer
class Index extends Component {
    state = {
        showNickName:false,
        showGender:false
    }
    // id: 893
// vcode: "888888"
// mobile: (...)
// email: null
// header: "/upload/161201894008618811380000.jpg"
// nick_name: (...)
// age: 20
// gender: "男"
// birthday: "1996-05-25T16:00:00.000Z"
// city: "AnKang"
// address: (...)
// xueli: (...)
// amount: (...)
// status: (...)
// lng: (...)
// lat: (...)
// Distance: (...)
// login_time: (...)
// marry: (...)
// guid: (...)
    onPickImage= async ()=>{
        const image = await ImageCropPicker.openPicker({
          width: 300,
          height: 400,
          cropping: true
        })


        const result = await this.uploadHeadImg(image)
        const header = res.data.headImgShortPath
        const result2 = await this.onSubmitUser({header})

    }
    uploadHeadImg = async(image) => {
        const formData = new FormData()
        formData.append("headPhoto", {
            uri: image.path,
            type: image.mime,
            name: image.path.split("/").pop()
        })
        return request.privatePost(ACCOUNT_CHECKHEADIMAGE, formData, {
            headers:{
                "Content-Type": "multipart/form-data",
            }
        })

    }
    onSubmitUser = async (user)=>{
        const result= await request.privatePost(MY_SUBMITUSERINFO, user)
        Toast.message("修改成功")
        const userInfo = await request.privateGet(MY_INFO)
        this.props.userStore.setUser(userInfo.data)
        return Promise.resolve(result)
    }
    nickNameUpdate= async (e)=>{
        const nickname=e.nativeEvent.text
        if(!nickname) return
        await this.onSubmitUser({nickname})
        this.setState({showNickName:false})
    }
    birthdayUpdate = async (birthday)=>{
        console.log(birthday)
         await this.onSubmitUser({birthday})


    }
    genderUpdate= async (gender)=>{
        await this.onSubmitUser({gender})
         this.setState({showGender:false})
    }
    showCity=  ()=>{
        Picker.init({
            //选择城市数据
          pickerData: cityJson,
            //[省，市]
          selectedValue: ["河北", "石家庄"],
          wheelFlex: [1, 1, 0], // 显示省和市
          pickerConfirmBtnText: "确定",
          pickerCancelBtnText: "取消",
          pickerTitleText: "选择城市",
          onPickerConfirm: async data => {
            // data =  [广东，广州，天河]
              let city = data[1]
            await this.onSubmitUser({city})
          }
        });
        Picker.show();
    }
    showEducation=()=>{
        Picker.init({
            //选择城市数据
          pickerData: ['博士后','博士','硕士','本科','大专','高中','留学'],
            //[省，市]
          selectedValue: ["留学"],
          wheelFlex: [1, 0, 0], // 显示省和市
          pickerConfirmBtnText: "确定",
          pickerCancelBtnText: "取消",
          pickerTitleText: "选择学历",
          onPickerConfirm: async data => {
            // data =  [广东，广州，天河]
              let xueli = data[0]
            await this.onSubmitUser({xueli})
          }
        });
        Picker.show();
    }
    showMarry=()=>{
        Picker.init({
            //选择城市数据
          pickerData: ['单身','已婚'],
            //[省，市]
          selectedValue: ["留学"],
          wheelFlex: [1, 0, 0], // 显示省和市
          pickerConfirmBtnText: "确定",
          pickerCancelBtnText: "取消",
          pickerTitleText: "选择婚姻状态",
          onPickerConfirm: async data => {
            // data =  [广东，广州，天河]
              let marry = data[0]
            await this.onSubmitUser({marry})
          }
        });
        Picker.show();
    }
    render() {
        const {showNickName,showGender} = this.state
        console.log(this.props.userStore.user)
        const {user} = this.props.userStore
        return (
            <View>
                <Overlay onBackdropPress={()=>this.setState({showNickName: false})} isVisible={showNickName}>
                    <TextInput onSubmitEditing={this.nickNameUpdate} style={{width:pxToDp(200)}} placeholder="修改昵称"/>
                </Overlay>
                 <Overlay onBackdropPress={()=>this.setState({showGender: false})} isVisible={showGender}>
                     <View style={{width:pxToDp(100), height:pxToDp(80),justifyContent:"space-evenly",alignItems:"center"}}>
                         <Text onPress={()=>this.genderUpdate("男")} style={{fontSize:pxToDp(20), fontWeight:"bold", color:"#666"}}>男</Text>
                         <Text onPress={()=>this.genderUpdate("女")} style={{fontSize:pxToDp(20), fontWeight:"bold", color:"#666"}}>女</Text>
                     </View>

                </Overlay>
                <THNav title="编辑信息"/>
                <ListItem  containerStyle={{height:pxToDp(70)}} >
                    <ListItem.Content>
                        <ListItem.Title>头像</ListItem.Title>
                    </ListItem.Content>
                    <Avatar onPress={this.onPickImage} rounded source={{uri:BASE_URI+user.header}} />
                    <ListItem.Chevron/>
                </ListItem>
                <ListItem bottomDivider>
                    <ListItem.Content>
                        <ListItem.Title>昵称</ListItem.Title>
                    </ListItem.Content>
                    <Text onPress={()=>this.setState({showNickName: true})}>{user.nick_name}</Text>
                    <ListItem.Chevron/>
                </ListItem>
                <View style={{position:"relative"}}>
                    <ListItem bottomDivider>
                        <ListItem.Content>
                            <ListItem.Title>生日</ListItem.Title>
                        </ListItem.Content>
                        <Text>{date(user.birthday).format("YYYY-MM-DD")}</Text>
                        <ListItem.Chevron/>
                    </ListItem>
                    <DatePicker
                     androidMode="spinner"
                     style={{width: "100%", height:"100%", position:"absolute", left:0, top:0, opacity:0}}
                     mode="date"
                    date={date(user.birthday).format("YYYY-MM-DD")}
                    placeholder="选择生日"
                    format="YYYY-MM-DD"
                    minDate="1900-01-01"
                    maxDate={date(new Date()).format("YYYY-MM-DD")}
                    confirmBtnText="确认"
                    cancelBtnText="取消"
                     onDateChange={(birthday) => {this.birthdayUpdate(birthday)}}
                    />
                </View>

                <ListItem bottomDivider>
                    <ListItem.Content>
                        <ListItem.Title>选择性别</ListItem.Title>
                    </ListItem.Content>
                    <Text onPress={()=>this.setState({showGender: true})}>{user.gender}</Text>
                    <ListItem.Chevron/>
                 </ListItem>
                <ListItem bottomDivider>
                    <ListItem.Content>
                        <ListItem.Title>现居城市</ListItem.Title>
                    </ListItem.Content>
                    <Text onPress={this.showCity}>{user.city}</Text>
                    <ListItem.Chevron/>
                </ListItem>
                <ListItem bottomDivider>
                    <ListItem.Content>
                        <ListItem.Title>学历</ListItem.Title>
                    </ListItem.Content>
                    <Text onPress={this.showEducation}>{user.xueli}</Text>
                    <ListItem.Chevron/>
                </ListItem>
                <ListItem bottomDivider>
                    <ListItem.Content>
                        <ListItem.Title>月收入</ListItem.Title>
                    </ListItem.Content>
                    <Text>100w</Text>
                    <ListItem.Chevron/>
                </ListItem>
                <ListItem bottomDivider>
                    <ListItem.Content>
                        <ListItem.Title>行业</ListItem.Title>
                    </ListItem.Content>
                    <Text>老板</Text>
                    <ListItem.Chevron/>
                </ListItem>
                <ListItem bottomDivider>
                    <ListItem.Content>
                        <ListItem.Title>婚姻状态</ListItem.Title>
                    </ListItem.Content>
                    <Text onPress={this.showMarry}>{user.marry}</Text>
                    <ListItem.Chevron/>
                </ListItem>

            </View>
        )
    }
}

export default Index