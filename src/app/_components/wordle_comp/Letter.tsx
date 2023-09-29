/*
    A wordle component that can display a letter
*/

export type CharStatusType = null | 'correct' | 'posWrong' | '';

export interface LetterInterface {
  letter?: string | null;
  charStatus?: CharStatusType;
}

const Letter: React.FC<LetterInterface> = ({ letter, charStatus }) => {
  return (
    <div
      className={
        'w-[3.3rem] h-[3.3rem] md:w-[4rem] md:h-[4rem] flex items-center justify-center m-[3px] relative ' +
        (charStatus ? (charStatus === 'correct' ? 'bg-green-500' : 'bg-yellow-600') : 'bg-gray-800')
      }
    >
      <span className="text-[2rem] absolute top-1 capitalize text-white font-bold md:text-[2.3rem]">{letter}</span>
    </div>
  );
};

export default Letter;
