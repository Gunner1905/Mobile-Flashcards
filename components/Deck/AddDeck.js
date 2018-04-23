import React, { Component } from 'react';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  View,
  Text,
  TextInput,
  StyleSheet
} from 'react-native';
import { saveDeckTitle } from '../../actions';
import { connect } from 'react-redux';
import ExclusiveButton from '../ExclusiveButton';
  
class AddDeck extends Component {
	  
  state = {
    deckTitle: undefined
  };

  submit = () => {
    const { deckTitle } = this.state;
    if (!deckTitle) {
	  Alert.alert(
	  'Warning!',
	  'You have to enter the Deck Title!',
	  [
	  {text: 'OK', onPress: () => console.log('OK Pressed')}
	  ])	        
    } else {
	  this.props
        .saveDeckTitle(deckTitle)
        .then(() => //navigating to DeckEntity 
          this.props.navigation.navigate('DeckEntity', { deckId: deckTitle })
        )
        .then( //after submit, let's make the title undefined
          this.setState({
            deckTitle: undefined
          })
        )
		.then(
		  Keyboard.dismiss() // To hide keyboard without tapping somewhere else, 
		 );
    }
  };

  render() {
    const { deckTitle } = this.state;
    return (
	  // I used KeyboardAvoidingView because otherwise the keyboard would overlap the text.
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <Text style={{ padding: 5, fontSize: 40, alignItems: 'center' }}>
          What is the title of your new deck?
        </Text>
        <TextInput
          ref="deckTitleInput"
          style={styles.input}
          placeholder="Deck Title"
          value={deckTitle}
          onChangeText={deckTitle =>
            this.setState({
              deckTitle
            })
          }
          onSubmitEditing={this.submit}
        />
        <ExclusiveButton style={{ marginTop: 20 }} onPress={this.submit}>
          Submit
        </ExclusiveButton>
      </KeyboardAvoidingView>
    );
  }
}
//defining our UI or CSS etc.
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30,
    marginRight: 30
  },
  input: {
    width: 300,
    padding: 5,
    fontSize: 20
  }
});

export default connect(null, {
  saveDeckTitle
})(AddDeck);
