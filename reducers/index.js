import Actions from '../actions';

function decks(state={}, action){
  switch(action.type){
  case Actions.SET_DECKS:
    return action.decks;
  case Actions.ADD_DECK:
    return {
      ...state,
      [action.title]: action.deck
    };
  case Actions.DEL_DECK:
    return Object.keys(state)
                 .filter(key => key !== action.title)
                 .reduce((res, key) => ({...res, [key]: state[key]}), {});

  case Actions.ADD_CARD:
    return {
      ...state,
      [action.id]: {
        ...state[action.id],
        questions: state[action.id]['questions'].concat(action.card)
      }
    };
  default:
    return state;
  }
}

export { decks };

