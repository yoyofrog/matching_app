import React, {Component} from 'react'
import {View, Text} from 'react-native'
import request from "../../../utils/request";
import {QZ_TJDT} from "../../../utils/pathMap"

class Index extends Component {
    params={
        page:1,
        pagesize: 10
    }
    componentDidMount() {
        this.getRecommend()
    }
    getRecommend=async ()=>{
        const result = await request.privateGet(QZ_TJDT, this.params)
        console.log(result)
    }
    render() {
        return (
            <View>
                <Text>dood</Text>
            </View>
        )
    }
}
export default Index