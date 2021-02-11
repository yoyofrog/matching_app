import React, {Component} from 'react'
import {View, Text, TextInput, TouchableOpacity, ScrollView, Image} from 'react-native'
import THNav from "../../../subComponents/THNav"
import {pxToDp} from "../../../utils/stylesKits";
import request from "../../../utils/request";
import {QZ_DT_PUBLISH, QZ_IMG_UPLOAD} from "../../../utils/pathMap"
import Icon from "../../../subComponents/iconfont";
import ImagePicker from 'react-native-image-picker';
import {Toast, ActionSheet} from "teaset";
import Emotion from "../../../subComponents/emotions"


class Index extends Component {
    constructor() {
        super();
        this.refInput = React.createRef()
        this.state = {
            textContent: "",
            longitude: "113.4283",
            latitude: "23.12877",
            location: "广东省江门市新会区",
            imageContent: [{}],
            tmpImgList: [],
            showEmotions:false

        }
    }

    handleInput = () => {
        if (!this.refInput.isFocused()) {
            this.refInput.focus()
        }
    }
    handleTextChange = (textContent) => {
        this.setState({textContent})
        console.log(this.state.textContent)
    }
    handleSelectImage = () => {
        const options = {
            title: '选择图片',
            cancelButtonTitle: "取消",
            takePhotoButtonTitle: "拍照",
            chooseFromLibraryButtonTitle: "相册",
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };

        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {

                const {tmpImgList} = this.state
                if (tmpImgList.latitude >= 9) {
                    return Toast.message("图片数量不能超过9张")
                }
                tmpImgList.push(response)
                this.setState({tmpImgList})

            }
        })
    }
    delImage=(i)=>{
        const removeImage =()=>{
            const {tmpImgList} = this.state
            tmpImgList.splice(i,1)
            this.setState({tmpImgList})
        }
        const opts =[
            {title:"删除", onPress:removeImage}
        ]
        ActionSheet.show(opts, {title:"取消"})

    }
    selectEmotion=(v)=>{
        this.setState({textContent: this.state.textContent + v.key})
    }
    // 发帖
    submitTrend= async ()=>{
        // const {textContent, longitude, latitude, location} = this.state
        // if (!textContent ||!longitude ||!latitude ||!location){
        //    return Toast.message("输入不合法")
        // }

        // 图片上传代码
        const {tmpImgList} = this.state
        const params = new FormData()
        tmpImgList.forEach(item =>{
            const imgObj = {
                uri:"file//"+item.path,
                name:item.fileName,
                type:"application/octet-stream"
            }
            params.append("images", imgObj)
        })
        console.log(params,"fff")
        const result = await  request.privatePost(QZ_IMG_UPLOAD, params, {
            headers:{  'Content-type': 'multipart/form-data;charset=utf-8'}
        })
        console.log(result)

    }
    render() {
        const {textContent, tmpImgList, showEmotions} = this.state
        return (
            <View style={{flex: 1, backgroundColor: "#fff"}}>
                <THNav title={"发动态"} leftText={"取消"} rightText={"发帖"} onRightPress={this.submitTrend}>
                </THNav>

                <TouchableOpacity onPress={this.handleInput} style={{height: "40%", backgroundColor: "#fff"}}>
                    <TextInput onChangeText={this.handleTextChange} value={textContent} multiline
                               ref={ref => this.refInput = ref} placeholder="请填写动态（140字以内）"
                               style={{backgroundColor: "#fff"}}>
                    </TextInput>
                </TouchableOpacity>
                {/*定位结构*/}
                <View style={{backgroundColor: "#fff", alignItems: "flex-end"}}>
                    <TouchableOpacity
                        style={{flexDirection: "row", alignItems: "center", marginRight: pxToDp(10)}}>
                        <Icon style={{fontSize: pxToDp(14), color: "#888", marginRight: pxToDp(5)}}
                              name="iconlocation"></Icon>
                        <Text style={{fontSize: pxToDp(10), color: "#aaa"}}>你在哪里?</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <ScrollView horizontal>
                        {tmpImgList.map((item, i) =>
                            <TouchableOpacity key={i} onPress={()=>this.delImage(i)}>
                                <Image style={{
                                    width: pxToDp(50), height: pxToDp(50),
                                    marginLeft: pxToDp(5), marginRight: pxToDp(5)
                                }} source={{uri: item.uri}}>

                                </Image>
                            </TouchableOpacity>
                        )}
                    </ScrollView>
                </View>

                {/*工具栏结构*/}
                <View style={{
                    flexDirection: "row",
                    backgroundColor: "#ddd",
                    height: pxToDp(40),
                    alignItems: "center",
                    padding: pxToDp(10),
                    marginTop: pxToDp(5)
                }}>
                    <TouchableOpacity onPress={this.handleSelectImage} style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginRight: pxToDp(10)
                    }}>
                        <Icon style={{fontSize: pxToDp(20), color: "#888", marginRight: pxToDp(5)}}
                              name="icontupian"></Icon>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.setState({showEmotions: !showEmotions})}
                        style={{flexDirection: "row", alignItems: "center", marginRight: pxToDp(10)}}>
                        <Icon style={{fontSize: pxToDp(20), color: "#888", marginRight: pxToDp(5)}}
                              name="iconbiaoqing"></Icon>
                    </TouchableOpacity>
                </View>
                {/*表情组件*/}
                {showEmotions?
                <Emotion onPress={this.selectEmotion}></Emotion> : <></> }
            </View>
        )
    }
}

export default Index