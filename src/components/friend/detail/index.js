import React, {Component} from 'react'
import {View, Text, StatusBar, Image, TouchableOpacity, Modal} from 'react-native'
import {ImageHeaderScrollView} from 'react-native-image-header-scroll-view';
import {Carousel} from "teaset"
import LinearGradient from "react-native-linear-gradient";
import ImageViewer from "react-native-image-zoom-viewer";
import {inject, observer} from "mobx-react";

import request from "../../../utils/request";
import {FRIENDS_PERSONALINFO, BASE_URI} from "../../../utils/pathMap";
import {pxToDp} from "../../../utils/stylesKits";
import FriendHead from "../home/components/friendhead";
import Icon from "../../../subComponents/iconfont";
import JMessage from "../../../utils/JMessage";


@inject("userStore")
@observer
class Index extends Component {
    state = {
        userDetail: {},
        showAlbum:false,
        currentIndex:0,
        imgUrls:[],
        trends:[],

    }

// code: "10000"
// msg: "请求成功"
// data: {
    // id: 7
    // guid: "186657119781591501526289"
    // mobile: "18665711978"
    // header: "/upload/161261135868718665711978.jpg"
    // nick_name: "就好"
    // gender: "男"
    // age: 23
    // marry: "已婚"
    // xueli: "其他"
    // dist: 0
    // agediff: 0
    // fateValue: 50
    // trends: (5) [{…}, {…}, {…}, {…}, {…}]
    // silder: (5) [{…}, {…}, {…}, {…}, {…}]
    // __proto__: Object
    // }
// counts: 6
// pagesize: "5"
// pages: 2
// page: "1"
    params = {
        page: 1,
        pagesize: 2
    }
    totalPages =1
    isLoading = false

    componentDidMount() {
        this.getDetail()
    }

    getDetail = async () => {
        const url = FRIENDS_PERSONALINFO.replace(":id", this.props.route.params.id)
        const result = await request.privateGet(url, this.params)
        this.isLoading = false
        if (result.code === "10000") {
            this.setState({userDetail: result.data, trends:[...this.state.trends, ...result.data.trends]})
            this.totalPages = result.pages
        }
    }
    showAlbum =(i,ii)=>{
        const imgUrls = this.state.userDetail.trends[i].album.map(v=>({url:BASE_URI + v.thum_img_path}))
        const currentIndex = ii
        const showAlbum = true
        this.setState({imgUrls, currentIndex, showAlbum})

    }
    onScroll=({nativeEvent})=>{
        // console.log(nativeEvent.contentSize.height)
        // console.log(nativeEvent.layoutMeasurement.height)
        // console.log(nativeEvent.contentOffset.y)

        const isBottom = nativeEvent.contentSize.height - nativeEvent.layoutMeasurement.height - nativeEvent.contentOffset.y < 10
        const isMore = this.params.page < this.totalPages
        if (isBottom && isMore && !this.isLoading) {
            this.isLoading = true
            this.params.page++
            this.getDetail()
        }
    }
    sendLike= async ()=>{
        // console.log('like')
        const guid = this.state.userDetail.guid
        const text = this.props.userStore.mobile + " 喜欢了你"
        const extras = {user: JSON.stringify(this.state.userDetail) }
        const result = await JMessage.sendTextMessage(guid, text, extras)
        // console.log(result,"88888")
    }

