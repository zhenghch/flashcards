import React, { Component } from 'react';
import { Text, View, TouchableOpacity, FlatList } from 'react-native';
import { connect } from 'react-redux';

import CardView from '../components/CardView';
import { clearLocalNotification, setLocalNotification } from '../utils/helper';

import { AsyncStorage } from 'react-native';
import { NOTIFICATION_KEY } from '../utils/helper';

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}


class Quiz extends Component{
  state = {
    index: 0,
    correct: 0,
    total: 0
  }

  componentDidMount(){
    this.setState({index: 0, correct:0, incorrect: 0});
  }

  handleAnswer = (ansInd, type) => {
    const { index, correct, total } = this.state;

    if ((ansInd === index) === type){ // correct answer
      this.setState({
        correct: correct + 1,
        total: total + 1,
        index: index + 1
      });
    }else{
      this.setState({
        total: total + 1,
        index: index+1
      });
    }

    // finsh quiz
    const { deckId } = this.props.navigation.state.params;
    const deck = this.props.decks[deckId];
    if (deck.questions.length === index + 1){
      // clear notification
       clearLocalNotification()
              .then(setLocalNotification);
    }
  }

  render(){
    const { deckId } = this.props.navigation.state.params;
    const deck = this.props.decks[deckId];
    const {index, correct, total } = this.state;

    if (deck.questions.length <= index){ // finish quiz
      return (
        <View>
          <Text>{correct}/{total}</Text>
        </View>
      );
    }

    const ansInd = getRandomInt(deck.questions.length);

    return (
      <View style={{flex:1, justifyContent: 'space-between', alignItems: 'center'}}>
        <Text style={{alignSelf: 'flex-start'}}>{correct}/{total}, remain: {deck.questions.length-total}</Text>

        <CardView style={{flex:2}} card={deck.questions[index]}/>

        <View style={{flex: 2, justifyContent:'center', alignItems: 'center'}}>
          <Text style={{flex: 1}}>Correct/Incorrect: {deck.questions[ansInd]['answer']}</Text>

          <View style={{flex:2}}>
            <TouchableOpacity onPress={()=>this.handleAnswer(ansInd, true)}><Text>Correct</Text></TouchableOpacity>
            <TouchableOpacity onPress={()=>this.handleAnswer(ansInd, false)}><Text>Incorrect</Text></TouchableOpacity>
          </View>
        </View>

      </View>
    );
  };
}

Quiz = connect(({decks})=>({decks}))(Quiz);
export default Quiz;
