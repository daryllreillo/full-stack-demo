/*
  path: '/aboutme'
*/

const AboutMePage: React.FC = () => {
  return (
    <main className="flex flex-col justify-between items-center h-[93vh] min-h-[750px] w-[100%] bg-cust-image-mainpage bg-cust-size-mainpage animate-cust-animation-mainpage">
      <section className="w-full sm:w-[90vw] md:w-[80vw] lg:w-[70vw] xl:w-[50vw] 2xl:w-[40vw] min-h-[500px] mt-4 text-center mx-6 [&>p]:mx-4 [&>p]:text-white">
        <h2 className="text-mainfg text-center mb-1 text-2xl font-semibold">About me</h2>
        <p>My name is Daryll Reillo. </p>
        <br />
        <p>Ever since I was young, I&apos;ve always liked to learn more about computers. </p>
        <br />
        {/* <p>This is me I got my first PC. Too bad I eventually destroyed it on one of my experiments.😊</p>
        <br /> */}
        <p>
          I left my career of 10+ years as an SAP Functional Consultant so I can pursue my dream career on web development. Yes, it took me a decade to realize
          I wasn&apos;t really happy in my career path which led me to this big change.
        </p>
        <br />
        {/* <p>Thank you and have a nice day ahead! </p> */}
      </section>
    </main>
  );
};

export default AboutMePage;
