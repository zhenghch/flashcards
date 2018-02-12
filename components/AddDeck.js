import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import Actions from '../actions';
import * as CardsAPI from '../utils/api';

//

class AddDeck extends React.Component{
  state = {
    value: ''
  }

  handleSubmit = () => {
    const {decks} = this.props;
    const value = this.state.value.trim();

    if (value === ''){
      alert('Title should not be empty.');
      return;
    }

    if (value in decks){ // exist deck
      alert(`"${value}" already exists.`);
      return;
    }

    const deck = {title: value, questions: []};

    CardsAPI.addDeck(value, deck)
      .then(this.props.dispatch(Actions.addDeck(value, deck)));

    this.setState({
      value: ''
    });
  }


  render(){
    return(
      <View>
        <Text>What is the title of your new deck ?</Text>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          value = {this.state.value}
          onChangeText={(value)=>this.setState({value})}
          />

        <TouchableOpacity onPress={this.handleSubmit}>
          <Text>
            Submit
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
}

AddDeck = connect(({decks}) => ({decks}))(AddDeck);
export default AddDeck;
