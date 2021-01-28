import React, {Component} from "react";
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import {pxToDp} from "../../utils/stylesKits";

export default class Index extends Component {
    static defaultProps = {
        style:{},
        textStyle:{}
    }
    render() {
        return(
            // Within your render function
            <TouchableOpacity disabled={this.props.disable} onPress={this.props.onPress} style={{width:"100%", height:"100%", ...this.props.style }}>
                <LinearGradient start={{x: 0, y: 0}} end={{x:1, y:0}} colors={['#9b63cd', '#e0708c']} style={styles.linearGradient}>
                  <Text style={{...styles.buttonText, ...this.props.textStyle}}>
                      {this.props.children}
                  </Text>
                </LinearGradient>
            </TouchableOpacity>
        );
    }
}

// Later on in your styles..
var styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    paddingLeft: pxToDp(15),
    paddingRight: pxToDp(15),
      width:"100%" ,
      height: "100%",
      justifyContent:'center',
      alignItems: 'center'
  },
  buttonText: {
    fontSize: pxToDp(18),
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    color: '#fff',
    backgroundColor: 'transparent',
  },
});