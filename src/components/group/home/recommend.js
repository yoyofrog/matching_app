import React, {Component} from 'react'
import {View, Text, FlatList, Image, TouchableOpacity, Modal} from 'react-native'
import request from "../../../utils/request";
import {BASE_URI, QZ_TJDT, QZ_DT_DZ, QZ_DT_XH, QZ_DT_BGXQ} from "../../../utils/pathMap"
import {pxToDp} from "../../../utils/stylesKits";
import Icon from "../../../subComponents/iconfont";
import date from "../../../utils/date"
import JMessage from "../../../utils/JMessage";
import {Toast, ActionSheet} from "teaset";
import {inject, observer} from "mobx-react";
import ImageViewer from "react-native-image-zoom-viewer";

@inject("userStore")
@observer
class Index extends Component {
    params = {
        page: 1,
        pagesize: 3
    }
    state = {
        list: [],
        showAlbum: false,
        imgUrls:[],
        currentIndex:0


// uid: 68
// mobile: "15915912346"
// header: "/upload/160636757675415915912346.jpg"
// nick_name: "曾思鹏"
// gender: "男"
// age: 20
// guid: "159159123461591515495983"
// xueli: "大专"
// marry: "单身"
// dist: 131022.1
// tid: 128
// content: "发布内容"
// star_count: 2
// comment_count: 2
// like_count: 0
// create_time: "2021-01-04T07:18:28.000Z"
// agediff: -3
// images: [{…}]
    }
    totalPages = 2
    isLoading = false

    componentDidMount() {
        this.getRecommend()
    }

    getRecommend = async (isNew=false) => {
        const result = await request.privateGet(QZ_TJDT, this.params)
        if (isNew) {
            this.setState({list:result.data})
        } else {
           this.setState({list: [...this.state.list, ...result.data]})
        }

        this.totalPages = result.pages
        this.isLoading = false
        console.log(result)
    }
    onEndReached = () => {
        const isMore = this.params.page < this.totalPages
        if (isMore && this.isLoading) {
            return
        }
        this.params.page++
        this.isLoading = true
        this.getRecommend()

    }
    handleStar=async (item)=>{
        const url = QZ_DT_DZ.replace(":id", item.tid)
        const result= await request.privateGet(url)
        console.log(result)
        if(result.data.iscancelstar){
            Toast.smile('取消点赞成功',1000, "center")
        } else {
        Toast.smile("点赞成功",1000, "center")}
        //极光信息服务器有问题，暂时不运行代码
        // const text = `${this.props.userStore.user.nick_name}给你动态点赞了`
        // const extras= {user:JSON.stringify(this.props.userStore.user)}
        // JMessage.sendTextMessage(item.guid,text, extras)

        // 从新发送请求

        this.params.page=1
        this.getRecommend(true)
    }
    handleLike=async(item)=>{
        const url =QZ_DT_XH.replace(":id", item.tid)
        const result= await request.privateGet(url)
        console.log(result)
        if(result.data.iscancelstar){
            Toast.smile('取消喜欢成功',1000, "center")
        } else {
        Toast.smile("喜欢成功",1000, "center")}
        this.params.page=1
        this.getRecommend(true)

    }
    showMore=async (item)=>{
        const opts=[
            {title: "举报", onPress:()=> alert("举报")},
            {title:"不敢兴趣", onPress:()=>this.notInterest(item)},
        ]
        ActionSheet.show(opts,{title:"取消"})
    }
    notInterest=async (item)=>{
        const url = QZ_DT_BGXQ.replace(":id", item.tid)
         const result= await request.privateGet(url)
        console.log(result)
        Toast.smile("操作成功")
        this.params.page = 1;
        this.getRecommend(true)
    }
    showAlbum=(index, ii)=>{
        const imgUrls = this.state.list[index].images.map(v=>({url:BASE_URI + v.thum_img_path}))
        const currentIndex = ii
        const showAlbum = true
        this.setState({imgUrls, currentIndex, showAlbum})
    }

