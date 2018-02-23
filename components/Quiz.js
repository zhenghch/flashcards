import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';

import CardView from '../components/CardView';
import { clearLocalNotification, setLocalNotification } from '../utils/helper';

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function precisionRound(number, precision) {
  var factor = Math.pow(10, precision);
  return Math.round(number * factor) / factor;
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
        <View style={styles.container}>
          <Text style={styles.header}>Quiz result: {precisionRound(correct/total*100, 1)}% ({correct}/{total})</Text>

          <TouchableOpacity
            style={{margin: 10, backgroundColor:'black', borderWidth:1, borderRadius:3, width:200, height:50, alignItems:'center', justifyContent:'center'}}
            onPress={()=>this.setState({index:0, correct:0, total:0})}>
            <Text style={{color:'white'}}>
              Restart Quiz
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{margin: 10, backgroundColor:'black', borderWidth:1, borderRadius:3, width:200, height:50, alignItems:'center', justifyContent:'center'}}
            onPress={() => this.props.navigation.dispatch(NavigationActions.back())}>
          <Text style={{color:'white'}}>Back to deck</Text>
        </TouchableOpacity>

        </View>
      );
    }

    const ansInd = getRandomInt(deck.questions.length);

    return (
      <View style={styles.container}>
        <Text style={styles.reminder}>{total} / {deck.questions.length} </Text>

        <CardView style={styles.cardview} card={deck.questions[index]}/>

        <View style={{flex: 2, justifyContent:'flex-start', alignItems: 'center'}}>
          <Text style={{margin:10, fontSize:20}}>T or F: {deck.questions[ansInd]['answer']}</Text>

          <View>
            <TouchableOpacity
              style={[styles.subBtn, {backgroundColor:'green'}]}
              onPress={()=>this.handleAnswer(ansInd, true)}>
              <Text style={styles.subText}>Correct</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.subBtn, {backgroundColor:'red'}]}
              onPress={()=>this.handleAnswer(ansInd, false)}>
              <Text style={styles.subText}>Incorrect</Text></TouchableOpacity>
          </View>
        </View>

      </View>
    );
  };
}

Quiz = connect(({decks})=>({decks}))(Quiz);
export default Quiz;

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  header: {
    fontSize:25,
    fontWeight: 'bold'
  },
  reminder:{
    margin: 10,
    alignSelf: 'flex-start',
    fontSize: 15,
    fontWeight: 'bold'
  },

  cardview: {
    flex: 2,
    borderWidth: 1,
    borderRadius: 3
  },

  subBtn:{
    margin: 5,
    backgroundColor:'black',
    borderWidth:1,
    borderRadius:3,
    width:200,
    height:30,
    alignItems:'center',
    justifyContent:'center'
  },
  subText:{
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
  }
});
