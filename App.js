import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Constants } from 'expo';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import AddDeck from './components/Deck/AddDeck';
import DeckList from './components/Deck/DeckList';
import DeckEntity from './components/Deck/DeckEntity';
import AddFlashCard from './components/AddFlashCard';
import QuizEntity from './components/QuizEntity';
import reducer from './reducers';
import { setLocalNotification } from './utils/helpers';

const Tabs = TabNavigator(
  {
    DeckList: {
      screen: DeckList,
      navigationOptions: {
        tabBarLabel: 'DeckList'
      }
    },
    AddDeck: {
      screen: AddDeck,
      navigationOptions: {
        tabBarLabel: 'Add Deck'
      }
    },
    RemoveDecks: {  //This is not in the specifications, but it is very handy for the integrity of this application :)
      screen: RemoveDecks,
      navigationOptions: {
        tabBarLabel: 'Remove Decks'
      }
    }
	  
  },
  {
    navigationOptions: {
      header: null
    },
    tabBarOptions: {
      activeTintColor: 'white',
      style: {
        height: 56,
        backgroundColor: 'black',
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowRadius: 6,
        shadowOpacity: 1
      }
    }
  }
);

const MainNavigator = StackNavigator(
  {
    Home: {
      screen: Tabs
    },
    DeckEntity: {
      screen: DeckEntity
    },
    AddFlashCard: {
      screen: AddFlashCard,
      navigationOptions: {
        title: 'Add Card'
      }
    },
    QuizEntity: {
      screen: QuizEntity,
      navigationOptions: {
        title: 'Quiz'
      }
    }
  },
  {
    navigationOptions: {
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: 'black'
      }
    }
  }
);

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification();
  }

  render() {
    return (
      <Provider store={createStore(reducer, applyMiddleware(thunkMiddleware))}>
        <View style={{ flex: 1 }}>
		  <View style={{ backgroundColor: 'black', height: Constants.statusBarHeight }}>
			<StatusBar translucent backgroundColor="black" barStyle="light-content" />
		  </View>
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}
