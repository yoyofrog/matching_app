import React, {Component} from 'react'
import {View, Text, ImageBackground, Image,StyleSheet} from 'react-native'
import Swiper from 'react-native-deck-swiper'

import THNav from '../../../subComponents/THNav'
import THButton from "../../../subComponents/THButton"
import {pxToDp} from "../../../utils/stylesKits";

import request from "../../../utils/request";
import {BASE_URI, FRIENDS_QUESTIONS} from "../../../utils/pathMap";
import Icon from "../../../subComponents/iconfont";

class Index extends Component {
    state={
        questions:[],
        currentCard:0,
//         qid: 1
// type: "初级"
// title: "初级灵魂题"
// star: 2
// imgpath: "/upload/questions/1.png"
// status: 0
// count: 3
// sort_no: 1
// istested: true
// islock: false
    }

    componentDidMount() {
        this.getQuestions()
    }

    getQuestions= async ()=>{
        const result = await request.privateGet(FRIENDS_QUESTIONS)
        this.setState({questions: result.data})
        console.log(result)
    }
    goQuestions=()=>{
        const {questions, currentCard} = this.state
        this.props.navigation.navigate("TestQuestion", questions[currentCard])
    }
    render() {
        const {questions,currentCard} = this.state
        console.log(questions)
        return (
            <View style={{flex:1,backgroundColor:"#fff"}}>
                <THNav title="测灵魂"></THNav>
                <ImageBackground style={{width: "100%",height:"60%", alignItems:"center"}} imageStyle={{height:"100%"}}
                                 source={require("../../../res/testsoul_bg.png")}>
                    {questions.length !== 0 ? <Swiper
                            cards={questions}
                            renderCard={(card) => {
                                return (
                                    <View style={styles.card}>
                                        <Image style={{width:"100%",height: "100%"}} source={{uri:BASE_URI+card.imgpath}}></Image>

                                    </View>
                                )
                            }}
                            onSwiped={(cardIndex) => {this.setState({currentCard: cardIndex + 1})}}
                            cardIndex={currentCard}
                            cardVerticalMargin= {0}
                            backgroundColor={'transparent'}
                            stackSize= {1}>
                        </Swiper> : <></>}

                </ImageBackground>
                <THButton onPress={this.goQuestions} style={{position:"absolute", bottom:pxToDp(25),alignSelf:"center",width:"50%", height:pxToDp(30), borderRadius:pxToDp(5), overflow:"hidden"}}>开始测试</THButton>
            </View>
        )
    }
}
const styles = StyleSheet.create({
  card: {
      height: "80%",
      alignItems:"center",
    backgroundColor: "white"
  },
  text: {
    textAlign: "center",
    fontSize: 50,
    backgroundColor: "transparent"
  }
});
export default Index