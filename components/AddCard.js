import React, { Component } from 'react';
import { KeyboardAvoidingView, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

import Actions from '../actions';
import * as CardsAPI from '../utils/api';

class AddCard extends Component{
  state = {
    question: '',
    answer: ''
  }

  handleSubmit = () => {
    const {decks} = this.props;
    const {deckId} = this.props.navigation.state.params;

    if (!(deckId in decks)){ // unknown deck
      return;
    }

    const question = this.state.question.trim();
    const answer = this.state.answer.trim();

    if (question === '' || answer === ''){
      alert('Question and answer should not be empty.');
      return;
    }

    const card = {question, answer};
    CardsAPI.addCard(deckId, card)
      .then(this.props.dispatch(Actions.addCard(deckId, card)));

    this.setState({
      question:'',
      answer: ''
    });

    // goback to deck
    this.props.navigation.dispatch(NavigationActions.back());
  }

  render(){
    const { question, answer } = this.state;
    return(
      <KeyboardAvoidingView style={{flex: 1, backgroundColor: 'white', alignItems:'center', justifyContent:'center'}}>
        <TextInput
          style={styles.textInput}
          autoGrow={true}
          multiline={true}
          placeholder={'input your question'}
          value = {question}
          onChangeText={(value)=>this.setState({question: value})}
          />

        <TextInput
          style={styles.textInput}
          autoGrow={true}
          multiline={true}
          placeholder={'input your answer'}
          value = {answer}
          onChangeText={(value)=>this.setState({answer: value})}
          />

        <TouchableOpacity style={styles.subBtn} onPress={this.handleSubmit}>
          <Text style={{fontSize:20, color:'white'}}>
            Submit
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  };
}

AddCard = connect(({decks})=> ({decks}))(AddCard);
export default AddCard;

const styles = StyleSheet.create({
  textInput: {
    margin:10,
    width:300,
    borderWidth: 1,
    borderRadius: 3,
    fontSize: 20
  },
  subBtn:{
    margin: 10,
    backgroundColor:'black',
    borderWidth:1,
    borderRadius:3,
    width:100,
    height:30,
    alignItems:'center',
    justifyContent:'center'
  }
});
