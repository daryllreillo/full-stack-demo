'use client';
import { createSlice, configureStore } from '@reduxjs/toolkit';

import type { CharStatusType } from '@/app/_components/wordle_comp/WordleGrid/Letter';

export const initialWordleState: {
  currentWord: string;
  tryWords: string[];
  charStatusesArr: Array<CharStatusType[]>;
  isGameOver: boolean;
  isWon: boolean;
  wordOfTheDay: string;
  wordAnimation: '' | 'animate-shake-x' | 'animate-flip-y';
  letterAnimation: '' | 'animate-pop';
} = {
  currentWord: '',
  tryWords: [],
  charStatusesArr: [
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
  ],
  isGameOver: false,
  isWon: false,
  wordOfTheDay: '',
  wordAnimation: '',
  letterAnimation: '',
};

const wordleSlice = createSlice({
  name: 'wordle',
  initialState: initialWordleState,
  reducers: {
    setWOTD(state, action) {
      state.wordOfTheDay = action.payload.wordOfTheDay;
    },
    keyStroke(state, action) {
      const { key } = action.payload;
      if (/^[a-zA-Z]$/.test(key) && !state.isGameOver) {
        // if alphabet key, add to current word
        if (state.currentWord.length < 5) {
          state.currentWord += key as string;
        } else {
          state.currentWord = (state.currentWord.slice(0, 4) + key) as string;
        }
        state.letterAnimation = 'animate-pop';
      } else if (key === 'Backspace') {
        // if backspace key, remove last character from current word
        state.currentWord = state.currentWord.slice(0, state.currentWord.length - 1);
      } else if (key === 'Escape') {
        // if escape, remove all characters from current word
        state.currentWord = '';
      }
    },
    setIsGameOver(state, action) {
      state.isGameOver = action.payload.isGameOver;
    },
    setIsWin(state, action) {
      state.isWon = action.payload.isWon;
    },
    clearCurrentWord(state) {
      state.currentWord = '';
    },
    pushCurrentWord(state) {
      state.tryWords.push(state.currentWord);
    },
    setCharStatuses(state) {
      let currentCharStatuses: CharStatusType[] = getCharStatuses(state.wordOfTheDay, state.currentWord);
      state.charStatusesArr[state.tryWords.length - 1] = currentCharStatuses;
    },
    tryCurrentWord(state, action) {
      const { tryWord, isValid } = action.payload;
      // will not accept repeating the last tryWord
      if (isValid && tryWord !== state.tryWords[state.tryWords.length - 1] && tryWord.length >= 5) {
        // CSS flip effect
        state.wordAnimation = 'animate-flip-y';
        // push word to state.tryWords
        state.tryWords.push(tryWord);
        // dispatch to set character statuses
        let currentCharStatuses: CharStatusType[] = getCharStatuses(state.wordOfTheDay, state.currentWord);
        state.charStatusesArr[state.tryWords.length - 1] = currentCharStatuses;
        // if word matches WOTD, dispatch to set GameOver and IsWin
        if (tryWord === state.wordOfTheDay) {
          state.isGameOver = true;
          state.isWon = true;
        }
        // clear current word
        // state.currentWord = '';
      } else {
        // CSS shake effect
        state.wordAnimation = 'animate-shake-x';
      }
    },
    clearWordAnimation(state) {
      state.wordAnimation = '';
    },
    shakeWord(state) {
      state.wordAnimation = 'animate-shake-x';
    },
  },
});

const store = configureStore({
  reducer: {
    wordle: wordleSlice.reducer,
  },
});

export const wordleActions = wordleSlice.actions;
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

function getCharStatuses(wordOfTheDay: string, inputWord: string): CharStatusType[] {
  let output: CharStatusType[] = [];
  // if the word of the day or the input word does not follow the correct length, output blank array
  if (wordOfTheDay.length !== 5 || inputWord.length !== 5) return output;
  let wotdArr = wordOfTheDay.split('');
  let inputWordArr = inputWord.split('');

  // first iteration for exact matches
  for (let i = 0; i < 5; i++) {
    if (wotdArr[i] === inputWordArr[i]) {
      // if the letters are aligned, push 'correct' in output
      output.push('correct');
      wotdArr[i] = inputWordArr[i] = '@';
    } else {
      output.push(null);
    }
  }

  // second iteration for wrong position check
  for (let i = 0; i < 5; i++) {
    if (wotdArr.includes(inputWordArr[i]) && inputWordArr[i] !== '@') {
      // if the letter is on the wrong position
      const index = wotdArr.findIndex(el => el === inputWordArr[i]);
      output[i] = 'posWrong';
      inputWordArr[i] = '@';
      wotdArr[index] = '@';
    }
  }

  return output;
}
