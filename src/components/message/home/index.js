import React, {Component} from 'react'
import {View, Text, StatusBar, ImageBackground, TouchableOpacity} from "react-native";
import {pxToDp} from "../../../utils/stylesKits";
import Icon from "../../../subComponents/iconfont";
import JMessage from "../../../utils/JMessage";
import {FRIENDS_PERSONALINFO_GUID, BASE_URI} from "../../../utils/pathMap"
import request from "../../../utils/request";

export default class App extends Component {
 // const guid = "136165059931612681586882"
    state={
        list:[]
    }
    componentDidMount() {
        this.getConversations()
    }
    getConversations= async()=>{
        const res = JMessage.getCoversations()
        if(res.length) {
            const idArr = res.map(v=>{v.target.username})
            const url = FRIENDS_PERSONALINFO_GUID.replace(":ids", idArr.join(","))
            const users = await request.privateGet(url)
            this.setState({list:res.map((v,i)=> ({...v, user:user.data[i]}))})
        }

    }
    render() {
        const {list} = this.state
        return (
            <View>
                <StatusBar backgroundColor={"transparent"} translucent={true}></StatusBar>
                {/*头部区域*/}
                <ImageBackground style={{height: pxToDp(60)}} source={require("../../../res/headbg.png")}>
                    <View style={{
                        marginTop: pxToDp(30),
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between"
                    }}>
                        <Text></Text>
                        <Text style={{color: "#fff", fontSize: pxToDp(14)}}>消息</Text>
                        <TouchableOpacity>
                            <Icon style={{fontSize: pxToDp(25), color: "#fff", marginRight: pxToDp(5)}}
                                  name={"icontongxunlu"}></Icon>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
                {/*头顶四个选项*/}
                <View style={{flexDirection:"row", justifyContent:"space-around", padding:pxToDp(10), borderBottomWidth:pxToDp(2), borderBottomColor:"#ccc"}}>
                        <TouchableOpacity style={{alignItems:"center"
                        }}>
                            <View style={{
                            width: pxToDp(60), height: pxToDp(60), backgroundColor: "#ebc969",
                            borderRadius: pxToDp(30), alignItems: "center", justifyContent: "center"
                            }}>
                              <Icon style={{fontSize: pxToDp(40), color: "#fff", marginRight: pxToDp(5)}}
                                  name={"icongonggao"}></Icon>
                                </View>
                            <Text>全部</Text>
                        </TouchableOpacity>
                    <TouchableOpacity style={{alignItems:"center"
                        }}>
                            <View style={{
                            width: pxToDp(60), height: pxToDp(60), backgroundColor: "#adc534",
                            borderRadius: pxToDp(30), alignItems: "center", justifyContent: "center"
                            }}>
                              <Icon style={{fontSize: pxToDp(40), color: "#fff", marginRight: pxToDp(5)}}
                                  name={"icongonggao"}></Icon>
                                </View>
                            <Text>点赞</Text>
                        </TouchableOpacity>
                    <TouchableOpacity style={{alignItems:"center"
                        }}>
                            <View style={{
                            width: pxToDp(60), height: pxToDp(60), backgroundColor: "#965961",
                            borderRadius: pxToDp(30), alignItems: "center", justifyContent: "center"
                            }}>
                              <Icon style={{fontSize: pxToDp(40), color: "#fff", marginRight: pxToDp(5)}}
                                  name={"icongonggao"}></Icon>
                                </View>
                            <Text>评论</Text>
                        </TouchableOpacity>
                    <TouchableOpacity style={{alignItems:"center"
                        }}>
                            <View style={{
                            width: pxToDp(60), height: pxToDp(60), backgroundColor: "#968abc",
                            borderRadius: pxToDp(30), alignItems: "center", justifyContent: "center"
                            }}>
                              <Icon style={{fontSize: pxToDp(40), color: "#fff", marginRight: pxToDp(5)}}
                                  name={"icongonggao"}></Icon>
                                </View>
                            <Text>喜欢</Text>
                        </TouchableOpacity>

                </View>

            </View>
        );
    }
}