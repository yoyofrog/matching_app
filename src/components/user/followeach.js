import React, {Component} from 'react'
import {View, Text, TextInput, TouchableOpacity, Image} from 'react-native'
import Icon from "../../subComponents/iconfont"
import SearchInput from "./subcomponents/searchinput";
import {pxToDp} from "../../utils/stylesKits";
import {BASE_URI, FRIENDS_LIKE} from "../../utils/pathMap";
import request from "../../utils/request";
import Toast from "teaset/components/Toast/Toast";

class Index extends Component {
    state={
        txt:""
    }
    setDislike= async (id)=>{
        const url = FRIENDS_LIKE.replace(":id", id).replace(":type", "dislike")
        const result = await request.privateGet(url)
        Toast.message("成功取消关注")
        this.props.getList()

    }
    render() {
        console.log(this.props)
        const {txt} = this.state
        const {likeeachlist} = this.props

        const list = likeeachlist.filter(v=>v.nick_name.includes(txt))

        console.log(list)


        return (
            <View>
                <SearchInput value={this.state.txt} onChangeText={(value)=>this.setState({txt:value})} style={{marginTop:pxToDp(5)}}></SearchInput>
                {list.map((user, i)=>
                    <View key={i} style={{flexDirection:"row", alignItems:"center",marginTop:pxToDp(5), padding:pxToDp(10), backgroundColor:"#Fff", justifyContent:"space-between"}} >
                        <View style={{
                            flexDirection: "row",
                        }}>
                             <View>
                            <Image style={{
                                width: pxToDp(50),
                                height: pxToDp(50),
                                borderRadius: pxToDp(25)
                            }} source={{uri:BASE_URI+user.header}}></Image>
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
                                        color: "#555"
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
                                              color: "#555"
                                          }}></Icon>
                                    <Text style={{
                                        fontSize: pxToDp(12),
                                        color: "#555", marginLeft:pxToDp(5)
                                    }}>{user.city}</Text>
                                </View>
                            </View>
                        </View>
                        </View>

                        <TouchableOpacity onPress={()=>this.setDislike(user.id)} style={{borderWidth:pxToDp(1), borderColor:"#ccc", width:pxToDp(80),flexDirection:"row",borderRadius:pxToDp(5),
                            height:pxToDp(30), alignItems:"center", justifyContent:"center", marginRight:pxToDp(10)}}>
                            <Icon name={"iconhuxiangguanzhu"}></Icon>
                            <Text>取消关注</Text>
                        </TouchableOpacity>

                    </View> )}

            </View>

        )
    }
}
export default Index