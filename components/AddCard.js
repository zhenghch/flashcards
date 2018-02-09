import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

class AddCard extends Component{
  state = {
    question: '',
    answer: ''
  }

  render(){
    const { question, answer } = this.state;
    return(
      <View>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          value = {question}
          onChangeText={(value)=>this.setState({question: value})}
          />

        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          value = {answer}
          onChangeText={(value)=>this.setState({answer: value})}
          />

        <TouchableOpacity onPress={()=>console.log('add new card')}>
          <Text>
            Submit
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
}

export default AddCard;
