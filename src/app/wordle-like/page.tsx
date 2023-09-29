/*
    path: /wordle-like
    This is a wordle clone
*/
'use client';
import { useEffect, KeyboardEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

import Word from '@/app/_components/wordle_comp/Word';
import GenericModalLoading from '@/app/_components/UI/Loading/GenericModalLoading';
import UpperKeys from '@/app/_components/wordle_comp/Keyboard/UpperKeys';
import MiddleKeys from '@/app/_components/wordle_comp/Keyboard/MiddleKeys';
import LowerKeys from '@/app/_components/wordle_comp/Keyboard/LowerKeys';
import { wordleActions, RootState } from '@/app/_components/context/wordleRedux';

let wordOfTheDay = '';

const WordleApp: React.FC = () => {
  const dispatch = useDispatch();
  const wordleState = useSelector((state: RootState) => state.wordle);
  const { data, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_WORDLE_BACKEND}/word-of-the-day?random=1`, getWOTD);
  const { trigger: postTrigger, isMutating: postIsMutating } = useSWRMutation(`${process.env.NEXT_PUBLIC_WORDLE_BACKEND}/validate-word`, validateWord);

  const keyHandler = (event: KeyboardEvent) => {
    gameLogic(event.key);
  };

  async function gameLogic(char: string) {
    if (wordleState.tryWords.length < 6 && !wordleState.isGameOver) {
      dispatch(wordleActions.keyStroke({ key: char }));
    }
  }

  useEffect(() => {
    if (data && data?.word && wordOfTheDay === '') {
      dispatch(wordleActions.setWOTD({ wordOfTheDay: data.word }));
    }
  }, [data, isLoading]);

  useEffect(() => {
    if (wordleState.tryWords.length === 6) {
      // setIsGameOver(true);
      dispatch(wordleActions.setIsGameOver({ isGameOver: true }));
    }
  }, [wordleState.tryWords.length]);

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
      <div className="h-[93vh] min-h-[750px] w-[100%] bg-transparent outline-none selection:bg-none cursor-default" tabIndex={0} onKeyDownCapture={keyHandler}>
        <main className="flex flex-col justify-start items-center h-[93vh] min-h-[750px] w-[100%] bg-cust-image-mainpage bg-cust-size-mainpage animate-cust-animation-mainpage outline-none">
          <h2 className='mt-8 mb-1 text-5xl'>Wordle</h2>
          <div id="wordle_app" className="flex flex-col p-[3px] bg-black rounded-md">
            <Word chars={wordleState.tryWords.length === 0 ? wordleState.currentWord : wordleState.tryWords[0]} charStatuses={wordleState.charStatusesArr[0]} />
            <Word chars={wordleState.tryWords.length === 1 ? wordleState.currentWord : wordleState.tryWords[1]} charStatuses={wordleState.charStatusesArr[1]} />
            <Word chars={wordleState.tryWords.length === 2 ? wordleState.currentWord : wordleState.tryWords[2]} charStatuses={wordleState.charStatusesArr[2]} />
            <Word chars={wordleState.tryWords.length === 3 ? wordleState.currentWord : wordleState.tryWords[3]} charStatuses={wordleState.charStatusesArr[3]} />
            <Word chars={wordleState.tryWords.length === 4 ? wordleState.currentWord : wordleState.tryWords[4]} charStatuses={wordleState.charStatusesArr[4]} />
            <Word chars={wordleState.tryWords.length === 5 ? wordleState.currentWord : wordleState.tryWords[5]} charStatuses={wordleState.charStatusesArr[5]} />
          </div>
          <div className="min-h-[75px] flex flex-col items-center mb-3">
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
          <div className="mt-auto mb-12 flex flex-col items-center">
            <UpperKeys />
            <MiddleKeys />
            <LowerKeys />
          </div>
        </main>
      </div>
    </>
  );
};

export default WordleApp;

async function getWOTD(url: string) {
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
