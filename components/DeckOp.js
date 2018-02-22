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
      <View style={{flex: 1, justifyContent: 'space-around', alignItems:'center', backgroundColor: 'white'}}>
        <DeckOverview deckId={deckId}/>

        <View>
          <TouchableOpacity
            style={{margin: 10, backgroundColor:'white', borderWidth:1, borderRadius:3, width:200, height:50, alignItems:'center', justifyContent:'center'}}
            onPress={()=>this.props.navigation.navigate('AddCard', {deckId})}>
            <Text style={{color:'black'}}>
              Add card
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{margin: 10, backgroundColor:'black', borderWidth:1, borderRadius:3, width:200, height:50, alignItems:'center', justifyContent:'center'}}
            onPress={()=>this.props.navigation.navigate('Quiz', {deckId})}>
            <Text style={{color:'white'}}>
              Start Quiz
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
};

DeckOp = connect(({decks})=>({decks}))(DeckOp);
export default DeckOp;
