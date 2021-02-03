import React, {Component} from 'react'
import {View, Text, Image} from 'react-native'
import request from "../../../../utils/request";
import {FRIENDS_VISITORS, BASE_URI} from "../../../../utils/pathMap"
import {pxToDp} from "../../../../utils/stylesKits";

class Index extends Component {
    constructor(props) {
        super(props);
        this.state={
            visitors:[]
        }
    }
//     target_uid: 7
// uid: 8
// nick_name: "雾霭朦胧"
// age: 21
// xueli: "大专"
// marry: "未婚"
// gender: "女"
// Distance: 1269880.5
// header: "/upload/13828459782.png"
// agediff: -2
// fateValue: 62
    async componentDidMount() {
        const result = await request.privateGet(FRIENDS_VISITORS)
        console.log(result)
        if (result.code === "10000") {
            this.setState({visitors:result.data})
        }

    }

    render() {
        let {visitors} = this.state
        visitors.splice(1,2)
        return (
            <View style={{flexDirection:"row", marginTop: pxToDp(20), alignItems:"center"}}>
                <Text style={{fontSize:pxToDp(14), color:"#777"}}>最近有{visitors.length}人来访，快去查看...</Text>
                <View style={{flexDirection:"row", flex:1, alignItems:"center", justifyContent:"space-between", paddingLeft:pxToDp(8)}}>
                    {visitors.map((item, i)=>{
                        return (
                            <Image key={i} style={{width:pxToDp(50), height:pxToDp(50), borderRadius:pxToDp(25)}}
                                   source={{uri:BASE_URI + item.header}}></Image>
                        )
                    })}
                    <Text style={{fontSize:pxToDp(16), color:"#777"}}>&gt;</Text>
                </View>

            </View>
        )
    }
}
export default Index