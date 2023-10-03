import { useSelector } from 'react-redux';
import { RootState } from '@/app/_components/context/wordleRedux';

import Word from './Word';

const WordGrid: React.FC = () => {
  const wordleState = useSelector((state: RootState) => state.wordle);

  const grid = wordleState.charStatusesArr.map((charStatuses, index) => {
    return (
      <Word
        key={'wordLine' + index}
        chars={wordleState.tryWords.length === index ? wordleState.currentWord : wordleState.tryWords[index]}
        charStatuses={charStatuses}
      />
    );
  });

  return (
    <div id="wordle_app" className="flex flex-col p-[3px] bg-black rounded-md">
      {grid}
    </div>
  );
};

export default WordGrid;
