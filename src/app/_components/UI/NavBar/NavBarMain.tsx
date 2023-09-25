'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { SiNextdotjs, SiTypescript, SiReact, SiTailwindcss } from 'react-icons/si';
import { signOut } from 'next-auth/react';
import { Session } from 'next-auth';

const NavBarMain: React.FC<{ session: Session | null }> = ({ session }) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const router = useRouter();
  const pathname = usePathname();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    document.addEventListener('scroll', () => {
      const vScrollPos = window.scrollY; // Getting vertical scrollbar position
      if (vScrollPos !== 0 && !isMenuOpen) {
        setIsMenuOpen(false);
      }
    });
  }, [isMenuOpen]);

  return (
    <header className="border-none w-full bg-bg h-[6vh] min-h-[62px]">
      <nav className="flex justify-between items-center px-2 py-3 w-full md:pb-1.5">
        <section className="w-[30vw] lg:w-[20vw] xl:w-[18vw] 2xl:w-[18vw]">
          <Link href="/" className="w-[fit-content] flex justify-start">
            <SiReact className="text-2xl mx-0.5" />
            <SiNextdotjs className="text-2xl mx-0.5" />
            <SiTailwindcss className="text-2xl mx-0.5" />
            <SiTypescript className="text-2xl mx-0.5" />
          </Link>
        </section>
        <section className="w-[70vw] flex justify-end h-10 items-center lg:w-[80vw] xl:w-[82vw] 2xl:w-[82vw]">
          <span className="text-base text-right min-w-max z-0 mr-3 sm:mr-5 md:mr-6 py-auto ">
            Welcome, <span>{session?.user ? (session.user.name ? /^([\w\-]+)/.exec(session.user.name)![0] : session.user.email) : 'guest'} !</span>
          </span>
          <ul
            className={
              'fixed top-16 flex flex-col justify-center bg-bg items-end w-[100%] z-[99] border-b-[1px] border-t-[1px] border-solid py-3 border-gray-600 transition-all md:static md:flex md:justify-end md:w-fit md:items-center md:flex-row md:border-transparent md:py-0 ' +
              (isMenuOpen ? 'left-0' : '-left-full')
            }
          >
            <li className="text-lg my-2 py-1 px-2 mr-4 text-right min-w-[4.5rem] font-semibold hover:text-link md:mx-1">
              <Link href="/" className={pathname === '/' ? 'cursor-default text-link ' : ''} onClick={closeMenu}>
                Home
              </Link>
            </li>
            {session ? (
              <li className="text-lg cursor-pointer min-w-max font-semibold my-2 px-2 mr-4 hover:text-link md:mx-1 md:my-2" onClick={() => signOut()}>
                Log out
              </li>
            ) : (
              <li className="text-lg my-2 py-1 px-2 mr-4 min-w-[4.5rem] font-semibold hover:text-link md:mx-1">
                {pathname === '/register' ? (
                  <a className="cursor-default text-link">Register</a>
                ) : (
                  <Link className="cursor-pointer" href="/register" onClick={closeMenu}>
                    Register
                  </Link>
                )}
              </li>
            )}
          </ul>
          {session ? (
            <></>
          ) : pathname === '/signin' ? (
            <button
              className="cursor-default my-auto mr-2 py-2 px-4 min-w-max font-medium rounded-3xl border-link border-[1px] text-link bg-transparent hover:translate-y-0 hover:shadow-none hover:shadow-transparent"
              aria-description="Sign in"
            >
              <a>Sign in</a>
            </button>
          ) : (
            <button
              className="cursor-pointer my-auto mr-2 py-2 px-4 min-w-max font-medium rounded-3xl border-fg border-[1px] text-fg bg-transparent hover:text-link hover:border-link hover:shadow-link"
              onMouseDown={() => router.push('/signin')}
              aria-description="Sign in"
            >
              <Link href="/signin">Sign in</Link>
            </button>
          )}
          <button
            className={'cursor pointer bg-transparent z-10 border-transparent md:hidden hover:translate-y-0 hover:shadow-none'}
            onClick={toggleMenu}
            aria-label="menu open/close toggle"
          >
            <span
              className={'block w-[35px] h-[3px] my-[5px] transition-all ease-in-out duration-300 bg-fg ' + (isMenuOpen ? 'translate-y-2 -rotate-45' : '')}
            />
            <span className={'block w-[35px] h-[3px] my-[5px] transition-all ease-in-out duration-300 ' + (isMenuOpen ? 'bg-transparent' : 'bg-fg')} />
            <span
              className={'block w-[35px] h-[3px] my-[5px] transition-all ease-in-out duration-300 bg-fg ' + (isMenuOpen ? '-translate-y-2 rotate-45' : '')}
            />
          </button>
        </section>
      </nav>
    </header>
  );
};

export default NavBarMain;
