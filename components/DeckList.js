import React, { Component } from 'react';
import { Text, View, TouchableOpacity, FlatList } from 'react-native';

import DeckOverview from './DeckOverview';

// static content
const DECK_STATIC = {
  udacicards: {title: 'udacicards', numCards: 13},
  'newDeck': {title: 'new deck', numCards: 0},
  'newDeck2': {title: 'new deck 2', numCards: 2}
};

//
class DeckList extends Component {
  renderItem = ({item}) => (
    <View>
      <TouchableOpacity
        onPress={() => this.props.navigation.navigate(
          'DeckOp',
          { item: item }
        )}>
        <DeckOverview item={item}/>
      </TouchableOpacity>
    </View>
  );

  render(){
    const decks = Object.keys(DECK_STATIC).map(key => ({...DECK_STATIC[key], key, id: key}));

    return (
      <View style={{flex: 1, justifyContent: 'space-between'}}>
        <FlatList
          data={decks}
          renderItem={this.renderItem}
          />
      </View>
    );
  }
}

export default DeckList;
