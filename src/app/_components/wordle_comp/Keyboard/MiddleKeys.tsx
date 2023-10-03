import Key from '@/app/_components/wordle_comp/Keyboard/Key';

const MiddleKeys: React.FC = () => {
  return (
    <div className="flex flex-row">
      <Key keyPrint="A" />
      <Key keyPrint="S" />
      <Key keyPrint="D" />
      <Key keyPrint="F" />
      <Key keyPrint="G" />
      <Key keyPrint="H" />
      <Key keyPrint="J" />
      <Key keyPrint="K" />
      <Key keyPrint="L" />
    </div>
  );
};

export default MiddleKeys;
