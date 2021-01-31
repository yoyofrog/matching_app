import React, {Component} from 'react'
import {View, Text, TouchableOpacity, Image} from 'react-native'
import {Input} from "react-native-elements";
import DatePicker from 'react-native-datepicker';
import Picker from 'react-native-picker'
import ImageCropPicker from 'react-native-image-crop-picker'
import {Overlay} from "teaset";
import {inject, observer} from "mobx-react";

import SvgUri from "react-native-svg-uri";
import {pxToDp} from "../../../utils/stylesKits";
import {male, female} from "../../../res/font/iconSvg";
import Geo from "../../../utils/geo"
import THButton from '../../../subComponents/THButton'
import Toast from "../../../utils/Toast";
import request from "../../../utils/request";
import {  ACCOUNT_CHECKHEADIMAGE, ACCOUNT_REGINFO} from "../../../utils/pathMap"
//城市选择数据
import cityJson from "../../../res/citys.json"
import JMessage from "../../../utils/JMessage";

@inject("rootStore")
@observer
export default class UserInfo extends Component{
    constructor() {
        super();
        this.state ={
            nickname:'',
            gender:'male',
            birthday:'',
            city:'广州',
            header:'',
            lng:'113.42264',
            lat:'23.12211',
            address:'广东省江门市新会区'
        }
    }
    chooseGender=(gender)=>{
        this.setState({gender})
        console.log(this.state)

    }
    async componentDidMount() {
        // const res = await Geo.getCityByLocation()
        // console.log(res)
        // // const address = res.regeocode.formatted_address
        // const city = res.regeocode.addressComponent.city
        // this.setState({address})

    }
    showCity=()=>{
        Picker.init({
            //选择城市数据
          pickerData: cityJson,
            //[省，市]
          selectedValue: ["河北", "石家庄"],
          wheelFlex: [1, 1, 0], // 显示省和市
          pickerConfirmBtnText: "确定",
          pickerCancelBtnText: "取消",
          pickerTitleText: "选择城市",
          onPickerConfirm: data => {
            // data =  [广东，广州，天河]
            this.setState(
              {
                city: data[1]
              }
            );
          }
        });
        Picker.show();
    }
    chooseHead=async ()=>{
        const {nickname, birthday, city} = this.state
        if (!nickname|!birthday|!city) {
            return Toast.message(`请输入有效信息${nickname+birthday+ city}`,2000,"center")
        }
        const image = await ImageCropPicker.openPicker({
          width: 300,
          height: 400,
          cropping: true
        })
        let overlayViewRef = null
        let overlayView = (
          <Overlay.View
            style={{flex:1, backgroundColor:"#000"}}
            modal={true}
            overlayOpacity={0}
            ref={v => overlayViewRef = v}
            >
            <View style={{
                position: "relative",
                marginTop:pxToDp(30),
                alignSelf: "center",
                justifyContent:"center",
                width:pxToDp(334),
                height:pxToDp(334),
                alignItems:"center" }}>
                <Image style={{position: "absolute",width:"100%", height:"100%", zIndex:100}} source={require('../../../res/scan.gif')}></Image>
                <Image source={{uri:image.path}} style={{width:"60%", height: "60%"}}></Image>
            </View>
          </Overlay.View>
        );
        Overlay.show(overlayView)
        const result = await this.uploadHeadImg(image)
        if (result.code !== "10000") {
            return
        }
        const params = this.state
        params.header = result.headImgPath
        const result1 = await request.privatePost(ACCOUNT_REGINFO, params)
        console.log(result1)
        if (result1.code !== "10000") {
            return
        }
        //注册极光
        const result2 = await this.jgRegister(this.props.rootStore.userId,this.props.rootStore.mobile)
        //关闭校验图片
        overlayViewRef.close()
        Toast.smile('恭喜注册成功', 3000)
        setTimeout(()=> {
            alert('跳转页码')
        },3000)

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
    //执行极光注册
    jgRegister = (username, password)=>{
        return JMessage.register(username, password)
    }
    render() {
        const {gender,nickname, birthday,address, city} = this.state
        const dateNow = new Date()
        const currentDate = `${dateNow.getFullYear()}-${dateNow.getMonth()+1}-${dateNow.getDate()}`
        return (
            <View style={{backgroundColor: "#fff", flex:1, padding: pxToDp(20)}}>
                <Text style={{fontSize:pxToDp(16), fontWeight: "bold", color:"#666"}}>填写资料</Text>
                <Text style={{fontSize:pxToDp(16), fontWeight: "bold", color:"#666"}}>提升我的魅力</Text>
                <View style={{marginTop: pxToDp(30)}}>
                    <View style={{ width: "60%", flexDirection: "row", alignSelf:"center", justifyContent:"space-around",}}>
                        <TouchableOpacity onPress={()=>this.chooseGender('male')} style={{width: pxToDp(60), height: pxToDp(60),
                            backgroundColor: gender==="male"?"red":"#eee", borderRadius: pxToDp(30),justifyContent:"center", alignItems:"center"}}>
                            <SvgUri style={{width: pxToDp(50), height: pxToDp(50)}} svgXmlData={male}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.chooseGender('female')} style={{width: pxToDp(60), height: pxToDp(60),
                            backgroundColor: gender==="female"?"red":"#eee", borderRadius: pxToDp(30),justifyContent:"center", alignItems:"center"}}>
                            <SvgUri style={{width: pxToDp(50), height: pxToDp(50)}} svgXmlData={female}/>
                        </TouchableOpacity>
                    </View>

                </View>
                <View>
                    <Input
                    style={{fontSize:pxToDp(16), fontWeight: "bold", color:"#afafaf"}}
                    value={nickname}
                    placeholder={"设置昵称"}
                    onChangeText={(nickname)=>this.setState({nickname})}>
                    </Input>
                </View>

                <View style={{width: "100%", height:"8%"}}>
                 <DatePicker
                     androidMode="spinner"
                     style={{width: "100%"}}
                     mode="date"
                    date={birthday}
                    placeholder="选择生日"
                    format="YYYY-MM-DD"
                    minDate="1900-01-01"
                    maxDate={currentDate}
                    confirmBtnText="确认"
                    cancelBtnText="取消"
                    customStyles={{
                      dateIcon: {
                          display:'none',
                      },
                      dateInput: {
                          marginLeft: pxToDp(9),
                          borderWidth: 0,
                          borderBottomWidth: 1,
                          alignItems: "flex-start"
                      },
                       placeholderText: {
                          fontSize: pxToDp(16),
                          fontWeight: "bold",
                          color:"#afafaf"
                       }
                    }}
                      onDateChange={(birthday) => {this.setState({birthday})}}
                    />
                </View>
                {/*选择城市*/}
                <View style={{marginTop: 0}}>
                    <TouchableOpacity onPress={this.showCity}>
                        <Input
                            inputStyle={{fontSize:pxToDp(16), fontWeight: "bold", color:"#afafaf"}}
                            value={`当前定位${this.state.address}`}
                            disabled={true}
                        />
                    </TouchableOpacity>
                </View>
                {/*选择头像*/}
                <View style={{width: "75%", height: pxToDp(40), alignSelf:"center", marginBottom:0}}>
                    <THButton onPress={this.chooseHead} style={{ borderRadius: pxToDp(20), overflow: 'hidden'}}>选择头像</THButton>
                </View>
            </View>

        );
    }
}