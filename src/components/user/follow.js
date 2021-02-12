import React, {Component} from 'react'
import {View, Text, StatusBar} from "react-native";

import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
import CustomerBar from "./subcomponents/customerbar"
import IFollow from "./ifollow"
import FollowMe from "./followme"
import FollowEach from "./followeach"
import request from "../../utils/request";
import {MY_LIKELIST} from "../../utils/pathMap";


export default class Index extends Component{
    state={
        ilikelist:[],
        likemelist:[],
        likeeachlist:[]
    }
    componentDidMount() {
        this.getList()
    }
    getList= async ()=>{
        const result = await request.privateGet(MY_LIKELIST)
        const {ilikelist,likemelist,likeeachlist } = result.data
        this.setState({ilikelist,likemelist,likeeachlist })
    }

    render() {
         const {ilikelist,likemelist,likeeachlist } = this.state
         const index = this.props.route.params||0
        return (
            <ScrollableTabView
                initialPage={index}
                renderTabBar={() => <CustomerBar/>}
            >
                <FollowEach getList={this.getList} likeeachlist={likeeachlist} tabLabel='互相关注'></FollowEach>
                <IFollow getList={this.getList} ilikelist={ilikelist} tabLabel='喜欢'></IFollow>
                <FollowMe getList={this.getList} likemelist={likemelist} tabLabel='粉丝'></FollowMe>
            </ScrollableTabView>
        );
    }
}