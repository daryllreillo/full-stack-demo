import { useDispatch } from 'react-redux';

import Key from '@/app/_components/wordle_comp/Keyboard/Key';
import { wordleActions } from '@/app/_components/context/wordleRedux';

const UpperKeys: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <div className="flex flex-row">
      <Key keyPrint="Esc" onClick={() => dispatch(wordleActions.keyStroke({ key: 'Escape' }))} />
      <Key keyPrint="Q" onClick={() => dispatch(wordleActions.keyStroke({ key: 'q' }))} />
      <Key keyPrint="W" onClick={() => dispatch(wordleActions.keyStroke({ key: 'w' }))} />
      <Key keyPrint="E" onClick={() => dispatch(wordleActions.keyStroke({ key: 'e' }))} />
      <Key keyPrint="R" onClick={() => dispatch(wordleActions.keyStroke({ key: 'r' }))} />
      <Key keyPrint="T" onClick={() => dispatch(wordleActions.keyStroke({ key: 't' }))} />
      <Key keyPrint="Y" onClick={() => dispatch(wordleActions.keyStroke({ key: 'y' }))} />
      <Key keyPrint="U" onClick={() => dispatch(wordleActions.keyStroke({ key: 'u' }))} />
      <Key keyPrint="I" onClick={() => dispatch(wordleActions.keyStroke({ key: 'i' }))} />
      <Key keyPrint="O" onClick={() => dispatch(wordleActions.keyStroke({ key: 'o' }))} />
      <Key keyPrint="P" onClick={() => dispatch(wordleActions.keyStroke({ key: 'p' }))} />
      <Key keyPrint="Backspace" onClick={() => dispatch(wordleActions.keyStroke({ key: 'Backspace' }))} />
    </div>
  );
};

export default UpperKeys;
