import React, { Component } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  FlatList
} from 'react-native';
import { connect } from 'react-redux';
import { fetchDecks } from '../../actions';
import ExclusiveButton from '../ExclusiveButton';

class DeckList extends Component {
  componentDidMount() {
    this.props.fetchDecks();
  }
  render() {
    const { decks } = this.props;
    return (
      <View style={styles.container}>
        {decks &&
          decks.length === 0 && (
            <View style={{alignItems: 'center'}}>
              <Text style={{ fontSize: 16, color: 'gray' }}>There is no deck yet.</Text>
              <ExclusiveButton
                style={{ marginTop: 20 }}
                onPress={() =>
                  this.props.navigation.navigate('AddDeck')
                }
              >
                Add Deck
              </ExclusiveButton>
            </View>
          )}
        {decks && (
          <FlatList
            data={decks}
            renderItem={({ item: deck, index }) => (
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('DeckEntity', {
                    deckId: deck.title
                  })
                }
              >
				<View style={{ alignItems: 'center' }}>
				  <Text style={{ color: 'black', fontSize: 25 }}>{deck.title}</Text>
				  <Text style={{ fontSize: 16, color: 'gray' }}>{deck.cards.length} cards</Text>
				</View>                
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={() => (
              <View
                style={{
                  marginBottom: 20,
                  marginTop: 20,
                  height: 1,
                  backgroundColor: 'gray'
                }}
              />
            )}
          />
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
  }
});

function mapStateToProps(decks) {
  return {
    decks: decks && Object.keys(decks).map(key => decks[key])
  };
}

export default connect(mapStateToProps, { fetchDecks })(DeckList);
