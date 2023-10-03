/*
    A wordle component that can display a letter
*/
'use client';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { wordleActions, RootState } from '@/app/_components/context/wordleRedux';

export type CharStatusType = null | 'correct' | 'posWrong' | '';

export interface LetterInterface {
  letter: string;
  charStatus?: CharStatusType;
  animateClass: '' | 'animate-pop';
}

const Letter: React.FC<LetterInterface> = ({ letter, charStatus, animateClass }) => {
  const { currentWord, wordAnimation } = useSelector((state: RootState) => state.wordle);
  const [prevLetter] = useState(letter);

  return (
    <div
      className={
        'w-[3.3rem] h-[3.3rem] md:w-[4rem] md:h-[4rem] flex items-center justify-center m-[3px] relative  ' +
        animateClass +
        (charStatus ? (charStatus === 'correct' ? ' bg-green-700' : ' bg-yellow-600') : ' bg-gray-800')
      }
    >
      <span className={'text-[2rem] absolute top-1 capitalize font-bold md:text-[2.3rem] '}>{letter}</span>
    </div>
  );
};

export default Letter;
