import React, { Component } from 'react';
import { Text, View, TouchableOpacity, FlatList } from 'react-native';

import { connect } from 'react-redux';

import Actions from '../actions';
import DeckOverview from './DeckOverview';
import * as CardsAPI from '../utils/api';
import { NOTIFICATION_KEY } from '../utils/helper';
//
class DeckList extends Component {
  componentDidMount(){
    CardsAPI.getDecks().then(dat=> this.props.dispatch(Actions.setDecks(dat)));
  }

  renderItem = ({item}) => {
    return (
      <View >
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate(
            'DeckOp',
            { deckId: item.key }
          )}>
          <DeckOverview deckId={item.key}/>
        </TouchableOpacity>
      </View>
    );
  }

  render(){
    const {decks} = this.props;
    const deckList = Object.keys(decks).sort().map(key => ({...decks[key], key}));

    return (
      <View style={{flex:1}}>
        <FlatList
          data={deckList}
          renderItem={this.renderItem}
          contentContainerStyle={{flex: 1, justifyContent: 'flex-start'}}
          />
      </View>
    );
  }
}

export default connect(({decks}) => ({decks}))(DeckList);
