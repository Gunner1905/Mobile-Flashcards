import * as api from '../utils/api';

export const ADD_DECK_TITLE = 'ADD_DECK_TITLE';
export const ADD_CARD_TO_DECK = 'ADD_CARD_TO_DECK';
export const RECEIVE_DECKS = 'RECEIVE_DECKS';
export const RECEIVE_NEW_DECK = 'RECEIVE_NEW_DECK';
export const RESET_DECKS = 'RESET_DECKS';

export function receiveDecks(decks) {
  return {
    type: RECEIVE_DECKS,
    decks
  };
}

export function receiveNewDeck(deck) {
  return {
    type: RECEIVE_NEW_DECK,
    deck
  };
}

export function fetchDecks() {
  return dispatch => (
    api.getDecks().then(
      (decks) => dispatch(receiveDecks(decks))
    )
  );
}

export function addDeckTitle(title) {
  return {
    type: ADD_DECK_TITLE,
    title
  };
}

export function saveDeckTitle(title) {
  return dispatch => (
    api.saveDeckTitle(title).then(
      () => dispatch(addDeckTitle(title))
    )
  );
}


export function addCardToDeck(title, card) {
  return {
    type: ADD_CARD_TO_DECK,
    title,
    card
  };
}

export function saveCardToDeck(title, card) {
  return dispatch => (
    api.addCardToDeck(title, card).then(
      () => dispatch(addCardToDeck(title, card))
    )
  );
}


export function resetDecks() {
  return {
    type: RESET_DECKS
  }
}

export function removeDecks() {
  return dispatch => (
    api.removeDecks().then(
      () => dispatch(resetDecks())
    )
  );
}