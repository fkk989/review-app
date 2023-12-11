import { FireIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { CompanyLink } from "./footer/CompanyLink";

// socila link style

export function Footer() {
  const socialLinksObj: Array<{ icon: React.ReactNode; link: string }> = [
    {
      icon: <FaLinkedin className="text-black w-[22px] h-[22px]" />,
      link: "https://linkedin.com",
    },
    {
      icon: <FaFacebook className="text-black w-[22px] h-[22px]" />,
      link: "https://facebook.com",
    },
    {
      icon: <FaXTwitter className="text-black w-[22px] h-[22px]" />,
      link: "https://x.com",
    },
    {
      icon: <FaInstagram className="text-black w-[22px] h-[22px]" />,
      link: "https://instagram.com",
    },
  ];

  return (
    <div className="w-screen min-h-[50vh]  flex max-mobile:flex-col justify-center   bg-[#B3B2B2] dark:bg-black border-t-[1px] dark:border-[#ffffff3d] gap-[30px] mobile:gap-[100px] ">
      {/* brand logo & social links */}
      <div className="flex flex-col justify-center items-center">
        <FireIcon className="w-[150px] h-[150px]" />
        {/* social links */}
        <h3 className=" text-[18px]  font-[600] text-black dark:text-white  ">
          Social links
        </h3>
        <div className="flex justify-start items-center gap-[10px] pt-[10px]">
          {socialLinksObj.map(({ icon, link }) => {
            return (
              <Link key={link} href={link} target={"_blank"}>
                <span className="w-[40px] h-[40px] rounded-full bg-white  hover:bg-slate-500 flex justify-center items-center cursor-pointer">
                  {icon}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
      {/* company & resource links */}
      <div className=" max-mobile:w-[100%] flex justify-evenly mobile:justify-center  mobile:items-center  mobile:gap-[100px]">
        <div className="flex flex-col items-center justify-start">
          <CompanyLink />
        </div>
        <div className="flex flex-col items-center justify-start">
          <CompanyLink />
        </div>
      </div>
    </div>
  );
}
