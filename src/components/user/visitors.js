import React, {Component} from 'react'
import {View, Text, Image, TouchableOpacity} from 'react-native'
import THNav from "../../subComponents/THNav";
import request from "../../utils/request";
import {FRIENDS_VISITORS, BASE_URI} from "../../utils/pathMap"
import {pxToDp} from "../../utils/stylesKits";
import Icon from "../../subComponents/iconfont";

class Index extends Component {
    state={
        list:[]
    }
    componentDidMount() {

    }
    getList= async ()=>{
        const result = await request.privateGet(FRIENDS_VISITORS)
        this.setState({list:result.data})
    }
    render() {
        const {list} = this.state
        console.log(list)
        return (
            <View>
                <THNav title="谁看过我"></THNav>
                <View style={{alignItems:"center", backgroundColor:"#ccc"}}>
                    <View style={{flexDirection:"row", alignItems:"center", justifyContent:"center", paddingTop:pxToDp(10)}}>
                        {list.map((v,i)=>
                            <Image style={{width:pxToDp(40), height:pxToDp(40), borderRadius:pxToDp(20), marginLeft:pxToDp(5)}} source={require('../../res/girl.png')}>

                            </Image>
                        )}

                    </View>
                    <Text style={{marginTop:pxToDp(5)}}>最近有{list.length}人来访</Text>
                </View>
                <View>
                    {list.map((item, i) =>
                                <TouchableOpacity onPress={()=> this.context.navigate("Detail", {id:item.id})} key={i} style={{flexDirection:"row", justifyContent:"space-between" , borderBottomWidth:pxToDp(2), borderBottomColor:"#ccc"}} >
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
                                </TouchableOpacity>
                    )}
                </View>
            </View>
        )
    }
}
export default Index