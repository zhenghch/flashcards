import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';

import CardView from '../components/CardView';
import { clearLocalNotification, setLocalNotification } from '../utils/helper';

// round score to given precision
function precisionRound(number, precision) {
  var factor = Math.pow(10, precision);
  return Math.round(number * factor) / factor;
}

/**
 * @description quiz view
 */
class Quiz extends Component{
  state = {
    index: 0,
    correct: 0
  }

  componentDidMount(){
    this.setState({index: 0, correct:0});
  }

  handleAnswer = (type) => {
    const { index, correct} = this.state;

    if (type){ // correct answer
      this.setState({
        correct: correct + 1,
        index: index + 1
      });
    }else{
      this.setState({
        index: index+1
      });
    }

    // clear notification if at least one quiz finished
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
    const {index, correct } = this.state;
    const total = deck.questions.length;

    if (total <= index){ // finish quiz
      return (
        <View style={[styles.container, {justifyContent: 'center'}]}>
          <Text style={styles.header}>Quiz result: {precisionRound(correct/total*100, 1)}% ({correct}/{total})</Text>

          <View style={{height:30}}/>

          <TouchableOpacity
            style={styles.btn}
            onPress={()=>this.setState({index:0, correct:0})}>
            <Text style={{color:'white'}}>
              Restart Quiz
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btn}
            onPress={() => this.props.navigation.dispatch(NavigationActions.back())}>
            <Text style={{color:'white'}}>
              Back to deck
            </Text>
        </TouchableOpacity>

        </View>
      );
    }

    return (
      <View style={styles.container}>
        <View style={{alignSelf: 'flex-start', margin: 10}}>
          <Text style={styles.reminder}>{index} / {total} </Text>
        </View>

        <View style={{height:30}}/>

        <CardView style={styles.cardview} card={deck.questions[index]}/>

        <TouchableOpacity
          style={[styles.btn, {backgroundColor:'green'}]}
          onPress={()=>this.handleAnswer(true)}>
          <Text style={styles.subText}>Correct</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.btn, {backgroundColor:'red'}]}
          onPress={()=>this.handleAnswer(false)}>
          <Text style={styles.subText}>Incorrect</Text></TouchableOpacity>
      </View>
    );
  };
}

Quiz = connect(({decks})=>({decks}))(Quiz);
export default Quiz;

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  header: {
    margin: 10,
    fontSize: 20,
    fontWeight: 'bold'
  },
  reminder:{
    fontSize: 20,
    fontWeight: 'bold'
  },

  cardview: {
    flex: 2,
    borderWidth: 1,
    borderRadius: 3,
    margin: 10
  },

  btn:{
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
