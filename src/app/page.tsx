/*
  path: '/'
*/
import Image from 'next/image';

import StackList from './_components/projectInfo/StackList';
import ProjectLinks from './_components/projectInfo/ProjectLinks';
import myPic from '@/app/_images/my_pic/20220910_124833.jpg';

const Homepage: React.FC = () => {
  return (
    <main className="flex flex-col justify-between items-center h-[93vh] min-h-[750px] w-[100%] bg-cust-image-mainpage bg-cust-size-mainpage animate-cust-animation-mainpage selection:bg-none cursor-default">
      <section className="w-full sm:w-[90vw] md:w-[80vw] lg:w-[70vw] xl:w-[50vw] 2xl:w-[40vw] min-h-[500px] mt-4 text-center mx-6 [&>p]:mx-4 [&>p]:text-white">
        <h2 className="text-mainfg text-center mb-1 text-2xl font-semibold">Hi there!</h2>
        <p>I&apos;m Daryll, an aspiring web developer. </p>
        <div className="w-[200px] h-[200px] mx-auto relative sm:h-[250px] sm:w-[250px] md:h-[300px] md:w-[300px]">
          <Image src={myPic} alt="the developer's portrait" fill className="rounded-md mx-auto my-2 object-contain" />
        </div>
        <br />
        <p>Please check out my apps by clicking on the menu button on the upper right.</p>
        <br />
        <p>
          All apps in this site are public and free, no login needed.
          <br />
          Thanks and see you later!
        </p>
      </section>
      <section className="mb-8 min-w-[320px]">
        <StackList />
        <ProjectLinks />
      </section>
    </main>
  );
};

export default Homepage;
