import React from 'react';
import { View, StatusBar, TouchableOpacity, FlatList, AsyncStorage } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Constants } from 'expo';
import { FontAwesome, Ionicons, Foundation } from '@expo/vector-icons';

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
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({tintColor}) => <FontAwesome name='home' size={30} color={tintColor}/>
    }
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: 'Add deck',
      tabBarIcon: ({tintColor}) => <Foundation name='folder-add' size={30} color={tintColor}/>
    }
  }
}, {
  tabBarOptions: {
    activeTintColor: 'green',
    style: {
      height: 56,
      backgroundColor: 'white',
      shadowColor: 'rgba(0,0,0,0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
});

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs,
    navigationOptions: {
      header: null
    }
  },
  DeckOp:{
    screen: DeckOp
  },
  AddCard: {
    screen: AddCard,
    navigationOptions:{
      title: 'Add card'
    }

  },
  Quiz: {
    screen: Quiz,
    navigationOptions:{
      title: 'Quiz'
    }
  }
}, {
  navigationOptions: {
    headerTintColor: 'white',
    headerStyle:{
      backgroundColor: 'black'
    }
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
          <MainNavigator style={{flex:1}}/>
        </View>
      </Provider>
    );
  }
}
