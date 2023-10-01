/*
  path: '/aboutme'
*/
import Image from 'next/image';
import mattyPlaying from '@/app/_images/my_dog/Matty Plays cropped.gif';
import { Suspense } from 'react';
import GenericLoader from '../_components/UI/Loading/GenericLoader';

const AboutMePage: React.FC = () => {
  return (
    <main className="flex flex-col justify-between items-center h-[93vh] min-h-[750px] w-[100%] bg-cust-image-mainpage bg-cust-size-mainpage animate-cust-animation-mainpage selection:bg-none text-sm sm:text-base">
      <section className="w-full sm:w-[90vw] md:w-[80vw] lg:w-[70vw] xl:w-[50vw] 2xl:w-[40vw] min-h-[500px] mt-4 text-center mx-6 [&>p]:mx-4 [&>p]:text-white [&>p]:cursor-default">
        <h2 className="text-mainfg text-center mb-1 text-xl font-semibold cursor-default sm:text-2xl">About me</h2>
        <p>My name is Daryll Reillo. </p>
        <br />
        <p>
          Ever since I was young, I&apos;ve always liked computers. I remember playing video games all day on my 16-bit Sega Mega Drive (a.k.a Sega
          Genesis) back when I was seven. Back in high school, I remember overclocking my first PC until it got toast. These low-tech memories will always be in
          my mind.
        </p>
        <br />
        <p>
          Anyway, I recently left my career of 10+ years as an SAP Functional Consultant. This is so I can fully pursue my dream career on web development. It
          took me a decade to take this risk. It feels great to truly take the path that I have always wanted. 😊
        </p>
        <br />
        <p>Kudos to all of the people who believed and supported me - Giezzel, Alp, Merbs, Ralph, and all of you. I love you all.</p>
        <br />
        <p>Lastly, here&apos;s a gif of my dog playing.</p>
        <div className="w-[200px] h-[200px] mx-auto relative sm:h-[250px] sm:w-[250px] md:h-[300px] md:w-[300px]">
          <Suspense fallback={<GenericLoader />}>
            <Image src={mattyPlaying} alt="a dog playing" fill className="mx-auto mt-2 rounded-md object-contain" />
          </Suspense>
        </div>
      </section>
    </main>
  );
};

export default AboutMePage;
