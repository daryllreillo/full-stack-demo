import { useSelector } from 'react-redux';
import { RootState } from '@/app/_components/context/wordleRedux';

import Word from './Word';

const WordGrid: React.FC = () => {
  const { charStatusesArr, tryWords, currentWord, wordAnimation } = useSelector((state: RootState) => state.wordle);

  const wordGrid = charStatusesArr.map((charStatuses, index) => {
    return (
      <Word
        key={'wordLine' + index}
        chars={tryWords.length === index ? currentWord : tryWords[index]}
        charStatuses={charStatuses}
        animateClass={
          index === tryWords.length - 1 && wordAnimation === 'animate-flip-y'
            ? 'animate-flip-y'
            : index === tryWords.length && wordAnimation === 'animate-shake-x'
            ? 'animate-shake-x'
            : ''
        }
      />
    );
  });

  return (
    <div id="wordle_app" className="flex flex-col p-[3px] bg-black rounded-md">
      {wordGrid}
    </div>
  );
};

export default WordGrid;
