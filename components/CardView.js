import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

class CardView extends Component{
  state = {
    question: true
  }

  render(){
    const { card } = this.props;
    const { question } = this.state;
    const text = question ? card.question : card.answer;

    return (
      <View style={{flex: 1, alignItems:'center', justifyContent:'center'}}>
        <Text>{text}</Text>
        <TouchableOpacity onPress={() => this.setState((state)=>({...state, question: !state.question}))}>
          <Text>{question? 'Answer': 'Question'}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default CardView;
