import React, {Component} from 'react'
import {View, Text, Image} from 'react-native'
import request from "../../../../utils/request";
import {FRIENDS_TODAYBEST, BASE_URI} from "../../../../utils/pathMap";
import {pxToDp} from "../../../../utils/stylesKits";
import Icon from "../../../../subComponents/iconfont"

class Index extends Component {
    constructor(props) {
        super(props);
        this.state= {
            perfectGirl: {
            // id: 224
            // header: "/upload/161180291817118665711977.jpg"
            // nick_name: "七"
            // gender: "女"
            // age: 20
            // marry: "单身"
            // xueli: "大专"
            // dist: 0
            // agediff: -3
            // fateValue: 59
            }
        }

    }

    async componentDidMount() {
        const result = await request.privateGet(FRIENDS_TODAYBEST)
        console.log(result)
        this.setState({perfectGirl: result.data[0]})

    }

    render() {


        const {perfectGirl} = this.state
        return (
            <View style={{flexDirection: "row", padding: pxToDp(5), backgroundColor:"lightgray"}}>
                <View style={{position: 'relative'}}>
                    <Image style={{width: pxToDp(120), height:pxToDp(120)}} source={{uri: BASE_URI+ perfectGirl.header }}></Image>
                    <View style={{position: 'absolute', left: 0 , bottom: pxToDp(5), backgroundColor:'#b564bf', borderRadius:pxToDp(5),
                        width: pxToDp(80), height:pxToDp(20), alignItems:"center", justifyContent:"center"}}
                    >
                        <Text style={{color:'#fff', fontSize: pxToDp(13) }}>今天佳人</Text>
                    </View>
                </View>
                <View style={{flex:1, flexDirection: "row", backgroundColor:"#fff"}}>
                    <View style={{flex: 3, justifyContent:"space-around"}}>
                        <View style={{flexDirection:"row" ,paddingLeft:pxToDp(5), alignItems:"center"}}>
                            <Text style={{fontSize:pxToDp(18), color:"#555"}}>{perfectGirl.nick_name}&nbsp;</Text>
                            <Icon name={perfectGirl.gender==="女"? "icontanhuanv":"icontanhuanan"}
                                  style={{fontSize:pxToDp(18), color:perfectGirl.gender==="女"? "#b564bf":"red"}}></Icon>
                            <Text style={{fontSize:pxToDp(18), color:"#555"}}>&nbsp;{perfectGirl.age}岁</Text>
                        </View>
                        <View style={{flexDirection:"row" ,paddingLeft:pxToDp(5)}}>
                            <Text style={{fontSize:pxToDp(12), color:"#555"}}>{perfectGirl.marry}|</Text>
                            <Text style={{fontSize:pxToDp(12), color:"#555"}}>{perfectGirl.xueli}|</Text>
                            <Text style={{fontSize:pxToDp(12), color:"#555"}}>{perfectGirl.agediff < 10? "年龄相仿":"有点代沟"}</Text>
                        </View>

                    </View>
                    <View style={{flex: 1,  justifyContent:"center",alignItems:"center" }}>
                        <View style={{position:"relative", justifyContent:"center", alignItems:"center"  }}>
                            <Icon name="iconxihuan" style={{fontSize: pxToDp(70), color:"red"}}></Icon>
                            <Text style={{position:"absolute", fontWeight:"500",fontSize:pxToDp(20), color: "#fff", alignSelf:"center" }}>{perfectGirl.fateValue}</Text>
                        </View>
                        <Text style={{color:"red", fontSize:pxToDp(15)}}>缘分值</Text>

                    </View>
                </View>
            </View>
        )
    }
}
export default Index