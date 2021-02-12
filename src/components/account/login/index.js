import React, {Component} from 'react'
import {View, Text, Image, StatusBar, StyleSheet, AsyncStorage} from 'react-native'
import {Input, Button} from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'
import {SafeAreaProvider} from "react-native-safe-area-context";
import {CodeField, Cursor} from 'react-native-confirmation-code-field';

import validator from "../../../utils/validator";
import {pxToDp} from "../../../utils/stylesKits";
import request from '../../../utils/request'
import {ACCOUNT_LOGIN, ACCOUNT_VALIDATEVCODE} from "../../../utils/pathMap";
import Toast from '../../../utils/Toast'

import THButton from '../../../subComponents/THButton'
import {inject, observer} from "mobx-react";


@inject("rootStore")
@observer
export default class Login extends Component {
    state = {
        phoneNumber: '18811380000',
        phoneValid: true,
        isLoading: true,
        showLogin: true,
        vCodeTxt: '',
        timeCount: '',
        isCountDown: false
    }

    constructor() {
        super();
    }

    phoneNumberChange = (number) => {

        this.setState({phoneNumber: number})
    }
    phoneNumberSubmit = async () => {
        const {phoneNumber} = this.state
        const phoneValid = validator.validatePhone(phoneNumber)
        if (!phoneValid) {
            this.setState({phoneValid})
            return
        }
        const result = await request.post(ACCOUNT_LOGIN, {phone: this.state.phoneNumber})
        if (result.code = '10000') {
            this.setState({showLogin: false})
            this.countDown()
        }

    }
    vCodeChange = (vCodeTxt) => {
        this.setState({vCodeTxt})
    }
    countDown = () => {
        if (this.state.isCountDown) {
            return
        }
        this.setState({isCountDown: true})
        let seconds = 5
        this.setState({timeCount: `重新获取${seconds}s`})
        let timeCount = setInterval(() => {
            seconds--
            this.setState({timeCount: `重新获取${seconds}s`})
            if (seconds === 0) {
                clearInterval(timeCount)
                this.setState({timeCount: `重新获取`})
                this.setState({isCountDown: false})
            }
        }, 2000)

    }
    repGetVcode = () => {
        this.countDown()
    }
    submitVcode = async () => {
        const {vCodeTxt, phoneNumber} = this.state
        if (vCodeTxt.length != 6) {
            Toast.message('请输入有效验证码', 2000, 'center')
            return
        }
        const result = await request.post(ACCOUNT_VALIDATEVCODE, {
            phone: phoneNumber,
            vcode: vCodeTxt
        })
        if (result.code != '10000') {
            return
        }
        this.props.rootStore.setUserInfo(phoneNumber, result.data.token, result.data.id)
        await AsyncStorage.setItem('userInfo', JSON.stringify({
            mobile: phoneNumber,
            token: result.data.token,
            userId: result.data.id
        }))

        if (result.data.isNew) {
            // 新用户
            this.props.navigation.navigate('UserInfo')

        } else {
            // this.props.navigation.navigate('TabBar')
            this.props.navigation.reset({
                routes:[{name:"TabBar"}]
            })
        }
    }


    render() {
        const {phoneNumber, phoneValid, showLogin, timeCount, isCountDown} = this.state
        let Vcode =
            <View>
                <View><Text style={{
                    marginTop: pxToDp(10),
                    fontSize: pxToDp(20),
                    color: '#888',
                    fontWeight: 'bold'
                }}>输入6位验证码</Text></View>
                <View><Text style={{marginTop: pxToDp(10), color: '#888'}}>已发到：{phoneNumber}</Text></View>
                <View>
                    <CodeField
                        value={this.state.vCodeTxt}
                        onChangeText={this.vCodeChange}
                        onSubmitEditing={this.submitVcode}
                        cellCount={6}
                        rootStyle={styles.codeFieldRoot}
                        keyboardType="number-pad"
                        renderCell={({index, symbol, isFocused}) => (
                            <Text
                                key={index}
                                style={[styles.cell, isFocused && styles.focusCell]}
                            >
                                {symbol || (isFocused ? <Cursor/> : null)}
                            </Text>
                        )}
                    />
                </View>
                <View style={{width: "75%", height: pxToDp(40), alignSelf: "center"}}>
                    <THButton disable={isCountDown} onPress={this.repGetVcode} style={{
                        marginTop: pxToDp(20),
                        borderRadius: pxToDp(20),
                        overflow: 'hidden'
                    }}>{timeCount}</THButton>
                </View>
            </View>

        let Login =
            <View>
                <View>
                    <Text style={{fontSize: pxToDp(18), color: "#888"}}>手机号登录注册</Text>
                </View>
                <View>
                    <Input
                        placeholder='请输入手机号码'
                        maxLength={11}
                        keyboardType="phone-pad"
                        value={phoneNumber}
                        onChangeText={this.phoneNumberChange}
                        errorMessage={phoneValid ? '' : '手机号码格式不正确'}
                        onSubmitEditing={this.phoneNumberSubmit}
                        leftIcon={{type: 'font-awesome', name: 'phone', size: pxToDp(20)}}/>

                </View>
                <View style={{width: "75%", height: pxToDp(40), alignSelf: "center"}}>
                    <THButton style={{borderRadius: pxToDp(20), overflow: 'hidden'}}
                              onPress={this.phoneNumberSubmit}>获取验证码</THButton>
                </View>

            </View>
        return (
            <SafeAreaProvider>
                <View>
                    <StatusBar backgroundColor="transparent" translucent={true}></StatusBar>
                    <Image style={{width: "100%", height: pxToDp(200)}}
                           source={require('../../../res/profileBackground.jpg')}></Image>

                    <View style={{padding: pxToDp(20)}}>
                        {showLogin ? Login : Vcode}
                    </View>

                </View>
            </SafeAreaProvider>
        );
    }
}

const styles = StyleSheet.create({
    root: {flex: 1, padding: 20},
    title: {textAlign: 'center', fontSize: 30},
    codeFieldRoot: {marginTop: 20},
    cell: {
        width: 40,
        height: 40,
        lineHeight: 38,
        fontSize: 24,
        borderBottomWidth: 2,
        borderColor: '#7d53ea',
        textAlign: 'center',
        color: '#7d53ea'
    },
    focusCell: {
        borderColor: '#7d53ea',
    },
});