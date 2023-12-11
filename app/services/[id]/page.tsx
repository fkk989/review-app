"use client";
import { BuyServicesBtn } from "@/components/buttons/BuyServicesBtn";
import { useGetServices } from "@/hooks/service";
import { divider } from "@nextui-org/react";
import { Service } from "@prisma/client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import {
  FaDiscord,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaSpotify,
  FaTelegram,
  FaTiktok,
  FaTwitch,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { FiMessageCircle } from "react-icons/fi";

export default function page({ params }: { params: { id: string } }) {
  const navigate = useRouter();
  // getching serives
  const { serviceQuery } = useGetServices(params.id);

  useEffect(() => {
    console.log(serviceQuery.data);
  }, [serviceQuery.data]);

  const iconsObj: {
    [key: string]: {
      icon: React.ReactNode;
      bgColor: string;
    };
  } = {
    instagram: {
      icon: <FaInstagram className="text-[25px] text-white" />,

      bgColor: "linear-gradient(115deg, #f9ce34, #ee2a7b, #6228d7)",
    },
    tiktok: {
      icon: <FaTiktok className="text-[25px] text-white" />,

      bgColor: "#241217",
    },
    youtube: {
      icon: <FaYoutube className="text-[25px] text-[#E93323]" />,

      bgColor: "black",
    },
    twitter: {
      icon: <FaTwitter className="text-[25px] text-white" />,

      bgColor: "#2CAAF3",
    },
    linkedin: {
      icon: <FaLinkedin className="text-[25px] text-white" />,

      bgColor: "#3075AF",
    },
    facebook: {
      icon: <FaFacebook className="text-[25px] text-white" />,

      bgColor: "#415993",
    },
    twitch: {
      icon: <FaTwitch className="text-[25px]" />,

      bgColor: "#5E459F",
    },
    spotify: {
      icon: <FaSpotify className="text-[25px] text-white" />,

      bgColor: "#57B560",
    },
    googlereview: {
      icon: <FiMessageCircle className="text-[25px] text-white" />,

      bgColor: "#AB7428",
    },
    telegram: {
      icon: <FaTelegram className="text-[25px] text-white" />,

      bgColor: "#2CAAF3",
    },
    discord: {
      icon: <FaDiscord className="text-[25px] text-white" />,

      bgColor: "#7389DB",
    },
    extra: {
      icon: <FaYoutube className="text-[25px]" />,
      bgColor: "#241217",
    },
  };

  return (
    <div className="w-screen min-h-screen flex flex-col justify-start items-center bg-white dark:bg-black text-[#383838] dark:text-white ">
      <h1 className=" text-[25px] mobile:text-[40px] font-bold uppercase mt-[70px] text-center">
        {params.id} promotion services
      </h1>
      <p className="w-[80vw] mobile:w-[50vw] text-center mt-[10px]">
        Growthoid growth model ensures that your social media accounts grow
        consistently months after months without worrying about spam, fake bots.
      </p>
      {/* services type */}
      <div className="mt-[100px] flex flex-col justify-start items-center">
        <h2 className="text-[18px] mobile:text-[25px] font-[500] ">
          Buy Real {params.id} Promotions with quick delivery, choose below:
        </h2>

        <div className="flex flex-wrap justify-center tab:w-[70vw] pc:w-[60vw] items-center  gap-[20px] mt-[40px]  ">
          {serviceQuery.data && serviceQuery.data.services.length !== 0 ? (
            serviceQuery.data.services.map((serviceData: Service) => {
              return (
                <BuyServicesBtn
                  key={serviceData.id}
                  onClick={() => {
                    navigate.push(`/services/${params.id}/${serviceData.id}`);
                    console.log("clicked");
                  }}
                  title={serviceData.title}
                  icon={iconsObj[params.id].icon}
                />
              );
            })
          ) : (
            <>
              <BuyServicesBtn
                isLoading={true}
                key={"one"}
                title={""}
                icon={iconsObj[params.id].icon}
              />
              <BuyServicesBtn
                isLoading={true}
                key={"two"}
                title={""}
                icon={iconsObj[params.id].icon}
              />
              <BuyServicesBtn
                isLoading={true}
                key={"three"}
                title={""}
                icon={iconsObj[params.id].icon}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
