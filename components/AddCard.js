import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

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

        <TouchableOpacity onPress={this.handleSubmit}>
          <Text>
            Submit
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
}

AddCard = connect(({decks})=> ({decks}))(AddCard);
export default AddCard;
