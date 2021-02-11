import React, {Component} from 'react'
import {View, Text, Image, TouchableOpacity,Modal,TextInput,ScrollView} from 'react-native'
import THNav from "../../../subComponents/THNav"
import {pxToDp} from "../../../utils/stylesKits";
import {BASE_URI, QZ_DT_PL, QZ_DT_PL_DZ, QZ_DT_PL_TJ} from "../../../utils/pathMap";
import Icon from "../../../subComponents/iconfont";
import THButton from "../../../subComponents/THButton"
import request from "../../../utils/request";
import date from "../../../utils/date"
import {Toast} from "teaset";

class Index extends Component {
    state = {
        list: [],
        counts: 0,
        showInput:true,
        text:""
    }
    params = {
        page: 1,
        pagesize: 5
    }
    totalPages = 1
    isLoading = false

    componentDidMount() {
        this.getList()

    }

    getList = async (isNew = false) => {
        const url = QZ_DT_PL.replace(":id", this.props.route.params.tid)
        const result = await request.privateGet(url, this.params)
        // console.log(result)
        this.totalPages = result.pages
        this.isLoading = false
        if (isNew) {
            this.setState({list:result.data,counts: result.counts})
        } else {
            this.setState({list: [...this.state.list,...result.data], counts: result.counts})
        }


    }
    handleStar = async (id) => {
        const url = QZ_DT_PL_DZ.replace(":id", id)
        const result = await request.privateGet(url)
        console.log(result)
        Toast.smile("点赞成功")
        this.params.page = 1
        this.getList(true)
    }
    // 结束输入
    editingEnd= ()=>{
        this.setState({showInput:false, text:""})

    }
    submitComment=async ()=>{
        const {text} =this.state
        if (!text.trim()){
           return Toast.message("评论不能为空")
        }
        const url = QZ_DT_PL_TJ.replace(":id", this.props.route.params.tid)
        const result = await request.privatePost(url, {comment:text})
        if(result.code==="10000") {
            Toast.message("发表评论成功")
        }
        this.editingEnd()
        this.params.page = 1
        this.getList(true)

    }
    scroll=({nativeEvent})=>{
        const isBottom = nativeEvent.contentSize.height - nativeEvent.layoutMeasurement.height - nativeEvent.contentOffset.y < 10
        const isMore = this.params.page < this.totalPages
        if (isBottom && isMore && !this.isLoading) {
            this.isLoading = true
            this.params.page++
            this.getList()
        }
    }

