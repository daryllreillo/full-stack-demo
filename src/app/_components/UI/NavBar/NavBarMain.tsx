'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import logo from '@/app/_icons/apple-touch-icon.png';
import { BiDownArrow, BiUpArrow } from 'react-icons/bi';
import { signOut } from 'next-auth/react';
import { Session } from 'next-auth';

const NavBarMain: React.FC<{ session: Session | null }> = ({ session }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const router = useRouter();
  const pathname = usePathname();

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  // const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenus = () => {
    setIsMobileMenuOpen(false);
    setIsMenuOpen(false);
  };

  useEffect(() => {
    document.addEventListener('scroll', () => {
      const vScrollPos = window.scrollY; // Getting vertical scrollbar position
      if (vScrollPos !== 0 && !isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    });
  }, [isMobileMenuOpen]);

  return (
    <header className="border-none w-full bg-bg h-[6vh] min-h-[62px]">
      <nav className="flex justify-between items-center px-2 py-3 w-full md:pb-1.5">
        <section className="w-[30vw] lg:w-[20vw] xl:w-[18vw] 2xl:w-[18vw]">
          <Link href="/" className="w-[fit-content] flex justify-start" onClick={closeMenus}>
            <span className="ml-1 inline relative -top-0.5">
              <Image src={logo} alt="logo of dog" className="inline w-[46px]" />
            </span>
          </Link>
        </section>

        <section className="w-[70vw] flex justify-end h-10 items-center lg:w-[80vw] xl:w-[82vw] 2xl:w-[82vw]">
          <span className="text-base text-right min-w-max z-0 mr-3 sm:mr-5 md:mr-6 py-auto ">
            Welcome, <span>{session?.user ? (session.user.name ? /^([\w\-]+)/.exec(session.user.name)![0] : session.user.email) : 'guest'} !</span>
          </span>
          <ul
            className={
              'fixed top-16 flex flex-col justify-center bg-bg items-end w-[100%] z-[99] border-b-[1px] border-t-[1px] border-solid py-3 border-gray-600 transition-all text-right md:static md:flex md:justify-end md:w-fit md:items-center md:flex-row md:border-transparent md:py-0 ' +
              (isMobileMenuOpen ? 'left-0' : '-left-full')
            }
          >
            <li className="text-lg my-2 py-1 px-2 mr-4 text-right min-w-[4.5rem] font-semibold hover:text-link md:mx-1">
              <Link href="/" className={pathname === '/' && !isMenuOpen ? 'cursor-default text-link ' : ''} onClick={closeMenus}>
                Home
              </Link>
            </li>
            <li>
              {/* Menu button */}
              <button
                className={
                  'cursor pointer bg-transparent z-10 hidden border-transparent text-lg md:flex md:mr-4 hover:text-link hover:translate-y-0 hover:shadow-none ' +
                  (isMenuOpen ? 'text-link' : '')
                }
                aria-label="open or close menu"
                onClick={toggleMenu}
              >
                {isMenuOpen ? <BiUpArrow className="my-auto ml-0.5" /> : <BiDownArrow className="my-auto ml-0.5" />}Menu
              </button>
            </li>

            {/* apps */}
            <ul
              className={
                'bg-bg w-[100%] ' +
                (isMenuOpen
                  ? 'md:flex-col md:justify-start md:items-start md:absolute md:top-[68px] md:rounded-md md:p-2 md:text-left md:flex md:w-fit md:border-transparent'
                  : 'md:hidden')
              }
            >
              <li className="text-lg cursor-pointer min-w-max font-semibold mt-2 mb-0.5 px-2 mr-4 hover:text-link md:mx-1 md:mt-2 md:mb-0.5 md:w-[100%]">
                <Link className="cursor-pointer" href="/random-wordle" onClick={closeMenus}>
                  Random Wordle App
                </Link>
              </li>
              <li className="text-lg cursor-pointer min-w-max font-semibold mt-0.5 mb-2 px-2 mr-4 hover:text-link md:mx-1 md:mb-3 md:mt-0.5 md:w-[100%]">
                <Link className="cursor-pointer" href="/yourtodolist" onClick={closeMenus}>
                  To Do List App
                </Link>
              </li>

              {/* page links */}
              <li className="text-lg cursor-pointer min-w-max font-semibold mt-4 mb-0.5 px-2 mr-4 hover:text-link md:mx-1 md:mt-2 md:mb-0.5 md:w-[100%]">
                <Link className="cursor-pointer" href="/aboutme" onClick={closeMenus}>
                  About me
                </Link>
              </li>

              {/* register or logout */}
              {session ? (
                <li
                  className="text-lg cursor-pointer min-w-max font-semibold my-2 px-2 mr-4 hover:text-link md:mx-1 md:mb-2 md:mt-0.5 md:w-[100%]"
                  onClick={() => signOut()}
                >
                  Log out
                </li>
              ) : (
                <li className="text-lg my-2 py-1 px-2 mr-4 min-w-[4.5rem] font-semibold hover:text-link md:mx-1 md:mb-2 md:mt-0.5 md:w-[100%]">
                  {pathname === '/register' ? (
                    <a className="cursor-default text-link">Register</a>
                  ) : (
                    <Link className="cursor-pointer" href="/register" onClick={closeMenus}>
                      Register
                    </Link>
                  )}
                </li>
              )}
            </ul>
          </ul>
          {/* sign in button */}
          {session ? (
            <></>
          ) : pathname === '/signin' ? (
            <button
              className="cursor-default my-auto mr-2 py-2 px-4 min-w-max font-medium rounded-3xl border-link border-[1px] text-link bg-transparent hover:translate-y-0 hover:shadow-none hover:shadow-transparent"
              aria-label="Sign in"
            >
              <a>Sign in</a>
            </button>
          ) : (
            <button
              className="cursor-pointer my-auto mr-2 py-2 px-4 min-w-max font-medium rounded-3xl border-fg border-[1px] text-fg bg-transparent hover:text-link hover:border-link hover:shadow-link"
              onMouseDown={() => router.push('/signin')}
              aria-label="Sign in"
            >
              <Link href="/signin">Sign in</Link>
            </button>
          )}

          {/* hamburger menu button */}
          <button
            className={'cursor pointer bg-transparent z-10 border-transparent md:hidden hover:translate-y-0 hover:shadow-none'}
            onClick={toggleMobileMenu}
            aria-label="menu open/close toggle"
          >
            <span
              className={
                'block w-[35px] h-[3px] my-[5px] transition-all ease-in-out duration-300 bg-fg ' + (isMobileMenuOpen ? 'translate-y-2 -rotate-45' : '')
              }
            />
            <span className={'block w-[35px] h-[3px] my-[5px] transition-all ease-in-out duration-300 ' + (isMobileMenuOpen ? 'bg-transparent' : 'bg-fg')} />
            <span
              className={
                'block w-[35px] h-[3px] my-[5px] transition-all ease-in-out duration-300 bg-fg ' + (isMobileMenuOpen ? '-translate-y-2 rotate-45' : '')
              }
            />
          </button>
        </section>
      </nav>
    </header>
  );
};

export default NavBarMain;
