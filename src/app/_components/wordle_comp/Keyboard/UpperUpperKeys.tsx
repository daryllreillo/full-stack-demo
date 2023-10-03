'use client';
import { useDispatch, useSelector } from 'react-redux';
import useSWRMutation from 'swr/mutation';

import Key from '@/app/_components/wordle_comp/Keyboard/Key';
import { wordleActions, RootState } from '@/app/_components/context/wordleRedux';

const UpperKeys: React.FC = () => {
  const dispatch = useDispatch();
  const wordleState = useSelector((state: RootState) => state.wordle);

  const { trigger: postTrigger, isMutating: postIsMutating } = useSWRMutation(`${process.env.NEXT_PUBLIC_WORDLE_BACKEND}/validate-word`, validateWord);

  const tryThisWordHandler = async () => {
    if (wordleState.currentWord.length >= 5) {
      const data = await postTrigger({ word: wordleState.currentWord });
      return dispatch(wordleActions.tryCurrentWord({ tryWord: data.word, isValid: data.validWord }));
    } else {
      return dispatch(wordleActions.clearCurrentWord());
    }
  };

  return (
    <div className="flex flex-row justify-around w-[100%]">
      <Key keyPrint="Clear" onClick={() => dispatch(wordleActions.keyStroke({ key: 'Escape' }))} />
      <Key keyPrint="Enter" onClick={tryThisWordHandler} />
      <Key keyPrint="Backspace" onClick={() => dispatch(wordleActions.keyStroke({ key: 'Backspace' }))} />
    </div>
  );
};

export default UpperKeys;

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
