import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import DeckOverview from './DeckOverview';

class DeckOp extends Component {
  static navigationOptions = ( { navigation }) => {
    const { deckId } = navigation.state.params;

    return {
      title: deckId
    };
  }

  render(){
    const { deckId } = this.props.navigation.state.params;

    return(
      <View style={{flex: 1}}>
        <DeckOverview deckId={deckId}/>

        <TouchableOpacity onPress={()=>this.props.navigation.navigate('AddCard', {deckId})}>
          <Text>
            Add card
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>this.props.navigation.navigate('Quiz', {deckId})}>
          <Text>
            Start Quiz
          </Text>
        </TouchableOpacity>

      </View>
    );
  }
};

DeckOp = connect(({decks})=>({decks}))(DeckOp);
export default DeckOp;
