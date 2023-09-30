/*
  path: '/'
*/
import Image from 'next/image';

import StackList from './_components/projectInfo/StackList';
import ProjectLinks from './_components/projectInfo/ProjectLinks';
import myPic from '@/app/_images/my_pic/20220910_124833.jpg'

const Homepage: React.FC = () => {
  return (
    <main className="flex flex-col justify-between items-center h-[93vh] min-h-[750px] w-[100%] bg-cust-image-mainpage bg-cust-size-mainpage animate-cust-animation-mainpage selection:bg-none cursor-default">
      <section className="w-full sm:w-[90vw] md:w-[80vw] lg:w-[70vw] xl:w-[50vw] 2xl:w-[40vw] min-h-[500px] mt-4 text-center mx-6 [&>p]:mx-4 [&>p]:text-white">
        <h2 className="text-mainfg text-center mb-1 text-2xl font-semibold">Hi there!</h2>
        <p>I&apos;m Daryll, an aspiring web developer. </p>
        <Image src={myPic} alt="the developer's portrait" width={150} className='rounded-md mx-auto my-2'/>
        <p>I left my career of 10+ years as an SAP Functional Consultant so I can pursue my dream career on web development.</p>
        <br />
        <p>Please check out the apps by clicking on menu on the upper right.</p>
        <br />
        <p>
          All apps are public and free to use, regardless of your sign in status. <br />
          Thank you and have a great day ahead!
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
