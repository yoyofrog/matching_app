/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React, {Component} from "react";
import {View } from 'react-native'
import Nav from './src/nav'
import Geo from './src/utils/geo'

class App extends Component{
    state={
        isGeoInit:false,
    }
    async componentDidMount() {
        const result = await Geo.initGeo()
        this.setState({isGeoInit: true})
    }

    render () {
      return (
          <View style={{flex:1}}>
              { this.state.isGeoInit? <Nav></Nav>: null}
          </View>
      )
  }
}

export default App;
