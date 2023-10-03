import Key from '@/app/_components/wordle_comp/Keyboard/Key';

const LowerKeys: React.FC = () => {
  return (
    <div className="flex flex-row">
      <Key keyPrint="Z" />
      <Key keyPrint="X" />
      <Key keyPrint="C" />
      <Key keyPrint="V" />
      <Key keyPrint="B" />
      <Key keyPrint="N" />
      <Key keyPrint="M" />
    </div>
  );
};

export default LowerKeys;
