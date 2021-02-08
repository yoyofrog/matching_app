import React, {Component} from 'react'
import {View, Text, StatusBar} from "react-native";

import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
import CustomerBar from "./subcomponents/customerbar"
import Latest from './latest'
import Recommend from './recommend'



export default class Index extends Component{
    render() {
        return (
            <ScrollableTabView
                initialPage={0}
                renderTabBar={() => <CustomerBar/>}
            >
                <Recommend tabLabel='推荐'></Recommend>
                <Latest tabLabel='最新'></Latest>
            </ScrollableTabView>
        );
    }
}