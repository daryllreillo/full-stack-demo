import { useDispatch } from 'react-redux';

import Key from '@/app/_components/wordle_comp/Keyboard/Key';
import { wordleActions } from '@/app/_components/context/wordleRedux';

const LowerKeys: React.FC = () => {
  const dispatch = useDispatch();
  
  return (
    <div className="flex flex-row">
      <Key keyPrint="Z" onClick={() => dispatch(wordleActions.keyStroke({ key: 'z' }))} />
      <Key keyPrint="X" onClick={() => dispatch(wordleActions.keyStroke({ key: 'x' }))} />
      <Key keyPrint="C" onClick={() => dispatch(wordleActions.keyStroke({ key: 'c' }))} />
      <Key keyPrint="V" onClick={() => dispatch(wordleActions.keyStroke({ key: 'v' }))} />
      <Key keyPrint="B" onClick={() => dispatch(wordleActions.keyStroke({ key: 'b' }))} />
      <Key keyPrint="N" onClick={() => dispatch(wordleActions.keyStroke({ key: 'n' }))} />
      <Key keyPrint="M" onClick={() => dispatch(wordleActions.keyStroke({ key: 'm' }))} />
    </div>
  );
};

export default LowerKeys;
