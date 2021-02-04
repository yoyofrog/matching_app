import React, {Component} from 'react'
import {View, Text, TouchableOpacity} from 'react-native'
import {pxToDp} from "../../../../utils/stylesKits";
import SvgUri from "react-native-svg-uri";
import {find, nearby, soul} from "../../../../res/font/iconSvg";
import {NavigationContext} from "@react-navigation/native"

class Index extends Component {
    static contextType = NavigationContext
    goPage=(page)=>{
        this.context.navigate(page)
    }
    render() {
        return (
            <View>
                <View style={{paddingTop:40, paddingLeft:80, paddingRight:80, flexDirection: "row", justifyContent:"space-between"}} >
                    <View style={{alignItems: "center"}}>
                        <TouchableOpacity onPress={()=>this.goPage("TanHua")} style={{width: pxToDp(60), height: pxToDp(60),
                        backgroundColor: "red", borderRadius: pxToDp(30),justifyContent:"center", alignItems:"center"}}>
                        <SvgUri style={{width: pxToDp(40), height: pxToDp(40)}} fill="#fff" svgXmlData={find}/>
                        </TouchableOpacity>
                        <Text style={{marginTop: 5, color: "#fff"}}>探花</Text>
                    </View>

                     <View style={{alignItems: "center"}}>
                        <TouchableOpacity style={{width: pxToDp(60), height: pxToDp(60),
                        backgroundColor: "skyblue", borderRadius: pxToDp(30),justifyContent:"center", alignItems:"center"}}>
                        <SvgUri style={{width: pxToDp(40), height: pxToDp(40)}} fill="#fff" svgXmlData={nearby}/>
                        </TouchableOpacity>
                        <Text style={{marginTop: 5, color: "#fff"}}>附件</Text>
                    </View>
                     <View style={{alignItems: "center"}}>
                        <TouchableOpacity style={{width: pxToDp(60), height: pxToDp(60),
                        backgroundColor: "orange", borderRadius: pxToDp(30),justifyContent:"center", alignItems:"center"}}>
                        <SvgUri style={{width: pxToDp(40), height: pxToDp(40)}} fill="#fff" svgXmlData={soul}/>
                        </TouchableOpacity>
                        <Text style={{marginTop: 5, color: "#fff"}}>灵魂</Text>
                    </View>
                 </View>
            </View>
        )
    }
}
export default Index