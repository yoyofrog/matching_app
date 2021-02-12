import React, {Component} from 'react'
import {Text, ImageBackground, TouchableOpacity} from 'react-native'
import {pxToDp} from "../../../utils/stylesKits";
import Icon from "../../../subComponents/iconfont"
import {NavigationContext} from "@react-navigation/native"

class Index extends Component {
    static contextType = NavigationContext
    render() {
        const {goToPage, activeTab, tabs} = this.props
        return (
            <ImageBackground
            style={{height:pxToDp(60), flexDirection:"row",  justifyContent:"space-evenly", position:"relative"}} source={require("../../../res/rectanglecopy.png")}>
                <Icon onPress={()=>this.context.goBack()} name="iconfanhui" style={{position:"absolute",left:pxToDp(-30), top:pxToDp(20),color:"#fff", fontSize:pxToDp(18)}}></Icon>
                {tabs.map((v,i)=>
                    <TouchableOpacity onPress={()=>goToPage(i)} key={i} style={{flexDirection:"row",borderBottomWidth:i === activeTab?pxToDp(3):0,
                        borderBottomColor: "#fff", alignItems:"center",}}>
                        <Text style={{color:"#fff", fontSize:i === activeTab? pxToDp(18):pxToDp(16)}}>{v}</Text>
                    </TouchableOpacity>
                )}
            </ImageBackground>
        )
    }
}
export default Index