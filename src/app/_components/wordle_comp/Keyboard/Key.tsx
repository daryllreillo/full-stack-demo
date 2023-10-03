/*
    A single key
*/

import { useDispatch } from 'react-redux';

import { wordleActions } from '@/app/_components/context/wordleRedux';

interface KeyInput {
  keyPrint: string;
  onClick?: () => { payload: any; type: string } | Promise<{ payload: any; type: string }>;
}

const Key: React.FC<KeyInput> = ({ keyPrint, onClick }) => {
  const dispatch = useDispatch();

  const keyPressHandler = onClick ?? (() => dispatch(wordleActions.keyStroke({ key: keyPrint.toLowerCase() })));

  return (
    <button
      className="h-[2.5rem] px-3 my-1 mx-0.5 w-fit sm:h-[3rem] md:h-[3rem] sm:px-5 md:px-5 py-auto md:my-1 bg-gray-500 text-white flex items-center rounded-md border-none outline-none"
      onClick={keyPressHandler}
    >
      {keyPrint}
    </button>
  );
};

export default Key;