    render() {
        const userInfo = this.props.route.params
        const {list, counts, showInput, text} = this.state
        return (
            <ScrollView onScroll={this.scroll} style={{backgroundColor: "#fff"}}>
                <THNav title="最新评论"></THNav>
                <View style={{backgroundColor: "#fff", padding: pxToDp(5)}}>


                    {/*用户信息*/}
                    <View style={{
                        flexDirection: "row",
                        alignItems: "center",
                        backgroundColor: "#fff",
                        justifyContent: "space-between"
                    }}>
                        <View style={{flexDirection: "row"}}>
                            <Image style={{
                                width: pxToDp(50),
                                height: pxToDp(50),
                                borderRadius: pxToDp(25)
                            }} source={{uri: BASE_URI + userInfo.header}}></Image>
                            <View style={{
                                flexDirection: "row",
                                backgroundColor: "#fff",
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
                                            color: "#555"
                                        }}>{userInfo.nick_name}&nbsp;</Text>
                                        <Icon
                                            name={userInfo.gender === "女" ? "icontanhuanv" : "icontanhuanan"}
                                            style={{
                                                fontSize: pxToDp(18),
                                                color: userInfo.gender === "女" ? "#b564bf" : "red"
                                            }}></Icon>
                                        <Text style={{
                                            fontSize: pxToDp(18),
                                            color: "#555"
                                        }}>&nbsp;{userInfo.age}岁</Text>
                                    </View>
                                    <View style={{flexDirection: "row", paddingLeft: pxToDp(5)}}>
                                        <Text
                                            style={{
                                                fontSize: pxToDp(12),
                                                color: "#555"
                                            }}>{userInfo.marry}|</Text>
                                        <Text
                                            style={{
                                                fontSize: pxToDp(12),
                                                color: "#555"
                                            }}>{userInfo.xueli}|</Text>
                                        <Text style={{
                                            fontSize: pxToDp(12),
                                            color: "#555"
                                        }}>{userInfo.agediff < 10 ? "年龄相仿" : "有点代沟"}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                    {/*用户发布内容*/}
                    <View>
                        <Text>{userInfo.content}</Text>
                    </View>
                    {/*用户发布图片*/}
                    <View style={{marginTop: pxToDp(5), flexDirection: "row"}}>
                        {userInfo.images.map((v, ii) =>
                            <TouchableOpacity key={ii} onPress={() => this.showAlbum(index, ii)}>
                                <Image style={{width: pxToDp(80), height: pxToDp(80), marginRight: pxToDp(5)}}
                                       source={{uri: BASE_URI + v.thum_img_path}}>
                                </Image>
                            </TouchableOpacity>
                        )}
                    </View>
                    {/*距离与时间*/}
                    <View style={{flexDirection: "row", marginTop: pxToDp(5)}}>
                        <View><Text style={{color: "#ccc", fontSize: pxToDp(12)}}>距离{userInfo.dist}m</Text></View>
                        <View><Text style={{
                            color: "#ccc",
                            fontSize: pxToDp(12)
                        }}>{date(userInfo.create_time).fromNow()}</Text></View>
                    </View>
                </View>
                {/*最新评论*/}
                <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: pxToDp(5),
                    backgroundColor: "#fff"
                }}>
                    <View style={{flexDirection: "row", alignItems: "center"}}>
                        <Text style={{fontSize: pxToDp(14)}}>最新评论</Text>
                        <View style={{
                            width: pxToDp(16),
                            height: pxToDp(16),
                            borderRadius: pxToDp(8),
                            backgroundColor: "red",
                            alignItems: "center",
                            justifyContent: "center",
                            marginLeft: pxToDp(5)
                        }}>
                            <Text style={{color: "#fff"}}>{counts}</Text>
                        </View>
                    </View>
                    <View>
                        <THButton onPress={()=>this.setState({showInput: true})} textStyle={{fontSize: pxToDp(10)}} style={{
                            width: pxToDp(100),
                            height: pxToDp(20),
                            borderRadius: pxToDp(10),
                            overflow: "hidden"
                        }}>发表评论</THButton>
                    </View>
                </View>
                {/*评论列表 */}
                <View>
                    {list.map((v, i) =>
                        <View key={i} style={{
                            flexDirection: "row", justifyContent: "space-between", alignItems: "center", height:pxToDp(100),
                            padding: pxToDp(5), borderBottomColor: "#ccc", borderBottomWidth: pxToDp(1)
                        }}>
                            {/*左边*/}
                            <View style={{flexDirection: "row"}}>
                                <Image style={{width: pxToDp(50), height: pxToDp(50), borderRadius: pxToDp(25)}}
                                       source={{uri: BASE_URI + v.header}}></Image>
                                <View style={{marginLeft: pxToDp(5)}}>
                                    <Text style={{color: "#666"}}>{v.nick_name}</Text>
                                    <Text
                                        style={{color: "#666"}}>{date(v.create_time).format("YYYY-MM-DD HH:mm:ss")}</Text>
                                    <Text style={{marginTop: pxToDp(5)}}>{v.content}</Text>
                                </View>
                            </View>
                            {/*右边*/}
                            <TouchableOpacity onPress={() => this.handleStar(v.cid)}
                                              style={{
                                                  flexDirection: "row",
                                                  marginTop: pxToDp(5),
                                                  alignItems: "center"
                                              }}>
                                <Icon style={{color: "#666", fontSize: pxToDp(11)}} name="icondianzan-o"/>
                                <Text style={{color: "#666", fontSize: pxToDp(11)}}>{v.star}</Text>
                            </TouchableOpacity>
                        </View>)}
                </View>
                <Modal visible={showInput} transparent={true} animationType="slide" onRequestClose={this.editingEnd}>
                    <TouchableOpacity onPress={this.editingEnd} style={{flex:1, backgroundColor:"rgba(0,0,0,0.5)", position:"relative"}}>
                        <View style={{position:"absolute",left:0,bottom:0 ,width:"100%", backgroundColor:"#ccc", flexDirection:"row",
                            alignItems:"center", padding:pxToDp(5), justifyContent:"space-around"}}>
                            <TextInput onSubmitEditing={this.submitComment} onChangeText={text => this.setState({text})} value={text} autoFocus placeholder={"发表评论"} style={{width:"80%",height:pxToDp(30), borderRadius:pxToDp(15),backgroundColor:"#fff"}}/>
                            <Text onPress={this.submitComment} style={{color:"#666", fontSize:pxToDp(14)}}>发布</Text>
                        </View>
                    </TouchableOpacity>
                </Modal>
                {(this.params.page >= this.totalPages) ?
                                <View style={{height:pxToDp(30), alignItems:"center"}}>
                                    <Text>没有更多数据了</Text>
                                </View> : <></>}
            </ScrollView>
        )
    }
}

export default Index