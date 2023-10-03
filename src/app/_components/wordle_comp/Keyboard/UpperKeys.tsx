import Key from '@/app/_components/wordle_comp/Keyboard/Key';

const UpperKeys: React.FC = () => {
  return (
    <div className="flex flex-row">
      <Key keyPrint="Q" />
      <Key keyPrint="W" />
      <Key keyPrint="E" />
      <Key keyPrint="R" />
      <Key keyPrint="T" />
      <Key keyPrint="Y" />
      <Key keyPrint="U" />
      <Key keyPrint="I" />
      <Key keyPrint="O" />
      <Key keyPrint="P" />
    </div>
  );
};

export default UpperKeys;
