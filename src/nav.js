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

const Stack = createStackNavigator();

@inject("rootStore")
@observer
class Nav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            initialRouteName: this.props.rootStore.token? "TabBar":"Login"
        }
    }
    render() {
        console.log(this.props.rootStore.token)
        let {initialRouteName} = this.state
        console.log(initialRouteName,'nav')
        return (
            <NavigationContainer>
                <Stack.Navigator headerMode='none' initialRouteName={"TanHua"}>
                    <Stack.Screen name="Login" component={Login}/>
                    <Stack.Screen name="UserInfo" component={UserInfo}/>
                    <Stack.Screen name="Demo" component={Demo}/>
                    <Stack.Screen name="TabBar" component={TabBar}/>
                    <Stack.Screen name="TanHua" component={TanHua}/>
                </Stack.Navigator>
            </NavigationContainer>
        )
    }

}


export default Nav;