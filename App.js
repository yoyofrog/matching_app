/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React, {Component} from "react";
import {View, AsyncStorage } from 'react-native'
import { Provider} from "mobx-react";

import Nav from './src/nav'
import Geo from './src/utils/geo'
import JMessage from "./src/utils/JMessage";
import rootStore from './src/mobx'

class App extends Component{
    state={
        isGeoInit:false,
    }
    async componentDidMount() {
        const result = await Geo.initGeo()
        const strUserInfo = await AsyncStorage.getItem("userInfo")
        let userInfo = strUserInfo? JSON.parse(strUserInfo):{}
        if(userInfo.token) {
            rootStore.setUserInfo(userInfo.mobile, userInfo.token, userInfo.userId)
        }
        this.setState({isGeoInit: true})
        JMessage.init()

    }

    render () {
      return (
          <Provider rootStore={rootStore}>
              <View style={{flex:1}}>
                  { this.state.isGeoInit? <Nav></Nav>: null}
              </View>
          </Provider>
      )
  }
}

export default App;
