import React, {Component} from 'react'
import {View, Text, StatusBar, ImageBackground, Image, TouchableOpacity} from 'react-native'
import Icon from "../../../subComponents/iconfont";
import request from "../../../utils/request";
import {BASE_URI, FRIENDS_SEARCH} from "../../../utils/pathMap";
import {pxToDp, screenHeight, screenWidth} from "../../../utils/stylesKits";
import {Overlay} from "teaset";
import FilterPanel from "./searchfilter";



class Index extends Component {

    params= {
        gender:'女',
        distance: 10000
    }
    state = {
        list:[]
    }
//         uid: 8
// header: "/upload/13828459782.png"
// nick_name: "雾霭朦胧"
// dist: 0
    whMap = {
        wh1: {width:pxToDp(70), height:pxToDp(100)},
        wh2: {width:pxToDp(60), height:pxToDp(90)},
        wh3: {width:pxToDp(50), height:pxToDp(80)},
        wh4: {width:pxToDp(40), height:pxToDp(70)},
        wh5: {width:pxToDp(30), height:pxToDp(60)},
        wh6: {width:pxToDp(20), height:pxToDp(50)},

    }
    getWH = (dist)=> {
        if (dist < 200) {
            return "wh1"
        }if (dist < 400) {
            return "wh2"
        }if (dist < 600) {
            return "wh3"
        }if (dist < 800) {
            return "wh4"
        }if (dist < 1000) {
            return "wh5"
        }else {
            return "wh6"
        }
    }
    componentDidMount() {
        this.getList()
    }
    getList = async (params={})=>{
        const result = await request.privateGet(FRIENDS_SEARCH, {...this.params,...params})
        console.log(result.data,'dd')
        this.setState({list: result.data})
    }
    handleFilterShow=()=>{
        let overlayViewRef = null
        let overlayView = (
          <Overlay.View
            modal={true}
            overlayOpacity={0.3}
            ref={v => overlayViewRef = v}
            >
              {/*显示帅选组件*/}
              <FilterPanel onSubmitFilter={this.handleSubmitFilter} params={this.params} search={true} onClose={()=>{overlayViewRef.close()}}/>
          </Overlay.View>
        );
        Overlay.show(overlayView)
    }
    handleSubmitFilter=(params)=>{
        this.getList(params)
    }
    render() {
        const {list} = this.state
        return (
            <ImageBackground source={require('../../../res/search.gif')} style={{flex:1, position:"relative"}}>
                <StatusBar translucent={true} backgroundColor={"transparent"}></StatusBar>
                <TouchableOpacity onPress={this.handleFilterShow} style={{position:"absolute",right: "5%", top:"5%",zIndex:1000,width:pxToDp(50),alignItems:"center",justifyContent:"center",
                    height:pxToDp(50), borderRadius:pxToDp(25), backgroundColor:"#fff"}}>
                    <Icon style={{color:"#912375", fontSize: pxToDp(30)}} name={"iconshaixuan"}></Icon>
                </TouchableOpacity>
                {list.map((item, i)=>{
                    const WH = this.whMap[this.getWH(item.dist)]
                    const tx = Math.random()* (screenWidth -WH.width)
                    const ty = Math.random()*(screenHeight - WH.height)
                    return (

                        <TouchableOpacity key={i} style={{position:"absolute", left:tx, top: ty}}>
                            <ImageBackground resizeMode={"stretch"} style={{...WH, position:"relative", alignItems:"center"}} source={require("../../../res/showfirend.png")}>
                                <Text numberOfLines={1} style={{color:"#fff", position:"absolute", top:pxToDp(-15), zIndex:999}}>{item.nick_name}</Text>
                                <Image style={{width:WH.width, height:WH.width, borderRadius:WH.width/2}} source={{uri:BASE_URI + item.header}}></Image>
                            </ImageBackground>
                        </TouchableOpacity>
                    )
                })}
                <View style={{alignItems:"center", position:"absolute", bottom:pxToDp(20), width:"100%"}}>
                    <Text style={{color: "#fff", fontSize: pxToDp(14)}}>您附近有 <Text style={{color:"red", fontSize:pxToDp(20)}}>{list.length}</Text> 个好友</Text>
                    <Text style={{color: "#fff", fontSize: pxToDp(14)}}>选择聊聊吧</Text>
                </View>
            </ImageBackground>
        )
    }
}
export default Index