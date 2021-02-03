import React, {Component} from 'react'
import {View, Text, TouchableOpacity} from 'react-native'
import {Slider} from "react-native-elements"
import Picker from "react-native-picker";

import Icon from "../../../../subComponents/iconfont"
import THButton from"../../../../subComponents/THButton"

import {pxToDp} from "../../../../utils/stylesKits";
import SvgUri from "react-native-svg-uri";
import {male, female} from "../../../../res/font/iconSvg";
import cityJson from "../../../../res/citys.json"


class Index extends Component {
    constructor(props) {
        super(props);
        this.state=JSON.parse(JSON.stringify(this.props.params))
        // gender: "男"
        // distance: 2
        // lastLogin: ""
        // city: ""
        // education: ""
    }
    selectGender=(gender)=>{
        this.setState({gender})
    }
    chooseLastLogin = ()=> {
        Picker.init({
          pickerData: ["15分钟", "1天","1小时","不限制"],
          selectedValue: [this.state.lastLogin],
          wheelFlex: [1,0,0],
          pickerConfirmBtnText: "确定",
          pickerCancelBtnText: "取消",
          pickerTitleText: "选择近期登录时间",
          onPickerConfirm: data => {
            this.setState(
              {
                lastLogin: data[0]
              }
            );
          }
        });
        Picker.show();
    }
    chooseCity= ()=> {
        Picker.init({
          pickerData: cityJson,
          selectedValue: ["北京","北京"],
          wheelFlex: [1,1,0],
          pickerConfirmBtnText: "确定",
          pickerCancelBtnText: "取消",
          pickerTitleText: "选择近城市",
          onPickerConfirm: data => {
            this.setState(
              {
                city: data[1]
              }
            );
          }
        });
        Picker.show();
    }
    chooseEducation= ()=> {
        Picker.init({
          pickerData: ["博士后", "博士","硕士","本科","大专","高中","留学","其它"],
          selectedValue: ["其它"],
          wheelFlex: [1,0,0],
          pickerConfirmBtnText: "确定",
          pickerCancelBtnText: "取消",
          pickerTitleText: "选择学历",
          onPickerConfirm: data => {
            this.setState(
              {
                education: data[0]
              }
            );
          }
        });
        Picker.show();
    }
    render() {
        console.log(this.state.gender,'bb')
        const {gender,lastLogin,distance, city, education} = this.state
        return (
            <View style={{ position:"absolute", bottom:0, width:"100%", height:"70%", backgroundColor:"#fff",
                paddingRight:pxToDp(10), paddingLeft:pxToDp(10)}}>
                {/*头部*/}
                <View style={{flexDirection:"row", justifyContent:"space-between", alignItems:"center"}}>
                    <Text></Text>
                    <Text style={{color: "#ccc", fontSize:pxToDp(16)}}>帅选</Text>
                    <Icon onPress={this.props.onPress} style={{fontSize:pxToDp(20)}} name="iconshibai"></Icon>
                </View>
                {/*性别选择*/}
                <View style={{flexDirection:"row", alignItems:"center", marginTop:pxToDp(20)}}>
                    <Text style={{color:"#777", fontSize:pxToDp(15), fontWeight:"500", width:pxToDp(80)}}>性别:</Text>
                    <TouchableOpacity onPress={()=> this.selectGender('男')} style={{width: pxToDp(30), height:pxToDp(30),
                        borderRadius:pxToDp(15), backgroundColor: gender==="男"?"red":"#ccc", overflow:"hidden", marginRight:pxToDp(20)}}>
                        <SvgUri svgXmlData={male}></SvgUri>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=> this.selectGender('女')} style={{width: pxToDp(30), height:pxToDp(30),
                        borderRadius:pxToDp(15), backgroundColor:gender==="女"?"red":"#ccc", overflow:"hidden"}}>
                        <SvgUri svgXmlData={female}></SvgUri>
                    </TouchableOpacity>
                </View>
                {/*最近登录*/}
                <View style={{marginTop:pxToDp(10), flexDirection:"row"}}>
                    <Text style={{color:"#777", fontSize:pxToDp(15), fontWeight:"400"}}>最近登录时间：</Text>
                    <Text onPress={this.chooseLastLogin} style={{color:"#777", fontSize:pxToDp(15), fontWeight:"400"}}>{lastLogin||"请选择"}</Text>
                </View>
                {/*距离*/}
                <View style={{marginTop:pxToDp(10)}}>
                    <Text style={{color:"#777", fontSize:pxToDp(15), fontWeight:"400"}}>距离：{distance||"0"}Km</Text>
                    <Slider
                        value={distance}
                        onValueChange={(value) => this.setState({ distance:value })}
                        thumbStyle={{ height: pxToDp(40), width: pxToDp(40), backgroundColor: 'transparent' }}
                        minimumValue={0}
                        maximumValue={10}
                        step={0.5}
                      />
                </View>
                {/*居住地*/}
                <View style={{marginTop:pxToDp(10), flexDirection:"row"}}>
                    <Text style={{color:"#777", fontSize:pxToDp(15), fontWeight:"400"}} >居住地：</Text>
                    <Text onPress={this.chooseCity} style={{color:"#777", fontSize:pxToDp(15), fontWeight:"400"}}>{city||"请选择"}</Text>
                </View>
                {/*学历*/}
                <View style={{marginTop:pxToDp(10), flexDirection:"row"}}>
                    <Text style={{color:"#777", fontSize:pxToDp(15), fontWeight:"400"}} >学历：</Text>
                    <Text onPress={this.chooseEducation} style={{color:"#777", fontSize:pxToDp(15), fontWeight:"400"}}>{education||"请选择"}</Text>
                </View>
                {/*按钮*/}
                <THButton style={{marginTop:pxToDp(10),width: "100%", height:pxToDp(30),alignSelf:"center",borderRadius:pxToDp(20), overflow: 'hidden' }}>确认</THButton>
            </View>
        )
    }
}
export default Index