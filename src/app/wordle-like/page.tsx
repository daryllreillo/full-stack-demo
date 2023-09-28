/*
    path: /wordle-like
    This is a wordle clone
*/
'use client';
import { useState, useEffect, useRef, KeyboardEvent, Suspense, useMemo } from 'react';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

import Word from '@/app/_components/wordle_comp/Word';
import type { CharStatusType } from '@/app/_components/wordle_comp/Letter';
import GenericModalLoading from '@/app/_components/UI/Loading/GenericModalLoading';

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

let wordOfTheDay = '';

const WordleApp: React.FC = () => {
  const wordle_el = useRef<HTMLDivElement>(null);
  const [currentWord, setCurrentWord] = useState<string>('');
  const [tryWords, setTryWords] = useState<string[]>([]);
  const [charStatusesArr, setCharStatusesArr] = useState<Array<CharStatusType[]>>([[], [], [], [], [], []]);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [isWon, setIsWon] = useState<boolean>(false);
  const { data, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_WORDLE_BACKEND}/word-of-the-day?random=1`, getWOTD);
  const { trigger: postTrigger, isMutating: postIsMutating } = useSWRMutation(`${process.env.NEXT_PUBLIC_WORDLE_BACKEND}/validate-word`, validateWord);

  useEffect(() => {
    if (data && data?.word && wordOfTheDay === '') {
      wordOfTheDay = data.word;
    }
  }, [isLoading]);

  const keyHandler = (event: KeyboardEvent) => {
    gameLogic(event.key, wordOfTheDay);
  };

  async function gameLogic(char: string, wordOfTheDay: string) {
    if (tryWords.length < 6 && !isGameOver) {
      if (/^[a-zA-Z]$/.test(char)) {
        // check valid alphabet key
        if (currentWord.length < 5) {
          // check word length is less than 5,
          // then concatenate the character key to the word
          setCurrentWord(prevWord => prevWord + char);
        } else {
          // if word length is already 5, apply the character key only to  the 5th character
          setCurrentWord(prevWord => {
            return prevWord.slice(0, 4) + char;
          });
        }
      } else if (char === 'Backspace') {
        // remove last character if key is Backspace
        setCurrentWord(prevWord => {
          return prevWord.slice(0, prevWord.length - 1);
        });
      } else if (char === 'Escape') {
        // remove the whole current word if key is Escape
        setCurrentWord('');
      } else if (char === 'Enter') {
        // validate word if key is Enter

        // check if valid english word
        const isValidWord = (await postTrigger({ word: currentWord })).validWord;

        // Submit if word length is 5 and is a valid english word
        if (currentWord.length === 5 && isValidWord) {
          setTryWords(prevTryWords => {
            let stringArr = prevTryWords;
            stringArr.push(currentWord);
            return stringArr;
          });

          // load character statuses
          let currentCharStatuses: CharStatusType[] = getCharStatuses(wordOfTheDay, currentWord);

          //
          setCharStatusesArr(prevCharStatusesArr => {
            let newCharStatusesArr = prevCharStatusesArr;
            newCharStatusesArr[tryWords.length - 1] = currentCharStatuses;
            return newCharStatusesArr;
          });
          // set already won if current word matches the wotd
          if (wordOfTheDay === currentWord) {
            setIsGameOver(true);
            setIsWon(true);
          }
          // reset currentWord
          setCurrentWord('');
        } else {
          // show error and reset current word after animation
          setCurrentWord('');
        }
      }
    }
  }

  function getCharStatuses(wordOfTheDay: string, inputWord: string): CharStatusType[] {
    let output: CharStatusType[] = [];
    // if the word of the day or the input word does not follow the correct length, output blank array
    if (wordOfTheDay.length !== 5 || inputWord.length !== 5) return output;
    let wotdArr = wordOfTheDay.split('');
    let inputWordArr = inputWord.split('');
    // iterate for each five positions and check
    for (let i = 0; i < 5; i++) {
      console.log(wotdArr, inputWordArr, i);
      if (wotdArr[i] === inputWordArr[i]) {
        // if the letters are aligned, push 'correct' in output
        output.push('correct');
        wotdArr[i] = inputWordArr[i] = '@';
      } else {
        output.push(null);
      }
    }
    // second iteration to check wrong position
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

  useEffect(() => {
    if (tryWords.length === 6) {
      setIsGameOver(true);
    }
  }, [tryWords.length]);

  const resetGame = () => {
    setIsGameOver(false);
    setIsWon(false);
    location.reload();
  };

  return (
    <Suspense fallback={<GenericModalLoading />}>
      <div className="h-[93vh] min-h-[750px] w-[100%] bg-transparent outline-none selection:bg-none cursor-default" tabIndex={0} onKeyDownCapture={keyHandler}>
        <main className="flex flex-col justify-start items-center h-[93vh] min-h-[750px] w-[100%] bg-cust-image-mainpage bg-cust-size-mainpage animate-cust-animation-mainpage outline-none">
          <div id="wordle_app" className="flex flex-col mt-8 p-[3px] bg-black rounded-md" ref={wordle_el}>
            <Word chars={tryWords.length === 0 ? currentWord : tryWords[0]} charStatuses={charStatusesArr[0]} />
            <Word chars={tryWords.length === 1 ? currentWord : tryWords[1]} charStatuses={charStatusesArr[1]} />
            <Word chars={tryWords.length === 2 ? currentWord : tryWords[2]} charStatuses={charStatusesArr[2]} />
            <Word chars={tryWords.length === 3 ? currentWord : tryWords[3]} charStatuses={charStatusesArr[3]} />
            <Word chars={tryWords.length === 4 ? currentWord : tryWords[4]} charStatuses={charStatusesArr[4]} />
            <Word chars={tryWords.length === 5 ? currentWord : tryWords[5]} charStatuses={charStatusesArr[5]} />
          </div>
          <p className="text-xl my-2">{isGameOver ? isWon ? 'You won!' : `You Lost! The answer is ${wordOfTheDay.toUpperCase()}.` : <></>}</p>
          {isGameOver ? (
            <button onClick={resetGame} className="py-2 px-4">
              Reset
            </button>
          ) : (
            <></>
          )}
        </main>
      </div>
    </Suspense>
  );
};

export default WordleApp;
