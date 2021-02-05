import React, {Component} from "react";
import TabNavigator from 'react-native-tab-navigator';
import {inject, observer } from "mobx-react";
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import {pxToDp} from "./utils/stylesKits";

import Friend from './components/friend/home/index'
import Group from './components/group/home/index'
import Message from './components/message/home/index'
import User from './components/user/home/index'
import request from "./utils/request";
import {MY_INFO} from "./utils/pathMap";

@inject("userStore")
@observer
export default class TabBar extends Component {
    state = {
        selectedTab: 'home'
    }
    async componentDidMount() {
        const result = await request.privateGet(MY_INFO)
        console.log(result.data)
        this.props.userStore.setUser(result.data)
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <TabNavigator>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'home'}
                        title="交友"
                        renderIcon={() => <Icon name={'commenting-o'} size={25} color={'gray'}></Icon> }
                        renderSelectedIcon={() => <Icon name={'commenting-o'} size={25} color={'#c863b5'}></Icon> }
                        badgeText="1"
                        onPress={() => this.setState({selectedTab: 'home'})}
                        selectedTitleStyle={{color:"#c863b5"}}
                       >
                        <Friend></Friend>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'group'}
                        title="圈子"
                        renderIcon={() => <Icon name={'th'} size={25} color={'gray'}></Icon>}
                        renderSelectedIcon={() => <Icon name={'th'} size={25} color={'#c863b5'}></Icon>}
                        onPress={() => this.setState({selectedTab: 'group'})}
                    selectedTitleStyle={{color:"#c863b5"}}
                    >
                        <Group></Group>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'message'}
                        title="消息"
                        renderIcon={() => <Icon name={'comments-o'} size={25} color={'gray'}></Icon>}
                        renderSelectedIcon={() => <Icon name={'comments-o'} size={25} color={'#c863b5'}></Icon>}
                        onPress={() => this.setState({selectedTab: 'message'})}
                    selectedTitleStyle={{color:"#c863b5"}}
                    >
                        <Message></Message>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'user'}
                        title="我的"
                        renderIcon={() => <Icon name={'user-o'} size={25} color={'gray'}></Icon>}
                        renderSelectedIcon={() => <Icon name={'user-o'} size={25} color={'#c863b5'}></Icon>}
                        onPress={() => this.setState({selectedTab: 'user'})}
                    selectedTitleStyle={{color:"#c863b5"}}
                    >
                        <User></User>
                    </TabNavigator.Item>
                </TabNavigator>
            </View>
        )
    }
};


