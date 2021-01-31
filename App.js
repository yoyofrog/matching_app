/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React, {Component} from "react";
import {View } from 'react-native'
import { Provider} from "mobx-react";

import Nav from './src/nav'
import Geo from './src/utils/geo'
import rootStore from './src/mobx/index'
import JMessage from "./src/utils/JMessage";

class App extends Component{
    state={
        isGeoInit:false,
    }
    async componentDidMount() {
        const result = await Geo.initGeo()
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
