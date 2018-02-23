import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { connect } from 'react-redux';

import DeckOverview from './DeckOverview';

class DeckOp extends Component {
  static navigationOptions = ( { navigation }) => {
    const { deckId } = navigation.state.params;

    return {
      title: deckId
    };
  }

  state = {
    opacity: new Animated.Value(0),
    marginLeft: new Animated.Value(1000)
  }

  componentDidMount(){
    const { opacity, marginLeft } = this.state;

    Animated.timing(opacity, { toValue: 1, duration: 1000}).start();
    Animated.spring(marginLeft, { toValue: 0, friction: 4}).start();
  }

  render(){
    const { deckId } = this.props.navigation.state.params;
    const { opacity, marginLeft } = this.state;

    return(
      <Animated.View style={{ flex: 1, justifyContent: 'space-around', alignItems:'center', backgroundColor: 'white', opacity, marginLeft}}>
        <DeckOverview deckId={deckId}/>

        <View>
          <TouchableOpacity
            style={{margin: 10, backgroundColor:'white', borderWidth:1, borderRadius:3, width:200, height:50, alignItems:'center', justifyContent:'center'}}
            onPress={()=>this.props.navigation.navigate('AddCard', {deckId})}>
            <Text style={{color:'black'}}>
              Create New Question
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{margin: 10, backgroundColor:'black', borderWidth:1, borderRadius:3, width:200, height:50, alignItems:'center', justifyContent:'center'}}
            onPress={()=>this.props.navigation.navigate('Quiz', {deckId})}>
            <Text style={{color:'white'}}>
              Start a Quiz
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    );
  }
};

DeckOp = connect(({decks})=>({decks}))(DeckOp);
export default DeckOp;
