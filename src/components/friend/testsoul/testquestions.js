import React, {Component} from 'react'
import {View, Text, Image, ImageBackground, TouchableOpacity} from 'react-native'
import LinearGradient from "react-native-linear-gradient";

import {inject, observer} from "mobx-react";
import request from "../../../utils/request";
import {BASE_URI, FRIENDS_QUESTIONSECTION, FRIENDS_QUESTIONANS} from "../../../utils/pathMap";
import Toast from "../../../utils/Toast"
import THNav from '../../../subComponents/THNav'
import {pxToDp} from "../../../utils/stylesKits";


@inject("userStore")
@observer
class Index extends Component {
    titles = {
        "初级": require('../../../res/leve1.png'),
        "中级": require('../../../res/leve2.png'),
        "高级": require('../../../res/leve3.png'),
    }
    state = {
        questions:[],
        currentCard: 0
    }
    answers = []
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

    componentDidMount() {
        this.getQuestions()
    }
    getQuestions = async ()=>{
        const {qid} = this.props.route.params
        const url = FRIENDS_QUESTIONSECTION.replace(':id', qid)
        const result = await request.privateGet(url)
        if (result.code !== "10000") {
            Toast.message("获取问题失败")
        }
        this.setState({questions: result.data})
    }
    getFont =(number)=>{
        let num = ""
        switch (number) {
            case 1:
                num = "一"
                break
            case 2:
                num = "二"
                break
            case 3:
                num = "三"
                break
            case 4:
                num = "四"
                break
            default:
                num = number
                break
        }
        return num
    }
    chooseAns = async (answer)=>{
        const {currentCard, questions} = this.state
        this.answers.push(answer)
        if (currentCard >= questions.length - 1) {
            const {qid} = this.props.route.params
            const url = FRIENDS_QUESTIONANS.replace(":id",qid )
            const answersList = this.answers.join(",")
            const result = await request.privatePost(url,{answers:answersList})
            this.props.navigation.navigate("TestResult", result.data)
            console.log(result)
        } else {
            this.setState({currentCard: currentCard + 1})
        }

    }
    render() {
        const {questions, currentCard} = this.state
        const question = this.props.route.params
        const {user} = this.props.userStore
        if (!questions[0]) {
            return <></>
        }
        return (
            <View>
                <THNav title={question.title}></THNav>
                <ImageBackground style={{width:"100%", height:"100%"}} source={require('../../../res/qabg.png')}>
                    <View style={{flexDirection:"row", justifyContent:"space-between", alignItems:"center", marginTop:pxToDp(40)}}>
                        <ImageBackground style={{height : pxToDp(50), width:pxToDp(70), alignItems:"flex-end", justifyContent:"center"}}
                                         source={require('.././../../res/qatext.png')}>
                            <Image style={{width:pxToDp(50), height:pxToDp(50), borderRadius:pxToDp(25), marginRight:0}} source={{uri:BASE_URI + user.header}}></Image>
                        </ImageBackground>
                        <View style={{alignItems:"center"}}>
                            <Text style={{fontSize:pxToDp(20), color:"#fff", fontWeight:"bold"}}>第{this.getFont(currentCard + 1)}题</Text>
                            <Text style={{color:"#ffffff9a"}}>({currentCard+1}/{questions.length})</Text>
                        </View>
                        <ImageBackground style={{height : pxToDp(50), width:pxToDp(70)}}  source={this.titles[question.type]}></ImageBackground>
                    </View>
                    {/*测试题*/}
                    <View style={{marginTop:pxToDp(20), alignSelf:"center", paddingLeft: pxToDp(30), paddingRight:pxToDp(30)}}>
                        <Text style={{color:"#fff", fontSize:pxToDp(16)}}>{questions[currentCard].question_title}</Text>
                        <View>
                            {questions[currentCard].answers.map((item, i)=>{
                                return (
                                    <TouchableOpacity onPress={this.chooseAns} key={i}>
                                        <LinearGradient style={{height:pxToDp(40), borderRadius:pxToDp(6), marginTop: pxToDp(10),
                                            alignItems:"center", justifyContent:"center"}} colors={['#6f45f3', "#6f45f31a"]} start={{x: 0, y:0}} end={{x:1, y: 0}}>
                                            <Text style={{color:"#fff", fontSize:pxToDp(16)}}>{item.ans_title}</Text>
                                        </LinearGradient>
                                    </TouchableOpacity>
                                )
                                })}


                        </View>
                    </View>
                </ImageBackground>
            </View>
        )
    }
}
export default Index