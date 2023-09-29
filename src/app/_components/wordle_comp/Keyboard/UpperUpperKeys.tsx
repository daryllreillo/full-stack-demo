import { useDispatch } from 'react-redux';

import Key from '@/app/_components/wordle_comp/Keyboard/Key';
import { wordleActions } from '@/app/_components/context/wordleRedux';

const UpperKeys: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <div className="flex flex-row justify-around w-[100%]">
      <Key keyPrint="Clear" onClick={() => dispatch(wordleActions.keyStroke({ key: 'Escape' }))} />
      <Key keyPrint="Enter" onClick={() => dispatch(wordleActions.keyStroke({ key: 'Enter' }))} />
      <Key keyPrint="Backspace" onClick={() => dispatch(wordleActions.keyStroke({ key: 'Backspace' }))} />
    </div>
  );
};

export default UpperKeys;
