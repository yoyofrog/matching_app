import React, {Component} from 'react'
import {View, Text, StatusBar, Image, TouchableOpacity, ScrollView, RefreshControl} from "react-native";
import {pxToDp} from "../../../utils/stylesKits";
import Icon from "../../../subComponents/iconfont"
import {inject, observer} from "mobx-react";
import {BASE_URI,MY_COUNTS} from "../../../utils/pathMap";
import {ListItem} from "react-native-elements";
import request from "../../../utils/request";
import {NavigationContext} from "@react-navigation/native"

@inject("userStore")
@observer
export default class App extends Component {
    static contextType = NavigationContext
    state={
        city:"广州",
        fanCount: 0,
        loveCount:0,
        eachLoveCount:0,
        isRefreshing: false
    }
    componentDidMount() {
        this.getList()
    }
    getList = async ()=>{
        const result = await request.privateGet(MY_COUNTS)
        
        const fanCount = result.data[0].cout
        const loveCount = result.data[1].cout
        const eachLoveCount = result.data[2].cout
        this.setState({fanCount,loveCount,eachLoveCount})
        return Promise.resolve()


    }
    onRefresh= async ()=>{
        this.setState({isRefreshing:true})
        await this.getList()

        this.setState({isRefreshing:false})

    }
    render() {
        const {user} = this.props.userStore
        console.log(user)
        const {city, eachLoveCount,fanCount,loveCount,isRefreshing} = this.state
        console.log(this.state)
        return (
            <ScrollView refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={this.onRefresh}/>}   contentContainerStyle={{flex: 1}}>
                <StatusBar translucent={true} backgroundColor="transparent"></StatusBar>
                <View style={{height: pxToDp(150), backgroundColor: "#c7689f", position: "relative"}}>
                    <TouchableOpacity onPress={()=>this.context.navigate('UserUpdate')} style={{ position: "absolute",
                        top: pxToDp(25),
                        right: pxToDp(15)}} >
                        <Icon name="iconbianji" style={{
                        fontSize: pxToDp(18),
                        color: "#FFF",

                    }}></Icon>
                    </TouchableOpacity>

                    {/*用户信息*/}
                    <TouchableOpacity style={{flexDirection:"row", alignItems:"center",marginTop:pxToDp(40), padding:pxToDp(10)}} >
                        <View>
                            <Image style={{
                                width: pxToDp(50),
                                height: pxToDp(50),
                                borderRadius: pxToDp(25)
                            }} source={require("../../../res/girl.png")}></Image>
                        </View>
                        <View style={{
                            flexDirection: "row",
                            padding: pxToDp(5),
                        }}>
                            <View>
                                <View style={{
                                    flexDirection: "row",
                                    paddingLeft: pxToDp(5),
                                    alignItems: "center"
                                }}>
                                    <Text style={{
                                        fontSize: pxToDp(18),
                                        color: "#fff"
                                    }}>{user.nick_name}&nbsp;</Text>
                                    <View style={{ flexDirection:"row", alignItems:"center",width: pxToDp(60),backgroundColor:"#fff",padding:pxToDp(6),
                                        height: pxToDp(20), borderRadius: pxToDp(10)}}>
                                        <Icon
                                            name={user.gender === "女" ? "icontanhuanv" : "icontanhuanan"}
                                            style={{
                                                fontSize: pxToDp(18),
                                                color: user.gender === "女" ? "#b564bf" : "red"
                                            }}></Icon>
                                        <Text style={{
                                            fontSize: pxToDp(18),
                                            color: "#666"
                                        }}>&nbsp;{user.age}</Text>
                                    </View>

                                </View>
                                <View style={{flexDirection: "row", alignItems: "center", paddingLeft: pxToDp(5)}}>
                                    <Icon name={"iconlocation"}
                                          style={{
                                              fontSize: pxToDp(12),
                                              color: "#fff"
                                          }}></Icon>
                                    <Text style={{
                                        fontSize: pxToDp(12),
                                        color: "#fff", marginLeft:pxToDp(5)
                                    }}>{city}</Text>

                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>

                </View>
                 {/*关注栏*/}
                    <View style={{width:"80%", height:pxToDp(100), backgroundColor:"pink", alignSelf:"center",
                        borderRadius:pxToDp(5), flexDirection:"row",alignItems:"center", marginTop:pxToDp(-10)}}>

                        <TouchableOpacity onPress={()=>this.context.navigate("Follow", 0)} style={{flex:1,alignItems:"center",justifyContent:"center",height:"100%"}}>
                            <Text style={{fontSize:pxToDp(14)}}>{eachLoveCount}</Text>
                            <Text style={{fontSize:pxToDp(14)}}>相互关注</Text>
                        </TouchableOpacity >
                        <TouchableOpacity onPress={()=>this.context.navigate("Follow", 1)} style={{flex:1,alignItems:"center"}}>
                            <Text style={{fontSize:pxToDp(14)}}>{loveCount}</Text>
                            <Text style={{fontSize:pxToDp(14)}}>喜欢</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.context.navigate("Follow", 2)} style={{flex:1,alignItems:"center"}}>
                            <Text style={{fontSize:pxToDp(14)}}>{fanCount}</Text>
                            <Text style={{fontSize:pxToDp(14)}}>粉丝</Text>
                        </TouchableOpacity>
                    </View>
                    {/*列表*/}
                    <View style={{marginTop:pxToDp(15)}}>
                       <ListItem onPress={()=>this.context.navigate('Trends')} bottomDivider >
                           <Icon name="icondongtai"></Icon>
                          <ListItem.Content>
                              <ListItem.Title>我的动态</ListItem.Title>
                          </ListItem.Content>
                           <ListItem.Chevron />
                       </ListItem>
                        <ListItem onPress={()=>this.context.navigate('Visitors')} bottomDivider>
                           <Icon name="iconshuikanguowo"></Icon>
                          <ListItem.Content>
                              <ListItem.Title>谁看过我</ListItem.Title>
                          </ListItem.Content><ListItem.Chevron />
                       </ListItem>
                        <ListItem onPress={()=>this.context.navigate('Setting')}  bottomDivider>
                           <Icon name="iconshezhi"></Icon>
                          <ListItem.Content>
                              <ListItem.Title>通用设置</ListItem.Title>
                          </ListItem.Content><ListItem.Chevron />
                       </ListItem>
                        <ListItem bottomDivider>
                           <Icon name="iconkefu"></Icon>
                          <ListItem.Content>
                              <ListItem.Title>客服在线</ListItem.Title>
                          </ListItem.Content><ListItem.Chevron />
                       </ListItem>
                    </View>


            </ScrollView>
        );
    }
}