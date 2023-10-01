/*
  path: '/aboutme'
*/
// 'use client';
import Image from 'next/image';
// import useSWR from 'swr';
import mattyPlaying from '@/app/_images/my_dog/Matty Plays.gif';

const AboutMePage: React.FC = () => {
  // const { data, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_DOMAIN}/api/laggy`, getData);

  return (
    <main className="flex flex-col justify-between items-center h-[93vh] min-h-[750px] w-[100%] bg-cust-image-mainpage bg-cust-size-mainpage animate-cust-animation-mainpage selection:bg-none text-sm sm:text-base">
      <section className="w-full sm:w-[90vw] md:w-[80vw] lg:w-[70vw] xl:w-[50vw] 2xl:w-[40vw] min-h-[500px] mt-4 text-center mx-6 [&>p]:mx-4 [&>p]:text-white [&>p]:cursor-default [&>p]:mb-3">
        <h2 className="text-mainfg text-center mb-1 text-xl font-semibold cursor-default sm:text-2xl">About me</h2>
        <p>My name is Daryll Reillo. </p>

        <p>
          Ever since I was young, I&apos;ve always liked computers. I remember playing video games all day on my 16-bit Sega Mega Drive (a.k.a Sega Genesis)
          back when I was seven. Back in high school, I remember overclocking my first PC until it got toast. These low-tech memories will always be in my mind.
        </p>

        <p>
          Recently, I left my 10+ years career as an SAP Functional Consultant. The reason is so I can fully pursue my dream career on web development. Yes, it
          took me a decade to take this risk and it feels so great to really take the path I have always wanted.😊
        </p>

        <p>Kudos to all of the people who believed and supported me - Giezzel, Alp, Merbs, Ralph, Chesca, and all of you. I love you all.</p>

        <p>Thank you for taking some time to read and here&apos;s a gif of my dog playing.</p>
        <div className="mx-auto relative w-[139px] h-[250px] sm:w-[167px] sm:h-[300px] md:w-[195px] md:h-[350px] rounded-sm md:rounded-md">
          <Image
            src={mattyPlaying}
            alt="a dog playing"
            fill
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAAECAIAAAArjXluAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAJUlEQVR4nGO4fmz3hKxIhv+/Hq/qrWT4cPukPAMDw6qmLAtxNgDWzAzWBpkilgAAAABJRU5ErkJggg=="
            className="mx-auto rounded-md object-contain"
          />
        </div>
      </section>
    </main>
  );
};

export default AboutMePage;

// async function getData(url: string) {
//   const res = await fetch(url, {
//     next: { revalidate: 60 },
//   });
//   if (!res.ok) {
//     console.log(res);
//     throw new Error('Failed to fetch data from db');
//   }
//   return res.json();
// }
