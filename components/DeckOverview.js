import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const DeckOverview = (props) => {
  const {title, numCards} = props.item;

  return (
    <View style={{justifyContent: 'center', alignItems:'center', borderWidth:1, borderColor:'gray'}}>
      <Text>{title}</Text>
      <Text>{numCards}</Text>
    </View>
  );
};

export default DeckOverview;
