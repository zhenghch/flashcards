import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import DeckOverview from './DeckOverview';

class DeckOp extends Component {
  render(){
    const { item } = this.props.navigation.state.params;

    return(
      <View style={{flex: 1}}>
        <DeckOverview item={item}/>

        <TouchableOpacity onPress={()=>this.props.navigation.navigate('AddCard')}>
          <Text>
            Add card
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>this.props.navigation.navigate('Quiz')}>
          <Text>
            Start Quiz
          </Text>
        </TouchableOpacity>

      </View>
    );
  }
};

export default DeckOp;
