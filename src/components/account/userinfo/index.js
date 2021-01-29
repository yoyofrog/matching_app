import React, {Component} from 'react'
import {View, Text, TouchableOpacity} from 'react-native'
import {Input} from "react-native-elements";
import DatePicker from 'react-native-datepicker';
import Picker from 'react-native-picker'

import SvgUri from "react-native-svg-uri";
import {pxToDp} from "../../../utils/stylesKits";
import {male, female} from "../../../res/font/iconSvg";
import Geo from "../../../utils/geo"
import THButton from '../../../subComponents/THButton'
import Toast from "../../../utils/Toast";
//城市选择数据
import cityJson from "../../../res/citys.json"

export default class UserInfo extends Component{
    constructor() {
        super();
        this.state ={
            nickname:'',
            gender:'male',
            birthday:'',
            city:'66',
            header:'',
            lng:'',
            lat:'',
            address:''
        }
    }
    chooseGender=(gender)=>{
        this.setState({gender})
        console.log(this.state)

    }
    async componentDidMount() {
        await Geo.getCityByLocation()
        console.log(result)
        const address = res.regeocode.formatted_address
        const city = res.regeocode.addressComponent.city
        this.setState({address})
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
    chooseHead=()=>{
        const {nickname, birthday, city} = this.state
        if (!nickname|!birthday|!city) {
            return Toast.message(`请输入有效信息${nickname+birthday+ city}`,2000,"center")
        }
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
                            value={"当前定位"}
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