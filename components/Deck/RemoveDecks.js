import React, { Component } from 'react';
import { removeDecks } from '../../actions';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

class RemoveDecks extends Component {
  state = {
    done: false
  };

  removeDecks = () => {
    this.props.removeDecks().then(
      this.setState({
        done: true
      })
    );
  };

  render() {
    return (
      <View>
        {this.state.done && <Text>Decks Removed!</Text>}
        <TouchableOpacity
          style={[styles.AndroidSubmitBtn, { marginTop: 20 }]}
          onPress={this.removeDecks}
        >
          <Text style={styles.submitBtnText}>Remove Decks</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  AndroidSubmitBtn: {
    backgroundColor: 'black',
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
  submitBtnText: {
    color: 'white',
    fontSize: 22,
    textAlign: 'center'
  }
});

export default connect(null, {
  removeDecks
})(RemoveDecks);
