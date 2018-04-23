import React, { Component } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Text,
  TextInput,
  StyleSheet
} from 'react-native';
import { saveCardToDeck } from '../actions';
import { connect } from 'react-redux';
import ExclusiveButton from './ExclusiveButton';

class AddFlashCard extends Component {
  state = {
    question: undefined,
    answer: undefined
  };

  componentDidMount() {
    this.refs.questionInput.focus();
  }

  submit = () => {
    const { deck } = this.props;
    const { question, answer } = this.state;
    if (!question) {
	  Alert.alert(
	  'Warning!',
	  'You have to enter a question for the new card.',
	  [
		{text: 'OK', onPress: () => console.log('OK Pressed')}
	  ])
      return;
    }
    if (!answer) {
	  Alert.alert(
	  'Warning!',
	  'You have to enter an answer for the new card.',
	  [
		{text: 'OK', onPress: () => console.log('OK Pressed')}
	  ])
      return;
    }
    this.props
      .saveCardToDeck(deck.title, { question, answer })
      .then(() => this.props.navigation.goBack())
      .then(this.setState({ question: undefined, answer: undefined }));
  };

  render() {
    const { question, answer } = this.state;
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <TextInput
          ref="questionInput"
          style={styles.input}
          placeholder="Question"
          value={question}
          onChangeText={question => this.setState({ question })}
          onSubmitEditing={event => {
            this.refs.answerInput.focus();
          }}
        />
        <TextInput
          ref="answerInput"
          style={styles.input}
          placeholder="Answer"
          value={answer}
          onChangeText={answer => this.setState({ answer })}
        />
        <ExclusiveButton
          style={{
            marginTop: 20
          }}
          onPress={this.submit}
        >
          Submit
        </ExclusiveButton>
      </KeyboardAvoidingView>
    );
  }
}

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
    padding: 5
  }
});

function mapStateToProps(decks, { navigation }) {
  const { deckId } = navigation.state.params;
  return { deck: decks[deckId] };
}

export default connect(mapStateToProps, { saveCardToDeck })(AddFlashCard);
