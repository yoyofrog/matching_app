import React, {Component} from 'react'
import {View, Text, FlatList} from 'react-native'
import request from "../../../utils/request";
import {QZ_TJDT} from "../../../utils/pathMap"

class Index extends Component {
    params={
        page:1,
        pagesize: 10
    }
    state={
        list:[]
    }
    componentDidMount() {
        this.getRecommend()
    }
    getRecommend=async ()=>{
        const result = await request.privateGet(QZ_TJDT, this.params)
        this.setState({list:result.data})
        console.log(result)
    }
    render() {
        return (
            <>
                <FlatList/>
            </>
        )
    }
}
export default Index