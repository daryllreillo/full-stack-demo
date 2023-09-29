'use client';
import { createSlice, configureStore } from '@reduxjs/toolkit';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

import type { CharStatusType } from '@/app/_components/wordle_comp/Letter';

async function getWOTD() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_WORDLE_BACKEND}/word-of-the-day?random=1`);

  if (!res.ok) {
    console.log(res);
    throw new Error('Failed to fetch data from backend');
  }

  const data = await res.json();

  return data.word;
}

async function validateWord(arg: { word: string }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_WORDLE_BACKEND}/validate-word`, {
    method: 'POST',
    body: JSON.stringify(arg),
  });

  if (!res.ok) {
    console.log(res);
    throw new Error('Failed to verify word from backend');
  }

  return res.json();
}

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

export const initialWordleState: {
  currentWord: string;
  tryWords: string[];
  charStatusesArr: Array<CharStatusType[]>;
  isGameOver: boolean;
  isWon: boolean;
  wordOfTheDay: string;
} = {
  currentWord: '',
  tryWords: [],
  charStatusesArr: [[], [], [], [], [], []],
  isGameOver: false,
  isWon: false,
  wordOfTheDay: '',
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
      console.log(key);

      if (/^[a-zA-Z]$/.test(key)) {
        // if alphabet key, add to current word
        if (state.currentWord.length < 5) {
          state.currentWord += key as string;
        } else {
          state.currentWord = (state.currentWord.slice(0, 4) + key) as string;
        }
      } else if (key === 'Backspace') {
        // if backspace key, remove last character from current word
        console.log(state.currentWord);
        state.currentWord = state.currentWord.slice(0, state.currentWord.length - 1);
      } else if (key === 'Escape') {
        // if escape, remove all characters from current word
        state.currentWord = '';
      } else if (key === 'Enter') {
        // if enter, attempt to submit current word
        // validate the current word (insert thunk here later)
        const isValidWord = true;
        if (state.currentWord.length === 5 && isValidWord) {
          state.tryWords.push(state.currentWord);
        }

        let currentCharStatuses: CharStatusType[] = getCharStatuses(state.wordOfTheDay, state.currentWord);
        // set the charStatusesArr
        state.charStatusesArr[state.tryWords.length - 1] = currentCharStatuses;

        // update isGameOver and isWon if the currentWord matches wordOfTheDay
        if (state.wordOfTheDay === state.currentWord) {
          state.isGameOver = true;
          state.isWon = true;
        }
        state.currentWord = '';
      } else {
        // show error

        // then reset word after animation
        state.currentWord = '';
      }
    },
    setIsGameOver(state, action) {
      state.isGameOver = action.payload.isGameOver;
    },
    setIsWin(state, action) {
      state.isWon = action.payload.isWon;
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
