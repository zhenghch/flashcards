import React from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity, FlatList } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Constants } from 'expo';

import DeckList from './components/DeckList';
import AddNewDeck from './components/AddNewDeck';
import DeckOp from './components/DeckOp';
import AddCard from './components/AddCard';
import Quiz from './components/Quiz';

// from udacifitness
function UdaciStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
}

const Tabs = TabNavigator({
  DeckList: {
    screen: DeckList
  },
  AddNewDeck: {
    screen: AddNewDeck
  }
});

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs
  },
  DeckOp:{
    screen: DeckOp
  },
  AddCard: {
    screen: AddCard
  },
  Quiz: {
    screen: Quiz
  }
});

export default class App extends React.Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <UdaciStatusBar backgroundColor={'#292477'} barStyle="light-content" />
        <MainNavigator />
      </View>
    );
  }
}
