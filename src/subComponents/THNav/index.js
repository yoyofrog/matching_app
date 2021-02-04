import React, {Component} from 'react'
import {View, Text, ImageBackground,StatusBar,TouchableOpacity} from 'react-native'
import {NavigationContext} from '@react-navigation/native'

import {pxToDp} from "../../utils/stylesKits";
import Icon from "../iconfont"


class Index extends Component {
    static contextType = NavigationContext
    render() {
        return (
            <View>
                <StatusBar backgroundColor={"transparent"} translucent={true}></StatusBar>
                <ImageBackground style={{height:pxToDp(60)}} source={require("../../res/headbg.png")}>
                    <View  style={{marginTop:pxToDp(30), flexDirection:"row", alignItems:"center", justifyContent:"space-between" }}>
                        <TouchableOpacity onPress={this.context.goBack} style={{flexDirection:"row",alignItems:"center", width:pxToDp(40)}}>
                            <Icon style={{color:"#fff", fontSize:pxToDp(14)}} name="iconfanhui"></Icon>
                            <Text style={{color:"#fff", fontSize:pxToDp(14)}}>返回</Text>
                        </TouchableOpacity>
                        <Text style={{color:"#fff", fontSize:pxToDp(14)}}>{this.props.title}</Text>
                        <Text style={{width:pxToDp(40)}}></Text>
                    </View>

                </ImageBackground>
            </View>
        )
    }
}
export default Index