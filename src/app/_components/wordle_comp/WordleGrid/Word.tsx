'use client';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import Letter, { type CharStatusType } from '@/app/_components/wordle_comp/WordleGrid/Letter';
import { wordleActions, RootState } from '@/app/_components/context/wordleRedux';

export interface WordInterface {
  chars: string;
  charStatuses: CharStatusType[];
  animateClass: 'animate-flip-y' | 'animate-shake-x' | '';
}

const Word: React.FC<WordInterface> = ({ chars, charStatuses, animateClass }) => {
  const { currentWord } = useSelector((state: RootState) => state.wordle);
  console.log(currentWord, chars);
  const dispatch = useDispatch();

  const letterLine = charStatuses?.map((charStatus, index) => {
    return (
      <Letter
        key={'letter' + index}
        letter={chars && chars[index] ? chars[index] : ''}
        charStatus={charStatus ? charStatus : null}
        animateClass={index === chars?.length - 1 && chars[index] !== '' ? 'animate-pop' : ''}
      />
    );
  });

  useEffect(() => {
    if (animateClass !== '') {
      setTimeout(() => {
        dispatch(wordleActions.clearWordAnimation());
      }, 300);
    }
  }, [animateClass]);

  return <div className={'flex flex-row ' + animateClass}>{letterLine}</div>;
};

export default Word;
