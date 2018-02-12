import { AsyncStorage } from 'react-native';

const FLASHCARDS_STORAGE_KEY = 'REACTND_FLASHCARDS:decks';

const DUMMY_DECKS = {
  React: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  }
};


// format deck result
async function formatDeckResults(results){
  if (results === null){  // init storage with predefined decks
    await AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(DUMMY_DECKS));
    return DUMMY_DECKS;
  }else{
    return JSON.parse(results);
  }
}

// api

// get all decks
export function getDecks() {
  return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
    .then(formatDeckResults);
}

// add deck
export function addDeck(title, deck){
  return AsyncStorage.mergeItem(FLASHCARDS_STORAGE_KEY, JSON.stringify({
    [title]: deck
  }));
}

// add card to existing deck
export function addCard(id, card){
  return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
    .then(formatDeckResults)
    .then((res) => {
      AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify({
        ...res,
        [id]: {
          ...res[id],
          questions: res[id]['questions'].concat(card)
        }
      }));
    });
}
