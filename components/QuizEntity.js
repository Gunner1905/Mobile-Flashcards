import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import ExclusiveButton from './ExclusiveButton';
import { clearLocalNotification, setLocalNotification } from '../utils/helpers';

class QuizEntity extends Component {
  state = {
    cardId: 0,
    showAnswer: false,
    score: 0
  };

  componentDidUpdate(prevProps, prevState) {
    const { cardId } = this.state; 
	const { cards } = this.props;    
    const isFinished = cardId === cards.length; //if card id reachs out to the 'last card id+1' (because index starts from zero)
    const wasFinishedPreviously = prevState.cardId === cards.length;
    if (isFinished && !wasFinishedPreviously) {
      clearLocalNotification().then(setLocalNotification);
    }
  }

  followingQuestion = (correct = false) => {
    const { cards } = this.props;
    this.setState(prevState => ({
      cardId: prevState.cardId + 1,
      showAnswer: false,
      score: correct ? prevState.score + 1 : prevState.score
    }));
  };

  restart = () => {
    this.setState({
      cardId: 0,
      showAnswer: false,
      score: 0
    });
  };

  render() {
    const { cards } = this.props;
    const { cardId, showAnswer, score } = this.state;
    const isFinished = cardId === cards.length; // again, if card id reachs out to the 'last card id+1' (because index starts from zero)
    return (
      <View style={styles.container}>
        {!isFinished && (
          <View style={{ flex: 1, justifyContent: 'space-between' }}>
            <View>
              <Text>{`${cardId + 1}/${cards.length}`}</Text>
              <Text style={styles.question}>{cards[cardId].question}</Text>
              {!showAnswer && (                
				<TouchableOpacity   
				  onPress={() =>
                    this.setState({
                      showAnswer: true
                    })
                  }
				>
				<Text style={[
					styles.answerShowingText
				]}>
					Answer 
				</Text>
				</TouchableOpacity>
              )}
            </View>
            {showAnswer && (
              <View style={{ flex: 1, justifyContent: 'space-between' }}>
                <View>
                  <Text style={{ color: 'purple' }}>Answer</Text>
                  <Text style={styles.question}>{cards[cardId].answer}</Text>
                </View>
                <View style={{ paddingBottom: 30 }}>
                  <ExclusiveButton
                    style={{ marginTop: 20, backgroundColor: 'green' }}
                    onPress={() => this.followingQuestion(true)}
                  >
                    Correct
                  </ExclusiveButton>
                  <ExclusiveButton
                    style={{ marginTop: 20, backgroundColor: 'red' }}
                    onPress={() => this.followingQuestion(false)}
                  >
                    Incorrect
                  </ExclusiveButton>
                </View>
              </View>
            )}
          </View>
        )}
        {isFinished && (
          <View>
            <Text style={{ color: 'purple' }}>Final Score</Text>
            <View style={styles.finalScoreContainer}>
              <Text style={{ fontSize: 50, color: 'purple' }}>
                {`${score}/${cards.length}`}
              </Text>
              <Text style={{ fontSize: 20, color: 'purple' }}>
                ({`${Math.round(100 * score / cards.length)}%`})
              </Text>
              {score === cards.length && (
                <Text style={{ fontSize: 30, color: 'purple' }}>Perfect! You answered all the questions correctly!</Text>
              )}
			  {score === 0 && (
				<Text style={{ fontSize: 30, color: 'red' }}> Shocking! You haven't answered any question correctly! Snap out of it!</Text>
			  )}
            </View>
            <View style={{ paddingBottom: 30 }}>
              <ExclusiveButton
                outline
                style={{ marginTop: 20 }}
                onPress={() => this.props.navigation.goBack()}
              >
                Go Back to Deck
              </ExclusiveButton>
              <ExclusiveButton
                style={{ marginTop: 20 }}
                onPress={() => this.restart()}
              >
                Restart Quiz
              </ExclusiveButton>
            </View>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'stretch',
    paddingTop: 20,
    paddingBottom: 20,
    marginLeft: 30,
    marginRight: 30
  },
  question: {
    padding: 5,
    marginBottom: 30,
    fontSize: 25,
    textAlign: 'center'
  },
  finalScoreContainer: {
    padding: 30,
    alignItems: 'center'
  },
  answerShowingText: {
	color: 'green',
    fontSize: 22,
    textAlign: 'center'
  }
});

function mapStateToProps(decks, { navigation }) {
  const { deckId } = navigation.state.params;
  return {
    cards: decks[deckId].cards
  };
}

export default connect(mapStateToProps)(QuizEntity);
