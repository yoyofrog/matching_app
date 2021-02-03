import React, {Component} from 'react'
import {View, Text} from 'react-native'
import iconMap from '../../res/font/icon'

const Index = (props)=> {
        return (
            <View>
                <Text onPress={props.onPress} style={{ fontFamily: "iconfont", ...props.style}}  >{iconMap[props.name]}</Text>
            </View>
        )
    }

export default Index