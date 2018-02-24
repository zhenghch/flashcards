# flashcards

This app is project of Udacity's react-native course. One could use this simple app to create so-called 'decks' to manage same category of question/answer pairs (Q/A). Quizzes can be taken on each deck. Notification will be sent if no quiz was finished. 

## how to start
To get start:

* install all project dependencies with `yarn install`
* start the packager `yarn start` and start the app either by ios or Android simulator.

---
## description
The app contains following views: 
- Deck list view
- Individual deck view
- New Q/A view 
- Quiz view
- New deck view

### Deck list view
This view is default view when app init. It lists all existing decks with name of each deck and number of cards within it. 
- press each deck to navigate to individual deck view
- slide to the left to reveal delete button (by [eact-native-swipeable](https://github.com/jshanson7/react-native-swipeable))

### Individual deck view
In this view one could add Q/A to the deck and also quiz on it.

### New Q/A view
Form to add question and answer to current deck.

### Quiz view
Quiz on the deck. 
- When quiz is ongoing:
  - A reminder shows number of questions remaining on top-left 
  - For each Q/A pair, question is first shown. Press on question to display answer.
  - On the bottom, there're buttons to record your result.
- A score is displayed when all questions answered. With two buttons to 'restart quiz' or 'back to individual deck view'.

### New deck view
This view is used to add deck to the app. New deck should not have same name with existing decks.

---

## Test on platforms
- iPhone 7 using Simulator Version 10.0 on macOS 10.12.6
- iPhone 5s
