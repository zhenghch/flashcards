import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

const DeckOverview = (props) => {
  const { deckId, decks } = props;
  const deck = decks[deckId];

  return (
    <View style={{justifyContent: 'center', alignItems:'center',  height:100}}>
      <Text>{deck.title}</Text>
      <Text>{`${deck.questions.length} cards`}</Text>
    </View>
  );
};

DeckOverview = connect(({decks}) => ({decks}))(DeckOverview);
export default DeckOverview;
