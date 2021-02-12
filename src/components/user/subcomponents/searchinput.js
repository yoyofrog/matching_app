import React, {Component} from 'react'
import {View, Text, TextInput} from 'react-native'
import Icon from "../../../subComponents/iconfont"
import {pxToDp} from "../../../utils/stylesKits";

class Index extends Component {
    render() {
        return (
            <View style={{height:pxToDp(40), borderRadius:pxToDp(20), backgroundColor:"#fff", position:"relative", ...this.props.style}}>
                <TextInput value={this.props.value} onChangeText={this.props.onChangeText} placeholder="所搜用户" style={{paddingLeft:pxToDp(35), color:"#555", fontSize:pxToDp(18)}}/>
                <Icon style={{position:"absolute", left:pxToDp(10), top:pxToDp(-30), fontSize:pxToDp(18), color:"#555"}} name="iconsousuo"></Icon>
            </View>
        )
    }
}
export default Index