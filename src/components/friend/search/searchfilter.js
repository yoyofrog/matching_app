import React, {Component} from 'react'
import {View, Text, TouchableOpacity} from 'react-native'
import {Slider} from "react-native-elements"

import Icon from "../../../subComponents/iconfont"
import THButton from"../../../subComponents/THButton"

import {pxToDp} from "../../../utils/stylesKits";
import SvgUri from "react-native-svg-uri";
import {male, female} from "../../../res/font/iconSvg";



class Index extends Component {
    constructor(props) {
        super(props);
        this.state=JSON.parse(JSON.stringify(this.props.params))
        // gender: "男"
        // distance: 2
    }
    selectGender=(gender)=>{
        if (gender === this.state.gender) {
            gender =''
        }
        this.setState({gender})


    }

    handleSumbmitFilter=()=>{
        this.props.onSubmitFilter(this.state)
        this.props.onClose()
    }
    render() {
        const {gender,lastLogin,distance, city, education} = this.state
        return (
            <View style={{ position:"absolute", bottom:0, width:"100%", height:"70%", backgroundColor:"#fff",
                paddingRight:pxToDp(10), paddingLeft:pxToDp(10)}}>
                {/*头部*/}
                <View style={{flexDirection:"row", justifyContent:"space-between", alignItems:"center"}}>
                    <Text></Text>
                    <Text style={{color: "#ccc", fontSize:pxToDp(16)}}>帅选</Text>
                    <Icon onPress={this.props.onClose} style={{fontSize:pxToDp(20)}} name="iconshibai"></Icon>
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
                {/*距离*/}
                <View style={{marginTop:pxToDp(10)}}>
                    <Text style={{color:"#777", fontSize:pxToDp(15), fontWeight:"400"}}>距离：{distance||"0"}m</Text>
                    <Slider
                        value={distance}
                        onValueChange={(value) => this.setState({ distance:value })}
                        thumbStyle={{ height: pxToDp(40), width: pxToDp(40), backgroundColor: 'transparent' }}
                        minimumValue={0}
                        maximumValue={10000}
                        step={1}
                      />
                </View>

                {/*按钮*/}
                <THButton onPress={this.handleSumbmitFilter} style={{marginTop:pxToDp(10),width: "100%", height:pxToDp(30),alignSelf:"center",borderRadius:pxToDp(20), overflow: 'hidden' }}>确认</THButton>
            </View>
        )
    }
}
export default Index