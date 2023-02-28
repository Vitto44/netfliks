import Image from "next/image";
import { useEffect, useState } from "react";

import { useRouter } from "next/router";

interface navBarProps {
  isDashboard?: boolean;
  notFixed?: boolean;
}

const Offset = 66;

const NavBar: React.FC<navBarProps> = ({ isDashboard, notFixed }) => {
  const router = useRouter();
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [showAccMenu, setShowAccMenu] = useState<boolean>(false);
  const [navBgr, setNavBgr] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > Offset) {
        setNavBgr(true);
      } else {
        setNavBgr(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`flex items-center justify-between px-5 md:px-14 py-1 flex-row bg-gradient-to-b from-[#06202A] ${
        navBgr ? "to-transparent" : "bg-opacity-50"
      } transition duration-500 ${!notFixed && "fixed"} z-10 w-full`}
    >
      <div className="block lg:flex flex-row lg:gap-10">
        <div
          className="relative w-32 h-24 md:w-40 cursor-pointer"
          onClick={() => router.push("/")}
        >
          <Image fill src="/images/logo.png" alt="NetfliKS Logo" />
        </div>
        {isDashboard && (
          <div className="items-center gap-4 hidden lg:flex">
            <p
              onClick={() => router.push("/")}
              className="cursor-pointer font-semibold text-white hover:underline text-sm"
            >
              Home
            </p>
            <p
              onClick={() => router.push("/series")}
              className="cursor-pointer font-semibold text-white hover:underline text-sm"
            >
              Series
            </p>
            <p
              onClick={() => router.push("/films")}
              className="cursor-pointer font-semibold text-white hover:underline text-sm"
            >
              Films
            </p>
            <p
              onClick={() => router.push("/new")}
              className="cursor-pointer font-semibold text-white hover:underline text-sm"
            >
              New & Popular
            </p>
            <p
              onClick={() => router.push("/favorites")}
              className="cursor-pointer font-semibold text-white hover:underline text-sm"
            >
              My List
            </p>
          </div>
        )}
      </div>

      {isDashboard && (
        <div className="flex z-10 flex-row items-center gap-4 ml-auto lg:gap-10">
          <div
            onClick={() => setShowMenu(!showMenu)}
            className="lg:hidden flex flex-row items-center gap-1 ml-8 cursor-pointer relative"
          >
            <p className="text-sm text-gray-300">browse</p>
          </div>
          {/* <div className="text-gray-200 hover:text-gray-400 cursor-pointer text-2xl">
              <AiOutlineSearch />
            </div> */}
        </div>
      )}
    </nav>
  );
};

export default NavBar;
