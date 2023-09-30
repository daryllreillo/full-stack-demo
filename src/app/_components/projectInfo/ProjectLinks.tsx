import Link from 'next/link';
import Image from 'next/image';
import { FiExternalLink } from 'react-icons/fi';
import { SiGithub } from 'react-icons/si';
import logo from '@/app/_icons/favicon-16x16.png';

const ProjectLinks: React.FC = () => {
  return (
    <div className="text-mainfg mt-3 flex justify-center items-center">
      <Link href="https://github.com/daryllreillo/full-stack-demo" target="_blank">
        <div className="border-white border-y-[1px] border-x-[1px] border-solid rounded-3xl px-4 py-2">
          <SiGithub className="inline relative -top-0.5" />
          <span className='ml-1'>GitHub repo link</span>
          <FiExternalLink className="inline relative -top-0.5 ml-1" />
        </div>
      </Link>
    </div>
  );
};

export default ProjectLinks;