    render() {
        const {list,showAlbum,imgUrls, currentIndex} = this.state
        console.log(list, "fffffff")
        if (list.length === 0) return <></>
        return (
            <>
                <FlatList
                    onEndReachedThreshold={0.1}
                    onEndReached={this.onEndReached}
                    data={list}
                    keyExtractor={v => v.tid}
                    renderItem={({item, index}) =>
                        <><View key={index} style={{
                            padding: pxToDp(10),
                            backgroundColor: "#fff",
                            borderBottomColor: "#ddd",
                            borderBottomWidth: pxToDp(2)
                        }}>
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
                                    }} source={{uri: BASE_URI + item.header}}></Image>
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
                                                }}>{item.nick_name}&nbsp;</Text>
                                                <Icon
                                                    name={item.gender === "女" ? "icontanhuanv" : "icontanhuanan"}
                                                    style={{
                                                        fontSize: pxToDp(18),
                                                        color: item.gender === "女" ? "#b564bf" : "red"
                                                    }}></Icon>
                                                <Text style={{
                                                    fontSize: pxToDp(18),
                                                    color: "#555"
                                                }}>&nbsp;{item.age}岁</Text>
                                            </View>
                                            <View style={{flexDirection: "row", paddingLeft: pxToDp(5)}}>
                                                <Text
                                                    style={{
                                                        fontSize: pxToDp(12),
                                                        color: "#555"
                                                    }}>{item.marry}|</Text>
                                                <Text
                                                    style={{
                                                        fontSize: pxToDp(12),
                                                        color: "#555"
                                                    }}>{item.xueli}|</Text>
                                                <Text style={{
                                                    fontSize: pxToDp(12),
                                                    color: "#555"
                                                }}>{item.agediff < 10 ? "年龄相仿" : "有点代沟"}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                <TouchableOpacity onPress={()=>{this.showMore(item)}}>
                                    <Icon style={{fontSize: pxToDp(25), color: "#ccc"}} name="icongengduo"></Icon>
                                </TouchableOpacity>
                            </View>
                            {/*用户发布内容*/}
                            <View>
                                <Text>{item.content}</Text>
                            </View>
                            {/*用户发布图片*/}
                            <View style={{marginTop: pxToDp(5), flexDirection: "row"}}>
                                {item.images.map((v, ii) =>
                                    <TouchableOpacity key={ii} onPress={() => this.showAlbum(index, ii)}>
                                        <Image style={{width: pxToDp(80), height: pxToDp(80), marginRight: pxToDp(5)}}
                                               source={{uri: BASE_URI + v.thum_img_path}}>
                                        </Image>
                                    </TouchableOpacity>
                                )}
                            </View>
                            {/*距离与时间*/}
                            <View style={{flexDirection: "row", marginTop: pxToDp(5)}}>
                                <View><Text style={{color: "#ccc", fontSize: pxToDp(12)}}>距离{item.dist}m</Text></View>
                                <View><Text style={{
                                    color: "#ccc",
                                    fontSize: pxToDp(12)
                                }}>{date(item.create_time).fromNow()}</Text></View>
                            </View>
                            {/*点赞，评论*/}
                            <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                                <TouchableOpacity onPress={()=>this.handleStar(item)}
                                    style={{flexDirection: "row", marginTop: pxToDp(5), alignItems: "center"}}>
                                    <Icon style={{color: "#666", fontSize: pxToDp(11)}} name="icondianzan-o"/>
                                    <Text style={{color: "#666", fontSize: pxToDp(11)}}>{item.star_count}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{flexDirection: "row", marginTop: pxToDp(5), alignItems: "center"}}>
                                    <Icon style={{color: "#666", fontSize: pxToDp(11)}} name="iconpinglun"/>
                                    <Text style={{color: "#666", fontSize: pxToDp(11)}}>{item.comment_count}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={()=>{this.handleLike(item)}}
                                    style={{flexDirection: "row", marginTop: pxToDp(5), alignItems: "center"}}>
                                    <Icon style={{color: "#666", fontSize: pxToDp(11)}} name="iconxihuan-o"/>
                                    <Text style={{color: "#666", fontSize: pxToDp(11)}}>{item.like_count}</Text>
                                </TouchableOpacity>
                            </View>
                            <Modal visible={showAlbum} transparent={true}>
                                <ImageViewer onClick={() => {
                                    this.setState({showAlbum: false})
                                }} imageUrls={imgUrls} index={currentIndex}/>
                            </Modal>

                        </View>
                            {(this.params.page >= this.totalPages)&&(index=== list.length - 1) ?
                                <View style={{height:pxToDp(30), alignItems:"center"}}>
                                    <Text>没有更多数据了</Text>
                                </View> : <></>}

                        </>}/>
            </>
        )
    }
}

export default Index