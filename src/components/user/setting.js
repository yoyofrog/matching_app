import React, {Component} from 'react'
import {View, Text, AsyncStorage, TouchableOpacity} from 'react-native'
import {ListItem} from "react-native-elements";
import THNav from "../../subComponents/THNav"
import {inject,observer} from "mobx-react";
import {pxToDp} from "../../utils/stylesKits";
import {ActionSheet} from 'teaset'
import JMessage from "../../utils/JMessage";
import {Toast} from "teaset"


@inject("rootStore")
@inject("userStore")
@observer
class Index extends Component {
    handleLogout= async ()=>{
        const tmplogout = async()=>{
            // 清除缓存
            console.log('dddd')
           await AsyncStorage.removeItem("userInfo")
            this.props.userStore.clearUser()
            this.props.rootStore.clearUserInfo()
            JMessage.logout()
            Toast.message("退出成功",3000, "center")
            setTimeout(()=>{
                this.props.navigation.navigate("Login")
            }, 1000)
        }
        const opts=[
            {title: "退出", onPress: tmplogout
            }
        ]
        ActionSheet.show(opts, {title:"取消"})

    }
    render() {
        return (
            <View>
                <THNav title="通用设置"></THNav>
                <ListItem bottomDivider>
                    <ListItem.Content>
                        <ListItem.Title>设置陌生人问题</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Chevron/>
                </ListItem>
                 <ListItem bottomDivider>
                    <ListItem.Content>
                        <ListItem.Title>通知设置</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Chevron/>
                </ListItem>
                 <ListItem bottomDivider>
                    <ListItem.Content>
                        <ListItem.Title>黑名单</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Chevron/>
                </ListItem>
                 <ListItem bottomDivider>
                    <ListItem.Content>
                        <ListItem.Title>修改手机号</ListItem.Title>
                    </ListItem.Content>
                     <Text>{this.props.rootStore.mobile}</Text>
                    <ListItem.Chevron/>
                </ListItem>
                <TouchableOpacity onPress={this.handleLogout} style={{marginTop:pxToDp(30), width:pxToDp(300), height:pxToDp(40),alignSelf:"center",alignItems:"center", justifyContent:"center",
                    backgroundColor:"#fff", borderRadius:pxToDp(20)}}>
                    <Text style={{fontSize:pxToDp(20), color:"#666"}}>退出登录</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
export default Index