    render() {
        const {userDetail, imgUrls, currentIndex, showAlbum,trends} = this.state
        if (!userDetail.silder) {
            return <></>
        }
        return (
             <ImageHeaderScrollView
                 onScroll={this.onScroll}
              maxHeight={pxToDp(220)}
              minHeight={pxToDp(40)}
              renderForeground={() => (
            <Carousel control style={{height: pxToDp(220)}}>
                {userDetail.silder.map((item, i) => {
                    return (
                        <Image key={i} style={{width: "100%", height: "100%"}}
                               source={{uri: BASE_URI + item.org_img_path}}></Image>
                    )
                })}
            </Carousel>
      )}
    >
      <View style={{marginBottom:pxToDp(230) }}>
          {/*用户信息*/}
    <View>
        <View style={{
            flexDirection: "row",
            backgroundColor: "#fff",
            padding: pxToDp(5),
            borderBottomColor: "#aaa",
            borderBottomWidth: pxToDp(2)
        }}>
            <View style={{flex: 3, justifyContent: "space-around"}}>
                <View style={{
                    flexDirection: "row",
                    paddingLeft: pxToDp(5),
                    alignItems: "center"
                }}>
                    <Text style={{
                        fontSize: pxToDp(18),
                        color: "#555"
                    }}>{userDetail.nick_name}&nbsp;</Text>
                    <Icon name={userDetail.gender === "女" ? "icontanhuanv" : "icontanhuanan"}
                          style={{
                              fontSize: pxToDp(18),
                              color: userDetail.gender === "女" ? "#b564bf" : "red"
                          }}></Icon>
                    <Text style={{
                        fontSize: pxToDp(18),
                        color: "#555"
                    }}>&nbsp;{userDetail.age}岁</Text>
                </View>
                <View style={{flexDirection: "row", paddingLeft: pxToDp(5)}}>
                    <Text
                        style={{fontSize: pxToDp(12), color: "#555"}}>{userDetail.marry}|</Text>
                    <Text
                        style={{fontSize: pxToDp(12), color: "#555"}}>{userDetail.xueli}|</Text>
                    <Text style={{
                        fontSize: pxToDp(12),
                        color: "#555"
                    }}>{userDetail.agediff < 10 ? "年龄相仿" : "有点代沟"}</Text>
                </View>
            </View>
            <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                <View style={{
                    position: "relative",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <Icon name="iconxihuan" style={{fontSize: pxToDp(70), color: "red"}}></Icon>
                    <Text style={{
                        position: "absolute",
                        fontWeight: "500",
                        fontSize: pxToDp(20),
                        color: "#fff",
                        alignSelf: "center"
                    }}>{userDetail.fateValue}</Text>
                </View>
                <Text style={{color: "red", fontSize: pxToDp(15)}}>缘分值</Text>
            </View>
        </View>
    </View>
    {/*用户信息结束*/}
    {/*动态*/}
    <View style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: pxToDp(10),
        borderBottomColor: "#aaa",
        borderBottomWidth: pxToDp(2)
    }}>
        {/*左边标*/}
        <View style={{flexDirection: "row", alignItems: "center"}}>
            <Text style={{color: "#222"}}>动态</Text>
            <View style={{
                marginLeft: pxToDp(3),
                alignItems: "center",
                alignContent: "center",
                backgroundColor: "red",
                width: pxToDp(16),
                height: pxToDp(16),
                borderRadius: pxToDp(8)
            }}>
                <Text style={{color: "#fff"}}>{trends.length}</Text>
            </View>
        </View>
        {/*右边按钮*/}
        <View style={{flexDirection: "row", alignItems: "space-between"}}>
            <TouchableOpacity style={{flexDirection: "row", marginRight: pxToDp(10)}}>
                <LinearGradient style={{
                    width: pxToDp(100), height: pxToDp(30), borderRadius: pxToDp(15),
                    flexDirection: "row", alignItems: "center", justifyContent: "space-evenly"
                }} colors={["#f2ab5a", "#ec7c50"]}
                                start={{x: 0, y: 0}} end={{x: 1, y: 0}}>
                    <Icon style={{color: "#fff", fontSize: pxToDp(14), fontWeight: "500"}}
                          name="iconliaotian"></Icon>
                    <Text style={{
                        color: "#fff",
                        fontSize: pxToDp(14),
                        fontWeight: "500"
                    }}>聊一下</Text>
                </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.sendLike} style={{flexDirection: "row", marginRight: pxToDp(10)}}>
                <LinearGradient style={{
                    width: pxToDp(100), height: pxToDp(30), borderRadius: pxToDp(15),
                    flexDirection: "row", alignItems: "center", justifyContent: "space-evenly"
                }} colors={["#6d47f8", "#e56b7f"]}
                                start={{x: 0, y: 0}} end={{x: 1, y: 0}}>
                    <Icon style={{color: "#fff", fontSize: pxToDp(14), fontWeight: "500"}}
                          name="iconxihuan-o"></Icon>
                    <Text style={{
                        color: "#fff",
                        fontSize: pxToDp(14),
                        fontWeight: "500"
                    }}>喜欢</Text>
                </LinearGradient>
            </TouchableOpacity>
        </View>
    </View>
    {/*动态结束*/}
    {/*动态信息*/}
    <View>
        {trends.map((item, i) =>
            <View key={i} style={{padding:pxToDp(10),backgroundColor:"#fff", borderBottomColor:"#ddd", borderBottomWidth:pxToDp(2)}}>
                {/*用户信息*/}
                <View style={{flexDirection: "row", alignItems: "center",backgroundColor:"#fff",}} >
                    <Image style={{
                        width: pxToDp(50),
                        height: pxToDp(50),
                        borderRadius: pxToDp(25)
                    }} source={{uri: BASE_URI + userDetail.header}}></Image>
                    <View style={{
                        flexDirection: "row",
                        backgroundColor: "#fff",
                        padding: pxToDp(5),
                    }}>
                        <View style={{flex: 3, justifyContent: "space-around"}}>
                            <View style={{
                                flexDirection: "row",
                                paddingLeft: pxToDp(5),
                                alignItems: "center"
                            }}>
                                <Text style={{
                                    fontSize: pxToDp(18),
                                    color: "#555"
                                }}>{item.nick_name}&nbsp;</Text>
                                <Icon
                                    name={userDetail.gender === "女" ? "icontanhuanv" : "icontanhuanan"}
                                    style={{
                                        fontSize: pxToDp(18),
                                        color: userDetail.gender === "女" ? "#b564bf" : "red"
                                    }}></Icon>
                                <Text style={{
                                    fontSize: pxToDp(18),
                                    color: "#555"
                                }}>&nbsp;{userDetail.age}岁</Text>
                            </View>
                            <View style={{flexDirection: "row", paddingLeft: pxToDp(5)}}>
                                <Text
                                    style={{
                                        fontSize: pxToDp(12),
                                        color: "#555"
                                    }}>{userDetail.marry}|</Text>
                                <Text
                                    style={{
                                        fontSize: pxToDp(12),
                                        color: "#555"
                                    }}>{userDetail.xueli}|</Text>
                                <Text style={{
                                    fontSize: pxToDp(12),
                                    color: "#555"
                                }}>{userDetail.agediff < 10 ? "年龄相仿" : "有点代沟"}</Text>
                            </View>
                        </View>
                    </View>
                </View>
                {/*用户发布内容*/}
                <View>
                    <Text>{item.content}</Text>
                </View>
                {/*用户发布图片*/}
                <View style={{marginTop:pxToDp(5), flexDirection:"row"}}>
                    {item.album.map((v, ii)=>
                        <TouchableOpacity key={ii} onPress={()=>this.showAlbum(i,ii)}>
                            <Image style={{width:pxToDp(80), height:pxToDp(80), marginRight:pxToDp(5)}}  source={{uri:BASE_URI + v.thum_img_path}}>
                            </Image>
                        </TouchableOpacity>
                        )}
                </View>
            </View>
        )}
        {this.params.page >= this.totalPages?
        <View>
            <Text style={{color:"#ccc", fontSize:pxToDp(20), alignSelf:"center"}}>没有更多数据了</Text>
        </View>: <></>}
    </View>
          {/*显示大图*/}
        <Modal visible={showAlbum} transparent={true}>
            <ImageViewer onClick={()=>{this.setState({showAlbum: false})}} imageUrls={imgUrls} index={currentIndex} />
        </Modal>
      </View>
    </ImageHeaderScrollView>
        )
    }
}

export default Index