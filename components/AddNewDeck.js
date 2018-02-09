import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

//

class AddNewDeck extends React.Component{
  state = {
    value: ''
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

        <TouchableOpacity onPress={()=>console.log('add new deck')}>
          <Text>
            Submit
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
}

export default AddNewDeck;
