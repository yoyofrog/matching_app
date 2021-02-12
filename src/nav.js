import React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {inject, observer} from "mobx-react";

import Login from './components/account/login/index'
import UserInfo from "./components/account/userinfo";
import Demo from './demo'
import TabBar from '../src/tabbar'
import TanHua from './components/friend/tanhua'
import Search from './components/friend/search'
import TestSoul from './components/friend/testsoul'
import TestQuestion from './components/friend/testsoul/testquestions'
import TestResult from './components/friend/testsoul/testresult'
import Detail from "./components/friend/detail"
import Comment from './components/group/home/comment'
import Publish from './components/group/home/publish'
import Follow from "./components/user/follow"
import Trends from "./components/user/trends"
import Visitors from "./components/user/visitors"
import UserUpdate from "./components/user/userupdate"
import Setting from "./components/user/setting"

const Stack = createStackNavigator();

@inject("rootStore")
@observer
class Nav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            initialRouteName: this.props.rootStore.token ? "TabBar" : "Login"
        }
    }

    render() {
        console.log(this.props.rootStore.token)
        let {initialRouteName} = this.state
        console.log(initialRouteName, 'nav')
        return (
            <NavigationContainer>
                <Stack.Navigator headerMode='none' initialRouteName={"Login"}>
                    <Stack.Screen name="Login" component={Login}/>
                    <Stack.Screen name="UserInfo" component={UserInfo}/>
                    <Stack.Screen name="Demo" component={Demo}/>
                    <Stack.Screen name="TabBar" component={TabBar}/>
                    <Stack.Screen name="TanHua" component={TanHua}/>
                    <Stack.Screen name="Search" component={Search}/>
                    <Stack.Screen name="TestSoul" component={TestSoul}/>
                    <Stack.Screen name="TestQuestion" component={TestQuestion}/>
                    <Stack.Screen name="TestResult" component={TestResult}/>
                    <Stack.Screen name="Detail" component={Detail}/>
                    <Stack.Screen name="Comment" component={Comment}/>
                    <Stack.Screen name="Publish" component={Publish}/>
                    <Stack.Screen name="Follow" component={Follow}/>
                    <Stack.Screen name="Trends" component={Trends}/>
                    <Stack.Screen name="UserUpdate" component={UserUpdate}/>
                    <Stack.Screen name="Visitors" component={Visitors}/>
                    <Stack.Screen name="Setting" component={Setting}/>
                </Stack.Navigator>
            </NavigationContainer>
        )
    }

}


export default Nav;