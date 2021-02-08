import React, {Component} from 'react'
import {View, Text, ImageBackground, TouchableOpacity} from 'react-native'
import {pxToDp} from "../../../../utils/stylesKits";

class Index extends Component {
    render() {
        const {goToPage, activeTab, tabs} = this.props
        return (
            <ImageBackground
            style={{height:pxToDp(60), flexDirection:"row",  justifyContent:"space-evenly"}} source={require("../../../../res/rectanglecopy.png")}>
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