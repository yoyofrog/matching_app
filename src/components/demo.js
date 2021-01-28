import React, { Component} from 'react';
import { Text, StyleSheet} from 'react-native';

import {
  CodeField,
  Cursor,
} from 'react-native-confirmation-code-field';

const styles = StyleSheet.create({
  root: {flex: 1, padding: 20},
  title: {textAlign: 'center', fontSize: 30},
  codeFieldRoot: {marginTop: 20},
  cell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 24,
    borderBottomWidth: 2,
    borderColor: '#7d53ea',
    textAlign: 'center',
      color:'#7d53ea'
  },
  focusCell: {
    borderColor: '#7d53ea',
  },
});


class App extends Component {
    state= {
        vCodeTxt:''
    }
    vCodeChange=(vCodeTxt)=> {
        this.setState({vCodeTxt})
    }
 render() {
     return (
             <CodeField
                 value={this.state.vCodeTxt}
                 onChangeText={this.vCodeChange}
                 cellCount={6}
                 rootStyle={styles.codeFieldRoot}
                 keyboardType="number-pad"
                 renderCell={({index, symbol, isFocused}) => (
                     <Text
                         key={index}
                         style={[styles.cell, isFocused && styles.focusCell]}
                         >
                         {symbol || (isFocused ? <Cursor /> : null)}
                     </Text>
                 )}
             />
     );
 }
};

export default App;