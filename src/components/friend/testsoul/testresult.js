import React, {Component} from 'react'
import {View, Text, ImageBackground, ScrollView, Image} from 'react-native'

import THNav from "../../../subComponents/THNav"
import THButton from "../../../subComponents/THButton"
import {pxToDp} from "../../../utils/stylesKits";
import {BASE_URI} from "../../../utils/pathMap";

class Index extends Component {
    componentDidMount() {
        console.log("ddddd")
        console.log(this.props.route.params)
    }

    render() {
        const result = this.props.route.params
        return (
            <ImageBackground style={{flex:1, width:"100%"}} source={require('../../../res/qabg.png')}>

                <THNav title={"测试结果"}></THNav>
                <ImageBackground style={{flex:1, width:"100%", position:"relative"}} source={require('../../../res/result.png')} resizeMode="stretch">
                    <Text style={{position:"absolute", top:"1%",left: "6%" ,color:"#fff", fontSize:pxToDp(14),letterSpacing:pxToDp(7)  }}>灵魂基因鉴定单</Text>
                    {/*用户名称*/}
                    <View style={{position:"absolute", top:"6%",right: "3%", flexDirection:"row", justifyContent:"space-between", width:"50%"}}>
                        <Text style={{color:"#fff", fontSize:pxToDp(16)}}>[</Text>
                        <Text style={{color:"#fff", fontSize:pxToDp(16),letterSpacing:pxToDp(7)  }} >{result.currentUser.nick_name}</Text>
                        <Text style={{color:"#fff", fontSize:pxToDp(16)}} >]</Text>
                    </View>
                    <ScrollView style={{position:"absolute", top:"12%",right: "3%", width:"50%", height:"28%",}}>
                       <Text style={{color:"#fff"}} >
                        {result.content}
                       </Text>
                    </ScrollView>
                    <View style={{position:"absolute", top:"44%", left:"6%", alignItems:"center"}}>
                        <Text style={{color:"#fff"}}>外向</Text>
                        <Text style={{color:"#fff"}}>{result.extroversion}%</Text>
                    </View>
                    <View style={{position:"absolute", top:"50%", left:"6%", alignItems:"center"}}>
                        <Text style={{color:"#fff"}}>判断</Text>
                        <Text style={{color:"#fff"}}>{result.judgment}%</Text>
                    </View>
                    <View style={{position:"absolute", top:"56%", left:"6%", alignItems:"center"}}>
                        <Text style={{color:"#fff"}}>抽象</Text>
                        <Text style={{color:"#fff"}}>{result.abstract}%</Text>
                    </View>
                    <View style={{position:"absolute", top:"44%", right:"8%", alignItems:"center"}}>
                        <Text style={{color:"#fff"}}>理性</Text>
                        <Text style={{color:"#fff"}}>{result.rational}%</Text>
                    </View>
                    <Text style={{position:"absolute", top:"69%", left:"5%", color:"#fff",  letterSpacing:pxToDp(5), fontSize:pxToDp(15)}}>与你相似</Text>
                    <ScrollView style={{position:"absolute", top:"72%", left:"2%",height:"11%", width:"95%"}} horizontal={true}
                                contentContainerStyle={{flexDirection:"row", alignItems:"center"}}>
                        <Image style={{width:pxToDp(50), height:pxToDp(50), borderRadius:pxToDp(25), marginRight:pxToDp(10)}}
                               source={{uri:BASE_URI+ result.currentUser.header}}></Image>
                        <Image style={{width:pxToDp(50), height:pxToDp(50), borderRadius:pxToDp(25), marginRight:pxToDp(10)}}
                               source={{uri:BASE_URI+ result.currentUser.header}}></Image>
                        <Image style={{width:pxToDp(50), height:pxToDp(50), borderRadius:pxToDp(25), marginRight:pxToDp(10)}}
                               source={{uri:BASE_URI+ result.currentUser.header}}></Image>
                        <Image style={{width:pxToDp(50), height:pxToDp(50), borderRadius:pxToDp(25), marginRight:pxToDp(10)}}
                               source={{uri:BASE_URI+ result.currentUser.header}}></Image>
                        <Image style={{width:pxToDp(50), height:pxToDp(50), borderRadius:pxToDp(25), marginRight:pxToDp(10)}}
                               source={{uri:BASE_URI+ result.currentUser.header}}></Image>
                        <Image style={{width:pxToDp(50), height:pxToDp(50), borderRadius:pxToDp(25), marginRight:pxToDp(10)}}
                               source={{uri:BASE_URI+ result.currentUser.header}}></Image>
                        <Image style={{width:pxToDp(50), height:pxToDp(50), borderRadius:pxToDp(25), marginRight:pxToDp(10)}}
                               source={{uri:BASE_URI+ result.currentUser.header}}></Image>
                        <Image style={{width:pxToDp(50), height:pxToDp(50), borderRadius:pxToDp(25), marginRight:pxToDp(10)}}
                               source={{uri:BASE_URI+ result.currentUser.header}}></Image>
                    </ScrollView>
                    <THButton onPress={() =>this.props.navigation.navigate("TestSoul")} style={{ position:"absolute", top:"85%",width:"80%", height:"8%", alignSelf:"center", borderRadius:pxToDp(7), overflow:"hidden"}}>继续测试</THButton>
                </ImageBackground>


            </ImageBackground>
        )
    }
}
export default Index