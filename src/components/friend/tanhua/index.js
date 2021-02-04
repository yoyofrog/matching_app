import React, {Component} from 'react'
import {View, Text, ImageBackground, StyleSheet, Image,Button, TouchableOpacity} from 'react-native'
import Swiper from "react-native-deck-swiper";

import request from "../../../utils/request";
import {FRIENDS_CARDS, BASE_URI, FRIENDS_LIKE} from "../../../utils/pathMap";
import THNav from '../../../subComponents/THNav'
import {pxToDp} from "../../../utils/stylesKits";
import Icon from "../../../subComponents/iconfont";
import {Toast} from "teaset"
class Index extends Component {
    constructor() {
        super();
        this.swiperRef = React.createRef()
    }
    totalPages: 0;
    params = {
        page: 1,
        pagesize: 3,
    }
    state = {
        currentCard:0,
        cards:[],
//         id: 8
// header: "/upload/13828459782.png"
// nick_name: "雾霭朦胧"
// age: 21
// gender: "女"
// marry: "未婚"
// xueli: "大专"
// dist: 0
    }
    componentDidMount() {
        this.getCards()
    }
    getCards= async ()=>{
        const result = await request.privateGet(FRIENDS_CARDS, this.params)
        if(result.code === "10000") {
            this.setState({cards: [...this.state.cards,...result.data]})
        }
        this.totalPages = result.pages

    }
    setLike= (type)=>{
        if (type=== "dislike") {
            this.swiperRef.swipeLeft()
        } else {
            this.swiperRef.swipeRight()
        }

    }
    handleLike = async (type)=>{
        const id = this.state.cards[this.state.currentCard].id
        const url = FRIENDS_LIKE.replace(":id", id).replace(":type", type)
        const result = await request.privateGet(url)
        Toast.message(result.data, 1000, "center")
    }

    handleSwipeAll=()=>{
        this.params.page ++
        if (this.params.page > this.state.totalPages) {
            Toast.message("没有更多用户",1000,"center")
        }
        this.getCards()
    }

    render() {
        const {cards, currentCard} = this.state
        return (
            <View style={{flex:1, backgroundColor:"#fff"}}>
                <THNav title={'探花'}></THNav>
                <ImageBackground imageStyle={{height:"100%"}} style={{height:"60%"}} source={require('../../../res/testsoul_bg.png')}>
                    {cards[currentCard]? <Swiper
                            key={Date.now()}
                            ref = {ref=> this.swiperRef = ref}
                            cards={cards}
                            renderCard={(card) => {
                                return (
                                    <View style={styles.card}>
                                        <Image style={{width: "100%", height:"80%"}} source={{uri: BASE_URI + card.header}}></Image>
                                        <View style={{marginTop:pxToDp(10), alignItems:"center"}}>
                                            <View style={{flexDirection:"row" , alignItems:"center"}}>
                                                <Text style={{fontSize:pxToDp(18), color:"#555"}}>{card.nick_name}&nbsp;</Text>
                                                <Icon name={card.gender==="女"? "icontanhuanv":"icontanhuanan"}
                                                      style={{fontSize:pxToDp(18), color:card.gender==="女"? "#b564bf":"red"}}></Icon>
                                                <Text style={{fontSize:pxToDp(18), color:"#555"}}>&nbsp;{card.age}岁</Text>
                                            </View>
                                            <View style={{flexDirection:"row"}}>
                                                <Text style={{fontSize:pxToDp(12), color:"#555"}}>{card.marry}|</Text>
                                                <Text style={{fontSize:pxToDp(12), color:"#555"}}>{card.xueli}|</Text>
                                                <Text style={{fontSize:pxToDp(12), color:"#555"}}>{card.agediff < 10? "年龄相仿":"有点代沟"}</Text>
                                            </View>
                                         </View>
                                    </View>
                                )
                            }}
                            onSwiped={() => {this.setState({currentCard: currentCard+1})}}
                            onSwipedAll={this.handleSwipeAll}
                            onSwipedLeft={()=>this.handleLike("dislike")}
                            onSwipedRight={()=>this.handleLike("like")}
                            cardIndex={currentCard}
                            cardVerticalMargin= {0}
                            backgroundColor={'transparent'}
                            stackSize= {3}>
                        </Swiper> :<></>}
                </ImageBackground>
                {/*心形图标*/}
                <View style={{flexDirection:"row", alignItems:"center",justifyContent:"space-around", marginTop:pxToDp(85)}}>
                    <TouchableOpacity onPress={()=>this.setLike("dislike")} style={{width:pxToDp(50), height:pxToDp(50),
                        borderRadius:pxToDp(25), backgroundColor:"#ebc869", justifyContent:"center", alignItems:"center"}}>
                        <Icon style={{ left:pxToDp(0), top:pxToDp(0),color:"#fff", fontSize:pxToDp(30)}} name="iconbuxihuan"></Icon>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.setLike("like")} style={{width:pxToDp(50), height:pxToDp(50),
                        borderRadius:pxToDp(25), backgroundColor:"red", justifyContent:"center", alignItems:"center"}}>
                        <Icon style={{ left:pxToDp(0), top:pxToDp(0),color:"#fff", fontSize:pxToDp(30)}} name="iconxihuan"></Icon>
                    </TouchableOpacity>

                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
  card: {
      height: "70%",
      alignItems:"center",
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#E8E8E8",
    backgroundColor: "white"
  },
  text: {
    textAlign: "center",
    fontSize: 50,
    backgroundColor: "transparent"
  }
});
export default Index