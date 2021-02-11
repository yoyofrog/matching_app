import React, {Component} from 'react'
import {View, Text, ScrollView, TouchableOpacity, Image} from 'react-native'
import {EMOTION_ARR} from "./datasource";
import {screenWidth} from "../../utils/stylesKits"

class Index extends Component {
    render() {
        const width = screenWidth/10
        return (
            <ScrollView contentContainerStyle={{flexDirection:"row", flexWrap:"wrap"}}>
                {EMOTION_ARR.map((v,i)=>
                    <TouchableOpacity onPress={()=>this.props.onPress(v)} key={i}>
                        <Image style={{width, height:width}} source={v.value}>

                        </Image>

                </TouchableOpacity>)}
            </ScrollView>
        )
    }
}
export default Index