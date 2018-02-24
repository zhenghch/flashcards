import React from 'react';
import { KeyboardAvoidingView, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

import Actions from '../actions';
import * as CardsAPI from '../utils/api';


/**
 * @description create new deck
 */
class AddDeck extends React.Component{
  state = {
    value: ''
  }


  handleSubmit = () => {
    const {decks} = this.props;
    const value = this.state.value.trim();

    // value check, whether empty or re-create exist deck
    if (value === ''){
      alert('Title should not be empty.');
      return;
    }

    if (value in decks){ // exist deck
      alert(`"${value}" already exists.`);
      return;
    }

    // create new deck
    const deck = {title: value, questions: []};

    CardsAPI.addDeck(value, deck)
      .then(this.props.dispatch(Actions.addDeck(value, deck)));

    this.setState({
      value: ''
    });

    // after submitted, back to deck list view
    this.props.navigation.dispatch(NavigationActions.back());
  }


  render(){
    return(
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <Text style={styles.header}>What is the title of your new deck ?</Text>
        <View style={{height:20}}/>
        <TextInput
          style={styles.textInput}
          value = {this.state.value}
          onChangeText={(value)=>this.setState({value})}
          />

        <TouchableOpacity style={styles.subBtn} onPress={this.handleSubmit}>
          <Text style={{color:'white'}}>
            Create Deck
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  };
}

AddDeck = connect(({decks}) => ({decks}))(AddDeck);
export default AddDeck;


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

  textInput: {
    margin:20,
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
