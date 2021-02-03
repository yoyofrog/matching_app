import React, {Component} from 'react'
import {View, Text, TouchableOpacity, StatusBar, Image} from "react-native";
import {ImageHeaderScrollView} from 'react-native-image-header-scroll-view';
import { Overlay } from 'teaset'

import request from "../../../utils/request";
import {FRIENDS_RECOMMEND, BASE_URI} from "../../../utils/pathMap";
import {pxToDp} from "../../../utils/stylesKits";
import FriendHead from "./components/friendhead"
import Visitor from "./components/visitor"
import Icon from "../../../subComponents/iconfont"
import PerfectGirl from "./components/perfectgirl"
import FilterPanel from "./components/filterpanel"




class Friend extends Component {
    state = {
        params: {
            page: 1,
            pagesize: 10,
            gender: "男",
            distance: 2,
            lastLogin: "",
            city: "",
            education: "",
        },
        recommends: [],

    }

    componentDidMount() {
        this.getRecommend()
    }

    getRecommend = async () => {
        const {params} = this.state
        const result = await request.privateGet(FRIENDS_RECOMMEND, params)
        if (result.code === "10000") {
            this.setState({recommends: result.data})
        }


    }

    filterHandler=()=>{
        const {page,pagesize, ...others} = this.state.params
        let overlayViewRef = null
        let overlayView = (
          <Overlay.View
            modal={true}
            overlayOpacity={0.3}
            ref={v => overlayViewRef = v}
            >
              {/*显示帅选组件*/}
              <FilterPanel params={others} onPress={()=>{overlayViewRef.close()}}/>
          </Overlay.View>
        );
        Overlay.show(overlayView)
    }

    render() {
        const {recommends} = this.state
        return (
            <ImageHeaderScrollView
                maxHeight={pxToDp(130)}
                minHeight={pxToDp(40)}
                headerImage={require("../../../res/headfriend.png")}
                renderForeground={() => (
                    <View>
                        <StatusBar backgroundColor={"transparent"} translucent={true}></StatusBar>
                        <FriendHead/>
                    </View>
                )}
            >
                <View style={{height: 1000,marginBottom:pxToDp(200)}}>
                    <Visitor/>
                    <View style={{height: pxToDp(5), backgroundColor: "lightgray"}}></View>
                    <PerfectGirl/>
                    <View>
                        <View style={{
                            flexDirection: "row", justifyContent: "space-between", alignItems: "center",
                            padding: pxToDp(15), height: pxToDp(40), backgroundColor: "#eee"
                        }}>
                            <Text style={{color: "#666"}}>推荐</Text>
                            <TouchableOpacity onPress={this.filterHandler}  >
                                <Icon   style={{color: "#666"}} name="iconshaixuan"></Icon>
                            </TouchableOpacity>
                        </View>
                        <View >
                            {recommends.map((item, i) =>
                                <View key={i} style={{flexDirection:"row", justifyContent:"space-between" , borderBottomWidth:pxToDp(2), borderBottomColor:"#ccc"}} >
                                    {/*leftside*/}
                                    <View style={{flexDirection: "row", padding: pxToDp(10), alignItems:"center"}}>
                                        <Image style={{width: pxToDp(50), height: pxToDp(50), borderRadius: pxToDp(25)}}
                                               source={{uri: BASE_URI + item.header}}></Image>
                                        <View>
                                            <View style={{
                                                flexDirection: "row",
                                                paddingLeft: pxToDp(5),
                                                alignItems: "center"
                                            }}>
                                                <Text style={{
                                                    fontSize: pxToDp(16),
                                                    color: "#555"
                                                }}>{item.nick_name}&nbsp;</Text>
                                                <Icon name={item.gender === "女" ? "icontanhuanv" : "icontanhuanan"}
                                                      style={{
                                                          fontSize: pxToDp(16),
                                                          color: item.gender === "女" ? "#b564bf" : "red"
                                                      }}></Icon>
                                                <Text style={{
                                                    fontSize: pxToDp(16),
                                                    color: "#555"
                                                }}>&nbsp;{item.age}岁</Text>
                                            </View>
                                            <View style={{flexDirection: "row", paddingLeft: pxToDp(5)}}>
                                                <Text style={{fontSize: pxToDp(10), color: "#555"}}>{item.marry}|</Text>
                                                <Text style={{fontSize: pxToDp(10), color: "#555"}}>{item.xueli}|</Text>
                                                <Text style={{
                                                    fontSize: pxToDp(10),
                                                    color: "#555"
                                                }}>{item.agediff < 10 ? "年龄相仿" : "有点代沟"}</Text>
                                            </View>
                                        </View>

                                    </View>
                                    {/*leftside end*/}
                                    {/*rightside*/}
                                        <View
                                            style={{
                                                flexDirection:"row",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                paddingRight:pxToDp(20)
                                            }}>
                                            <Icon name="iconxihuan"
                                                  style={{fontSize: pxToDp(18), color: "red"}}></Icon>
                                            <Text style={{
                                                fontWeight: "700",
                                                fontSize: pxToDp(14),
                                                color: "#ccc"
                                            }}>{item.fateValue}</Text>
                                        </View>
                                </View>
                            )}
                        </View>
                    </View>
                </View>
            </ImageHeaderScrollView>
        );
    }
}

export default Friend