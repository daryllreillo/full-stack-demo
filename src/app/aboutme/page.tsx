/*
  path: '/aboutme'
*/

const AboutMePage: React.FC = () => {
  return (
    <main className="flex flex-col justify-between items-center h-[93vh] min-h-[750px] w-[100%] bg-cust-image-mainpage bg-cust-size-mainpage animate-cust-animation-mainpage selection:bg-none">
      <section className="w-full sm:w-[90vw] md:w-[80vw] lg:w-[70vw] xl:w-[50vw] 2xl:w-[40vw] min-h-[500px] mt-4 text-center mx-6 [&>p]:mx-4 [&>p]:text-white [&>p]:cursor-default">
        <h2 className="text-mainfg text-center mb-1 text-2xl font-semibold cursor-default">About me</h2>
        <p>My name is Daryll Reillo. </p>
        <br />
        <p>
          Ever since I was young, I&apos;ve always liked computers in general. I remember playing video games all day on my 16-bit Sega Mega Drive (a.k.a Sega Genesis) back when I was just seven. In high school, I remember trying to overclock my first PC until it overheated and died. Now, the tech has advanced so much, by leaps and bounds, that we can never bring back those low-tech days again.
        </p>
        <br />
        <p>
          Anyway, I recently left my 10+ year-career as an SAP Functional Consultant so that I can pursue my dream career on web development. Yes, it took me a decade to actually take a risk for this. I have no job as of right now, but I am doing what I like.
        </p>
        <br />
        <p>
          Kudos to all of the people who believed and supported me - Giezzel, Alp, Merbs, Ralph, and all of you. I love you all.
        </p>
      </section>
    </main>
  );
};

export default AboutMePage;
