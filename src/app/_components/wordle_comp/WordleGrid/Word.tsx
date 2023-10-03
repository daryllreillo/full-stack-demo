import Letter, { type CharStatusType } from '@/app/_components/wordle_comp/WordleGrid/Letter';

export interface WordInterface {
  chars?: string;
  charStatuses?: CharStatusType[];
}

const Word: React.FC<WordInterface> = ({ chars, charStatuses }) => {
  return (
    <div className="flex flex-row">
      <Letter letter={chars && chars[0] ? chars[0] : null} charStatus={charStatuses && charStatuses[0] ? charStatuses[0] : null} />
      <Letter letter={chars && chars[1] ? chars[1] : null} charStatus={charStatuses && charStatuses[1] ? charStatuses[1] : null} />
      <Letter letter={chars && chars[2] ? chars[2] : null} charStatus={charStatuses && charStatuses[2] ? charStatuses[2] : null} />
      <Letter letter={chars && chars[3] ? chars[3] : null} charStatus={charStatuses && charStatuses[3] ? charStatuses[3] : null} />
      <Letter letter={chars && chars[4] ? chars[4] : null} charStatus={charStatuses && charStatuses[4] ? charStatuses[4] : null} />
    </div>
  );
};

export default Word;
