import React, { Component } from 'react';
import { Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

import { connect } from 'react-redux';

import Swipeable from 'react-native-swipeable';

import DeckOverview from './DeckOverview';
import Actions from '../actions';
import * as CardsAPI from '../utils/api';

/**
 * @description del button
 */
const delButton = (onPress) => {
  return(
    <TouchableOpacity
      style={styles.delete}
      onPress={() => onPress()} >
      <Text style={{color: 'black'}}>Delete</Text>
    </TouchableOpacity>
    );
};

/**
 * @description wrap flat list item to be Swipeable
 */
class ListItem extends Component{
  state = {
    currentlyOpenSwipeable: null
  };

  // from 'react-native-swipeable' example
  onOpen = (event, gestureState, swipeable) => {
    const {currentlyOpenSwipeable} = this.state;
    if (currentlyOpenSwipeable && currentlyOpenSwipeable !== swipeable) {
      currentlyOpenSwipeable.recenter();
    }

    this.setState({currentlyOpenSwipeable: swipeable});
  }
  onClose = () => this.setState({currentlyOpenSwipeable: null})

  //
  render(){
    const child = this.props.child || null;

    return (
      <Swipeable rightButtons={[delButton(this.props.onDelete)]}
                 onRightButtonsOpenRelease={this.onOpen}
                 onRightButtonsCloseRelease={this.onClose}>
        {child}
      </Swipeable>
    );
  }
}


/**
 * @description component to list all decks, each link to a deck
 */
class DeckList extends Component {
  componentDidMount(){
    CardsAPI.getDecks().then(dat=> this.props.dispatch(Actions.setDecks(dat)));
  }

  // del deck
  onDelete = (id) => {
    CardsAPI.delDeck(id).then(this.props.dispatch(Actions.delDeck(id)));
  }


  // render each deck, wrap with swipeable
  renderItem = ({item}) => {
    return (
      <ListItem child={
                  <TouchableOpacity
                    style={styles.deck}
                    onPress={() => this.props.navigation.navigate('DeckOp',{ deckId: item.key })}>

                    <DeckOverview deckId={item.key}/>

                  </TouchableOpacity>
                }
                onDelete={() => this.onDelete(item.key)}>
      </ListItem>
    );
  }

  render(){
    const {decks} = this.props;
    const deckList = Object.keys(decks).sort().map(key => ({...decks[key], key}));

    return (
        <FlatList
          data={deckList}
          renderItem={this.renderItem}
          />
    );
  }
}
export default connect(({decks}) => ({decks}))(DeckList);


const styles = StyleSheet.create({
  deck:{
    borderWidth:0.5,
    borderColor: 'rgb(200,200,200)',
    marginLeft:1
  },

  delete:{
    flex: 1,
    backgroundColor: 'red',
    justifyContent: 'center',
    paddingLeft: 20
  }
});
