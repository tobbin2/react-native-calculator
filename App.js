/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  Platform, 
  StyleSheet, 
  Text, 
  View,
  TouchableOpacity,
  slice
} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component {
  state = {
    theText: "",
    calculationText: ""
  }

  numberPressed(text){
    
    if(text == '=')
      return this.calculate()


    this.setState({
      theText: this.state.theText + text
    })
  }

  operationPressed(text){


    if(text == "DEL")
      return this.delText()
    
    operationsVar = [" + ", " - ", " / ", " x "]
    for(let i = 0; i < 4; i++){
      if(this.state.theText.slice(-3) == operationsVar[i])
        return
    }

      

    
    this.setState({
      theText: this.state.theText + text
    })
  }

  calculate(){
    const text = this.state.theText
    this.setState({
      calculationText: eval(text)
    })
    
  }

  delText(){
    //operations needs to be deleted with space string.
    let spaceOrNot = 1
    if(this.state.theText.slice(0,-1) == " "){
      spaceOrNot += 1;
    }
    this.setState({
      theText: this.state.theText.slice(0,-1 * spaceOrNot )
    })
  }
  render() {
    let numbers = []
    let operations = []
    let operationsVar = ["DEL",' + ',' - ',' * ',' / ']
    let counter = [[9,8,7],[6,5,4], [3,2,1],[ '.' , 0 , '=']]

    for(let i = 0 ; i < 5; i++){
      operations.push(<TouchableOpacity onPress = { () => this.operationPressed(operationsVar[i])}><Text style = {CSS.operationText}>{operationsVar[i]}</Text></TouchableOpacity>)
    }
    for(let i = 0; i < 4; i++){
      let row = []
      for(let j = 0 ; j < 3; j++){
        row.push(<TouchableOpacity onPress = { () => this.numberPressed(counter[i][j]) }><Text style = {CSS.numberText}>{counter[i][j]}</Text></TouchableOpacity>)
      }
      numbers.push(<View style = {CSS.button} >{row}</View>)
    }



    return (
      <View style = {CSS.container}>
        <View style= {CSS.calculationBar}><Text style={CSS.calculationText}>{this.state.theText}</Text></View>
        <View style= {CSS.calculationBar}><Text style = {CSS.calculationText}>{this.state.calculationText}</Text></View>
        <View style= {CSS.buttons}>
          <View style= {CSS.numbersBar}>
            {numbers}
          </View>
          <View style = {CSS.operations}>
            <View style = {CSS.buttonOperation}>
              {operations}
            </View>
          </View>
        </View> 
      </View>
      
    );
  }
}

const CSS = StyleSheet.create({
  calculationBar: {
    flex: 1.5,
    justifyContent: 'center',
    alignItems: 'flex-end',
    backgroundColor: 'white'
  },
  numbersBar: {
    flex: 3,
    backgroundColor: 'grey'
  },
  operations: {
    flex: 1,
    backgroundColor: 'orange'
  },
  container: {
    flex: 1
  },
  buttons: {
    flex: 7,
    flexDirection: 'row',
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  calculationText: {
    fontSize: 45
  },
  buttonOperation: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  numberText: {
    fontSize: 30,
    color: 'white'
  },
  operationText: {
    fontSize: 30,
    flexDirection: 'column',
    color: 'black'
  }

});

