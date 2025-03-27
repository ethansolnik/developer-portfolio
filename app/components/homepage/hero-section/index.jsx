// @flow strict

import { personalData } from "@/utils/data/personal-data";
import Image from "next/image";
import Link from "next/link";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import { MdDownload } from "react-icons/md";
import { RiContactsFill } from "react-icons/ri";

function HeroSection() {
  return (
    <section className="relative flex flex-col items-center justify-between py-4 lg:py-12">
      <Image
        src="/hero.svg"
        alt="Hero"
        width={1572}
        height={795}
        className="absolute -top-[98px] -z-10"
      />

      <div className="w-full flex flex-col items-center">
        <h1 className="text-3xl font-bold leading-10 text-grey-300 md:font-extrabold lg:text-[2.6rem] lg:leading-[3.5rem] text-center mb-12">
          <span className="text-gray-900">My name is</span> {' '}
          <span className="text-pink-500">{personalData.name}</span> {'.'} <br/>
          <span className="text-gray-900">{`This is my `}</span>
          <span className="text-[#16f2b3]">{'personal portfolio'}</span>
          .
        </h1>
        
        <div className="flex flex-col items-center justify-center w-full">
          <div className="flex items-center gap-8 mb-12">
            <Link
              href={personalData.github}
              target='_blank'
              className="transition-all text-pink-500 hover:scale-125 duration-300"
            >
              <BsGithub size={36} />
            </Link>
            <Link
              href={personalData.linkedIn}
              target='_blank'
              className="transition-all text-pink-500 hover:scale-125 duration-300"
            >
              <BsLinkedin size={36} />
            </Link>
            <Link
              href={personalData.facebook}
              target='_blank'
              className="transition-all text-pink-500 hover:scale-125 duration-300"
            >
              <FaFacebook size={36} />
            </Link>
          </div>

          <div className="flex items-center gap-6">
            <Link href="#contact" className="bg-gradient-to-r to-pink-500 from-violet-600 p-[1px] rounded-full transition-all duration-300 hover:from-pink-500 hover:to-violet-600">
              <button className="px-4 text-xs md:px-10 py-3 md:py-5 bg-[#0d1224] rounded-full border-none text-center md:text-base font-medium uppercase tracking-wider text-[#ffff] no-underline transition-all duration-200 ease-out md:font-semibold flex items-center gap-1 hover:gap-3">
                <span>Contact me</span>
                <RiContactsFill size={20} />
              </button>
            </Link>

            <a className="flex items-center gap-1 hover:gap-3 rounded-full bg-gradient-to-r from-pink-500 to-violet-600 px-4 md:px-10 py-3 md:py-5 text-center text-xs md:text-base font-medium uppercase tracking-wider text-white no-underline transition-all duration-200 ease-out hover:text-white hover:no-underline md:font-semibold" 
              role="button" 
              href={personalData.resume}
              download="Ethan_Solnik_Resume.pdf"
            >
              <span>Get Resume</span>
              <MdDownload size={20} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;