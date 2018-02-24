// init decks
const SET_DECKS = 'SET_DECKS';
const setDecks = (decks) => ({
  type: SET_DECKS,
  decks
});

// add deck
const ADD_DECK = 'ADD_DECK';
const addDeck = (title, deck) => ({
  type: ADD_DECK,
  title,
  deck
});

// del deck
const DEL_DECK = 'DEL_DECK';
const delDeck = (title) => ({
  type: DEL_DECK,
  title
});

// add card
const ADD_CARD = 'ADD_CARD';
const addCard = (id, card) => ({
  type: ADD_CARD,
  id,
  card
});

export default {
  SET_DECKS,
  setDecks,

  ADD_DECK,
  addDeck,

  DEL_DECK,
  delDeck,

  ADD_CARD,
  addCard
};
