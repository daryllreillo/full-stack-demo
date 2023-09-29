/*
    A single key
*/

interface KeyInput {
  keyPrint: string;
  onClick?: () => { payload: any; type: string } | Promise<{ payload: any; type: string }>;
}

const Key: React.FC<KeyInput> = ({ keyPrint, onClick }) => {
  return (
    <button
      className="h-[2.5rem] px-3 my-1 mx-0.5 w-fit sm:h-[3rem] md:h-[3rem] sm:px-5 md:px-5 py-auto md:my-1 bg-gray-500 text-white flex items-center rounded-md border-none outline-none"
      onClick={onClick}
    >
      {keyPrint}
    </button>
  );
};

export default Key;
