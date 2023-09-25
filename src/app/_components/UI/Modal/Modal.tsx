'use client';

import { ReactNode, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Tooltip } from 'react-tooltip';

const Modal: React.FC<{ children: ReactNode }> = props => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(true);

  const router = useRouter();

  const closeModalHandler = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      console.log('returning back');
      router.back();
    }, 280);
  };

  const modalClass =
    'text-fg absolute top-0 text-white flex flex-col items-center justify-center my-[8vh] mx-auto z-[100] opacity-100 h-fit w-[90%] rounded-md bg-modal-bg text-modal-fg border-solid border-[1px] border-gray-800 md:w-[80%] lg:w-[70%] xl:w-[60%] 2xl:w-[40%] ' +
    (isModalOpen ? 'animate-slide-down' : 'animate-slide-up');

  return (
    <>
      <dialog id="modal" className={modalClass}>
        {props.children}
        <button
          id="closeBtn"
          className="absolute top-0 right-0 p-0 rounded-md bg-transparent border-transparent border-[1px] border-solid hover:shadow-none hover:translate-y-0"
          onClick={closeModalHandler}
        >
          ❌
        </button>
        <Tooltip anchorSelect={'#closeBtn'} place="left">
          Close
        </Tooltip>
      </dialog>
      <div id="backdrop" className="fixed top-0 left-0 w-[100%] h-[100vh] bg-[rgba(0,0,0,0.75)] z-[99] opacity-100" onClick={closeModalHandler} />
    </>
  );
};

export default Modal;
