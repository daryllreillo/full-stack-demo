/*
  path: '/'
*/

import StackList from './_components/projectInfo/StackList';
import ProjectLinks from './_components/projectInfo/ProjectLinks';

const Homepage: React.FC = () => {
  return (
    <main className="flex flex-col justify-between items-center h-[93vh] min-h-[750px] w-[100%] bg-cust-image-mainpage bg-cust-size-mainpage animate-cust-animation-mainpage">
      <section className="w-full sm:w-[90vw] md:w-[80vw] lg:w-[70vw] xl:w-[50vw] 2xl:w-[40vw] min-h-[500px] mt-4 text-center mx-6 [&>p]:mx-4">
        <h2 className="text-mainfg text-center mb-1 text-2xl font-semibold">Hi there!</h2>
        <p>I'm Daryll, an aspiring web developer. </p>
        <br />
        <p>I left my career of 10+ years as an SAP Functional Consultant so I can pursue my dream career on web development.</p>
        <br />
        <p>Please check out the apps I made by clicking on the menu on the upper right section.</p>
        <br />
        <p>
          You can optionally register and sign in. This will enable the site to save only the necessary data while you use the apps. This site does
          not collect any sensitive, non-public information from your login data.
        </p>
        <br />
        <p> All apps are public and free to use, regardless of your sign in status.</p>
        <br />
        <p>Thank you and have a nice day ahead! </p>
      </section>
      <section className="mb-8 min-w-[320px]">
        <StackList />
        <ProjectLinks />
      </section>
    </main>
  );
};

export default Homepage;
