/*
    A single key
*/

interface KeyInput {
  keyPrint: string;
  onClick?: () => { payload: any; type: string };
}

const Key: React.FC<KeyInput> = ({ keyPrint, onClick }) => {
  return (
    <button className="w-fit h-[3rem] px-5 py-auto my-2 mx-0.5 bg-gray-500 text-white flex items-center rounded-md border-none outline-none" onClick={onClick}>
      {keyPrint}
    </button>
  );
};

export default Key;
