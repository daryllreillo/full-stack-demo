import { useDispatch } from 'react-redux';

import Key from '@/app/_components/wordle_comp/Keyboard/Key';
import { wordleActions } from '@/app/_components/context/wordleRedux';

const MiddleKeys: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <div className="flex flex-row">
      <Key keyPrint="A" onClick={() => dispatch(wordleActions.keyStroke({ key: 'a' }))} />
      <Key keyPrint="S" onClick={() => dispatch(wordleActions.keyStroke({ key: 's' }))} />
      <Key keyPrint="D" onClick={() => dispatch(wordleActions.keyStroke({ key: 'd' }))} />
      <Key keyPrint="F" onClick={() => dispatch(wordleActions.keyStroke({ key: 'f' }))} />
      <Key keyPrint="G" onClick={() => dispatch(wordleActions.keyStroke({ key: 'g' }))} />
      <Key keyPrint="H" onClick={() => dispatch(wordleActions.keyStroke({ key: 'h' }))} />
      <Key keyPrint="J" onClick={() => dispatch(wordleActions.keyStroke({ key: 'j' }))} />
      <Key keyPrint="K" onClick={() => dispatch(wordleActions.keyStroke({ key: 'k' }))} />
      <Key keyPrint="L" onClick={() => dispatch(wordleActions.keyStroke({ key: 'l' }))} />
      <Key keyPrint="Enter" onClick={() => dispatch(wordleActions.keyStroke({ key: 'Enter' }))} />
    </div>
  );
};

export default MiddleKeys;
