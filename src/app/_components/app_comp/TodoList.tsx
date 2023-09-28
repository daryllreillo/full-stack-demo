'use client';
import { useContext, useRef } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import TodoItem from '@/app/_components/app_comp/TodoItem';
import { TodoContext } from '@/app/_components/context/TodoContext';
import { Todo } from '@/app/_models/todoModel';
import GenericLoader from '../UI/Loading/GenericLoader';

const TodoList: React.FC = () => {
  const context = useContext(TodoContext);
  const noticePRef = useRef<HTMLParagraphElement>(null);

  const listItemsClassNames = {
    enter: 'animate-fade-in z-[1]',
    enterDone: 'opacity-100',
    exit: 'animate-fade-out z-[1]',
    exitDone: 'opacity-100',
  };

  const noticeClassNames = {
    enter: 'h-0 animate-fade-in z-0',
    enterDone: 'opacity-100 h-fit',
    exit: 'opacity-0',
    exitDone: 'opacity-0',
  };

  return (
    <div className='mt-4 relative flex flex-col items-center justify-center [&>ul]:w-[100%] [&>ul]:transition-all [&>ul]:duration-[1s] [&>ul]:ease-linear [&>ul]:flex [&>ul]:flex-col [&>ul]:items-center [&>ul]:justify-evenly [&>ul]:ml-4'>
      {/* <p>Click any item to remove from list.</p> */}
      <CSSTransition
        nodeRef={noticePRef}
        in={context.todoItems.length < 1}
        key={'notice'}
        timeout={{ enter: 300, exit: 0 }}
        classNames={noticeClassNames}
        unmountOnExit
        mountOnEnter
      >
        <span className="text-center w-[100%] text-[1.1rem] " ref={noticePRef}>
          {/* Below line breaks are needed.
            Using CSS margin or flexbox somehow "borks" the CSStransition. */}
          <br />
          <br />
          <br />
          <br />
          {context.isLoading ? <GenericLoader /> : '🎉No more things to do! 🎉'}
        </span>
      </CSSTransition>
      <TransitionGroup component="ul">
        {context.todoItems.map((item: Todo) => {
          return (
            <CSSTransition nodeRef={item.nodeRef} key={item.id!.toString()} timeout={190} classNames={listItemsClassNames} unmountOnExit={true} mountOnEnter>
              <TodoItem key={item.id!.toString()} id={item.id!} text={item.text} nodeRef={item.nodeRef} color={item.color} />
            </CSSTransition>
          );
        })}
      </TransitionGroup>
    </div>
  );
};

export default TodoList;
