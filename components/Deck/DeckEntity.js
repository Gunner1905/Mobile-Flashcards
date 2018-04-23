import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, Text } from 'react-native';
import ExclusiveButton from '../ExclusiveButton';

class DeckEntity extends Component {
  static navigationOptions = ({ navigation }) => {
    const { deckId } = navigation.state.params;
    return {
      title: deckId
    };
  };

  render() {
    const { deck } = this.props;
    return (
      <View style={styles.container}>
		<View style={{ alignItems: 'center' }}>
		  <Text style={{ color: 'black', fontSize: 25 }}>{deck.title}</Text>
		  <Text style={{ fontSize: 16, color: 'gray' }}>{deck.cards.length} cards</Text>
		</View>
        <ExclusiveButton
          outline
          style={{ marginTop: 20 }}
          onPress={() =>
            this.props.navigation.navigate('AddFlashCard', { deckId: deck.title })
          }
        >
          Add Card
        </ExclusiveButton>
        {deck.cards.length > 0 && (
          <ExclusiveButton
            style={{ marginTop: 20 }}
            onPress={() =>
              this.props.navigation.navigate('QuizEntity', { deckId: deck.title })
            }
          >
            Start Quiz
          </ExclusiveButton>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    paddingTop: 20,
    paddingBottom: 20,
    marginLeft: 30,
    marginRight: 30
  },
  item: {
    backgroundColor: 'white',
    borderRadius: 2,
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17,
    justifyContent: 'center',
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: {
      width: 0,
      height: 3
    }
  }
});

function mapStateToProps(decks, { navigation }) {
  const { deckId } = navigation.state.params;
  return {
    deck: decks[deckId]
  };
}

export default connect(mapStateToProps)(DeckEntity);
