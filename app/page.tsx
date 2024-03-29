"use client";
import { Image } from "@nextui-org/image";
import { FiMessageCircle } from "react-icons/fi";

import { SocialButtons, SocialCard } from "@/components";
import {
  FaDiscord,
  FaFacebook,
  FaHeart,
  FaInstagram,
  FaLinkedin,
  FaPlay,
  FaSpotify,
  FaTelegram,
  FaTiktok,
  FaTwitch,
  FaTwitter,
  FaUserAlt,
  FaYoutube,
} from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { useRouter } from "next/navigation";
export default function Home() {
  const navigate = useRouter();
  const socialCardObj: Array<{
    title: string;
    icon: React.ReactNode;
    param: string;
    bgColor: string;
    titleColor?: string;
  }> = [
    {
      title: "instagram",
      icon: <FaInstagram className="w-[50px] h-[50px]" />,
      param: "instagram",
      bgColor: "linear-gradient(115deg, #f9ce34, #ee2a7b, #6228d7)",
    },
    {
      title: "tik tok",
      icon: <FaTiktok className="w-[50px] h-[50px] text-white" />,
      param: "tiktok",
      bgColor: "#241217",
    },
    {
      title: "youtube",
      icon: <FaYoutube className="w-[50px] h-[50px] text-[#E93323]" />,
      param: "youtube",
      bgColor: "black",
    },
    {
      title: "twitter",
      icon: <FaTwitter className="w-[50px] h-[50px] text-white" />,
      param: "twitter",
      bgColor: "#2CAAF3",
    },
    {
      title: "linked In",
      icon: <FaLinkedin className="w-[50px] h-[50px] text-white" />,
      param: "linkedin",
      bgColor: "#3075AF",
    },
    {
      title: "facebook",
      icon: <FaFacebook className="w-[50px] h-[50px] text-white" />,
      param: "facebook",
      bgColor: "#415993",
    },
    {
      title: "twitch",
      icon: <FaTwitch className="w-[50px] h-[50px]" />,
      param: "twitch",
      bgColor: "#5E459F",
    },
    {
      title: "spotify",
      icon: <FaSpotify className="w-[50px] h-[50px] text-white" />,
      param: "spotify",
      bgColor: "#57B560",
    },
    {
      title: "google",
      icon: <FiMessageCircle className="w-[50px] h-[50px] text-white" />,
      param: "googlereview",
      bgColor: "#AB7428",
    },
    {
      title: "telegram",
      icon: <FaTelegram className="w-[50px] h-[50px] text-white" />,
      param: "telegram",
      bgColor: "#2CAAF3",
    },
    {
      title: "discord",
      icon: <FaDiscord className="w-[50px] h-[50px] text-white" />,
      param: "discord",
      bgColor: "#7389DB",
    },
    {
      title: "extra",
      icon: <FaYoutube className="w-[50px] h-[50px]" />,
      param: "extra",
      bgColor: "#241217",
    },
  ];

  return (
    <main className="w-screen flex flex-col  items-center  bg-white text-[#383838] dark:bg-black dark:text-white">
      {/* heading */}
      <div className="flex justify-center items-center gap-[20px] mt-[40px] mobile:mt-[100px]">
        <h1 className="capitalize text-[22px] mobile:text-[50px] font-bold">
          lets grow your socials
        </h1>
        <Image src="/love.png" width={50} height={50} radius="none" />
      </div>
      {/* para */}
      <div className=" w-[81vw] mobile:w-[35vw] text-center mt-[15px]">
        Growing your social media should mean using a reputable company who can
        get you results. This is why we started Growthoid. Choose below what
        platform you want to grow.
      </div>

      {/* services button */}
      <SocialButtons />
      {/* rating */}
      <div className="max-mobile:w-[80vw] text-center mt-[20px]">
        ⚡ Rated 4.7/5 Stars & serving happy customers since 2013
      </div>

      <div className=" w-[80vw] flex   max-mobile:flex-col text-center justify-center items-center gap-[20px] mt-[100px] ">
        <h2 className="capitalize text-[20px] mobile:text-[30px] font-bold ">
          you just create the account and leave the rest to us
        </h2>
        <Image src="/brainbulb.png" width={50} height={50} radius="none" />
      </div>
      {/* para */}
      <div className="w-[80vw] mobile:w-[50vw] text-center mt-[15px]">
        Our clients asked, and we listened! We now support other popular social
        platforms helping you grow your followers likes, views and more on other
        major social medias like: Instagram, TikTok, YouTube and more!
      </div>

      {/* list of services */}
      <div className="w-screen flex justify-center items-center">
        <div className="w-[50vw] grid grid-cols-12 gap-[20px] mt-[50px] place-items-center ">
          {socialCardObj.map(({ title, icon, param, bgColor, titleColor }) => {
            return (
              <div
                key={title}
                onClick={() => {
                  navigate.push(`/services/${param}`);
                }}
                className="border-none  col-span-6 mobile:col-span-3 cursor-pointer"
              >
                <SocialCard
                  width="100px"
                  height="100px"
                  title={title}
                  icon={icon}
                  bgColor={bgColor}
                  titleColor={titleColor}
                  alignItems="start"
                  paddingTop="10px"
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* most used services */}
      <div className="flex flex-col justify-center items-center gap-[10px] mt-[100px]">
        <h2 className="capitalize text-[30px] font-bold">Most used services</h2>
        <div
          className="flex justify-center items-center rounded-md w-[60px] h-[60px] mobile:w-[90px] mobile:h-[90px] cursor-pointer"
          style={{
            background: "linear-gradient(115deg, #f9ce34, #ee2a7b, #6228d7)",
          }}
          onClick={() => navigate.push("/services/instagram")}
        >
          <FaInstagram className="w-[50px] h-[50px] mobile:w-[80px] mobile:h-[80px] text-white " />
        </div>

        <div className="flex max-mobile:flex-col gap-[25px] mt-[20px]">
          <div onClick={() => navigate.push("/services/instagram/followers")}>
            <SocialCard
              key={"insta-followers"}
              width="220px"
              height="160px"
              title="Get Insta Followers"
              icon={<FaUserAlt className="w-[90px] h-[90px]" />}
              bgColor="#21A567"
              titleColor="black"
              alignItems="start"
              paddingTop="20px"
            />
          </div>
          <div onClick={() => navigate.push("/services/instagram/likes")}>
            <SocialCard
              key={"insta-like"}
              width="220px"
              height="160px"
              title="Get Insta Likes"
              icon={<FaHeart className="w-[90px] h-[90px] text-white" />}
              bgColor="#D04544"
              titleColor=""
              alignItems="start"
              paddingTop="20px"
            />
          </div>
          <div onClick={() => navigate.push("/services/instagram/views")}>
            <SocialCard
              key={"insta-views"}
              width="220px"
              height="160px"
              title="Get Insta Views"
              icon={<FaPlay className="w-[90px] h-[90px] text-white" />}
              bgColor="#241217"
              titleColor=""
              alignItems="start"
              paddingTop="20px"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
