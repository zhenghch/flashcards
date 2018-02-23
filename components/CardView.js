import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

class CardView extends Component{
  state = {
    question: true
  }

  render(){
    const { card } = this.props;
    const { question } = this.state;
    const text = question ? card.question : card.answer;

    return (
        <TouchableOpacity
          style={styles.container}
          onPress={() => this.setState((state)=>({...state, question: !state.question}))}>

          <Text style={styles.header}>{text}</Text>
          <Text style={{margin:10, fontSize:20, color: 'red'}}>{question? 'Answer': 'Question'}</Text>

        </TouchableOpacity>
    );
  }
}

export default CardView;

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  header: {
    margin: 10,
    fontSize:25,
    fontWeight: 'bold'
  }
});
