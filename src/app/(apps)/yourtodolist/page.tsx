/*
  path: '/'
*/

import TodoList from '@/app/_components/app_comp/TodoList';
import NewTodoForm from '@/app/_components/app_comp/NewTodoForm';
// import StackList from '@/app/_components/projectInfo/StackList';
// import ProjectLinks from '@/app/_components/projectInfo/ProjectLinks';

const YourTodoList: React.FC = () => {
  return (
    <main className="flex flex-col justify-between items-center h-[93vh] min-h-[750px] w-[100%] bg-cust-image-mainpage bg-cust-size-mainpage animate-cust-animation-mainpage">
      <section className="w-full sm:w-[90vw] md:w-[80vw] lg:w-[70vw] xl:w-[50vw] 2xl:w-[40vw] min-h-[500px] mt-4">
        <h2 className="text-mainfg text-center mb-1 text-4xl font-semibold">Your To Do List</h2>
        <NewTodoForm />
        <TodoList />
      </section>
      {/* <section className="mb-8 min-w-[320px]">
        <StackList />
        <ProjectLinks />
      </section> */}
    </main>
  );
};

export default YourTodoList;
