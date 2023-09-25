import { SiNextdotjs, SiTypescript, SiReact, SiDocker, SiTailwindcss, SiNodedotjs, SiPostgresql } from 'react-icons/si';
import { TbBrandNextjs } from 'react-icons/tb';

import StackListItem from './StackListItem/StackListItem';

const StackList: React.FC = () => {
  return (
    <>
      <h2 className="text-center text-2xl font-semibold text-mainfg">Project stack</h2>
      <ul className="flex flex-wrap w-[40vw] justify-center min-w-[320px] text-center mx-0">
        <StackListItem Icon={SiReact} nameText="React" />
        <StackListItem Icon={SiNextdotjs} nameText="Next.js App Router" />
        <StackListItem Icon={SiTailwindcss} nameText="TailwindCSS" />
        <StackListItem Icon={SiTypescript} nameText="TypeScript" />
        <StackListItem Icon={SiNodedotjs} nameText="Node.js" />
        <StackListItem Icon={SiPostgresql} nameText="PostgreSQL" />
        <StackListItem Icon={TbBrandNextjs} nameText="Next-Auth.js" />
        <StackListItem Icon={SiDocker} nameText="Docker" />
      </ul>
    </>
  );
};

export default StackList;
