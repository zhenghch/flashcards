import React from 'react';
import { View, StatusBar, TouchableOpacity, FlatList, AsyncStorage } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Constants } from 'expo';

import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import * as reducers from './reducers';

import DeckList from './components/DeckList';
import AddDeck from './components/AddDeck';
import DeckOp from './components/DeckOp';
import AddCard from './components/AddCard';
import Quiz from './components/Quiz';

import { setLocalNotification } from './utils/helper';

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
    screen: AddDeck
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

const store = createStore(combineReducers(reducers), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default class App extends React.Component {
  componentDidMount(){
    setLocalNotification();
  }

  render() {
    return (
      <Provider store={store}>
        <View style={{flex: 1}}>
          <UdaciStatusBar backgroundColor={'#292477'} barStyle="light-content" />
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}
