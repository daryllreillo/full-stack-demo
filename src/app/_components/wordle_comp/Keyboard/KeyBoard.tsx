import UpperUpperKeys from './UpperUpperKeys';
import UpperKeys from './UpperKeys';
import MiddleKeys from './MiddleKeys';
import LowerKeys from './LowerKeys';

const KeyBoard: React.FC = () => {
  return (
    <div className="min-h-[30px] mt-3 mb-2 md:min-h-[75px] flex flex-col items-center md:mb-3">
      <UpperUpperKeys />
      <UpperKeys />
      <MiddleKeys />
      <LowerKeys />
    </div>
  );
};

export default KeyBoard;
