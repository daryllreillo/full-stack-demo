/*
    path: /random-wordle
    This is a wordle clone
*/
'use client';
import { useEffect, useRef, KeyboardEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

import GenericModalLoading from '@/app/_components/UI/Loading/GenericModalLoading';
import WordGrid from '@/app/_components/wordle_comp/WordleGrid/WordGrid';
import KeyBoard from '@/app/_components/wordle_comp/Keyboard/KeyBoard';
import { wordleActions, RootState } from '@/app/_components/context/wordleRedux';

let wordOfTheDay = '';

const WordleApp: React.FC = () => {
  const dispatch = useDispatch();
  const wordleState = useSelector((state: RootState) => state.wordle);
  const appRef = useRef<HTMLDivElement>(null);
  const { data, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_WORDLE_BACKEND}/word-of-the-day?random=1`, getWord);
  const { trigger: postTrigger, isMutating: postIsMutating } = useSWRMutation(`${process.env.NEXT_PUBLIC_WORDLE_BACKEND}/validate-word`, validateWord);

  const keyHandler = (event: KeyboardEvent) => {
    gameLogic(event.key);
  };

  async function gameLogic(key: string) {
    if (wordleState.tryWords.length < 6 && !wordleState.isGameOver) {
      if (key !== 'Enter') {
        dispatch(wordleActions.keyStroke({ key }));
      } else {
        if (wordleState.currentWord.length >= 5) {
          const data = await postTrigger({ word: wordleState.currentWord });
          dispatch(wordleActions.tryCurrentWord({ tryWord: data.word, isValid: data.validWord }));
        }
      }
    }
  }

  useEffect(() => {
    // once the word is retrieved, set the word on state and focus on the app element
    if (data && data?.word && wordOfTheDay === '') {
      wordOfTheDay = data.word;
      dispatch(wordleActions.setWOTD({ wordOfTheDay: data.word }));
      appRef.current!.focus();
    }
  }, [data, isLoading, dispatch]);

  useEffect(() => {
    if (wordleState.tryWords.length === 6) {
      // setIsGameOver(true);
      dispatch(wordleActions.setIsGameOver({ isGameOver: true }));
    }
  }, [wordleState.tryWords.length, dispatch]);

  const resetGame = () => {
    // setIsGameOver(false);
    dispatch(wordleActions.setIsGameOver({ isGameOver: false }));
    // setIsWon(false);
    dispatch(wordleActions.setIsWin({ isWon: false }));
    location.reload();
  };

  return (
    <>
      {isLoading ? <GenericModalLoading /> : <></>}
      <main
        className="h-[100dvh] min-h-[890px] w-[100%] bg-transparent outline-none selection:bg-none cursor-default flex flex-col justify-start items-center bg-cust-image-mainpage bg-cust-size-mainpage animate-cust-animation-mainpage text-white"
        tabIndex={0}
        onKeyDownCapture={keyHandler}
        ref={appRef}
      >
        <h2 className="text-4xl mt-4 md:text-5xl font-semibold">Wordle</h2>
        <p className="mb-1">(random word edition)</p>
        <WordGrid />
        <KeyBoard />
        <div className="mt-1 flex flex-col items-center">
          <p className="text-xl my-2">
            {wordleState.isGameOver ? wordleState.isWon ? 'You won!' : `You Lost! The answer is ${wordleState.wordOfTheDay.toUpperCase()}.` : <></>}
          </p>
          {wordleState.isGameOver ? (
            <button onClick={resetGame} className="py-2 px-4">
              Reset
            </button>
          ) : (
            <></>
          )}
        </div>
      </main>
    </>
  );
};

export default WordleApp;

async function getWord(url: string) {
  const res = await fetch(url);

  if (!res.ok) {
    console.log(res);
    throw new Error('Failed to fetch data from backend');
  }

  return res.json();
}

async function validateWord(url: string, { arg }: { arg: { word: string } }) {
  const res = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(arg),
  });

  if (!res.ok) {
    console.log(res);
    throw new Error('Failed to verify word from backend');
  }

  return res.json();
}
