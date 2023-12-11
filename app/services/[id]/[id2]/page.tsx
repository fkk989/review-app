"use client";
import { Button } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { GiCheckMark } from "react-icons/gi";
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
import { useGetServiceById } from "@/hooks/service";
import toast from "react-hot-toast";
import { useRecoilValue } from "recoil";
import { handleCheckout, userAtom } from "@/store";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { User } from "@prisma/client";
// function
export default function pages({
  params,
}: {
  params: { id: string; id2: string };
}) {
  const navigate = useRouter();
  const { serviceByIdQuery } = useGetServiceById(params.id2);
  const iconsObj: {
    [key: string]: {
      icon: React.ReactNode;
      bgColor: string;
    };
  } = {
    instagram: {
      icon: <FaInstagram className="text-white" />,

      bgColor: "linear-gradient(115deg, #f9ce34, #ee2a7b, #6228d7)",
    },
    tiktok: {
      icon: <FaTiktok className=" text-white" />,

      bgColor: "#241217",
    },
    youtube: {
      icon: <FaYoutube className=" text-[#E93323]" />,

      bgColor: "black",
    },
    twitter: {
      icon: <FaTwitter className=" text-white" />,

      bgColor: "#2CAAF3",
    },
    linkedin: {
      icon: <FaLinkedin className=" text-white" />,

      bgColor: "#3075AF",
    },
    facebook: {
      icon: <FaFacebook className=" text-white" />,

      bgColor: "#415993",
    },
    twitch: {
      icon: <FaTwitch className="" />,

      bgColor: "#5E459F",
    },
    spotify: {
      icon: <FaSpotify className=" text-white" />,

      bgColor: "#57B560",
    },
    googlereview: {
      icon: <FiMessageCircle className=" text-white" />,

      bgColor: "#AB7428",
    },
    telegram: {
      icon: <FaTelegram className=" text-white" />,

      bgColor: "#2CAAF3",
    },
    discord: {
      icon: <FaDiscord className=" text-white" />,

      bgColor: "#7389DB",
    },
    extra: {
      icon: <FaYoutube className="" />,
      bgColor: "#241217",
    },
  };
  const queryClient = useQueryClient();
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [tempQunatity, setTempQuantity] = useState(0);
  const [tempPrice, setTempPrice] = useState(0);
  const [icon, setIcon] = useState(params.id);
  const isUser = useRecoilValue(userAtom);

  useEffect(() => {
    if (serviceByIdQuery.data) {
      console.log(serviceByIdQuery.data.service);
      const price = parseInt(serviceByIdQuery.data.service.price);
      const quantity = parseInt(serviceByIdQuery.data.service.quantity);
      setPrice(price);
      setTempPrice(price);
      setQuantity(quantity);
      setTempQuantity(quantity);
    }
  }, [serviceByIdQuery.data]);

  const userData = queryClient.getQueryData(["get-user"]) as {
    user: User;
  };

  return (
    <div className="w-screen min-h-screen flex justify-center  ">
      <div className=" w-[80vw] mobile:w-screen flex flex-col items-center">
        {/* title */}
        <h2 className="mt-[30px] mobile:mt-[150px] bg-[#EDF2F6] text-black dark:text-white p-[5px] text-[14px] font-bold rounded-md uppercase ">
          buy {params.id} {params.id2}
        </h2>
        {/* description  */}
        <div className="flex flex-col text-center mt-[30px] gap-[10px]">
          <p className="  text-[22px] mobile:text-[30px] text-[#383838] font-bold capitalize">
            buy {params.id} {serviceByIdQuery.data?.service.service} with
            <span className="text-[#B67929]"> fast delivery</span>
          </p>
          <p className=" text-[18px] mobile:text-[20px] text-[#383838] font-[400] capitalize">
            with g meta you can easily buy {params.id}{" "}
            {serviceByIdQuery.data?.service.service} safely and securely.
          </p>
        </div>

        {/* set quantity button */}
        <p className=" text-[20px] text-[#383838]  capitalize  mt-[50px] mb-[10px] font-[500]">
          select the quantity
        </p>
        <div className=" w-[90vw] tab:w-[50vw] pc:w-[40vw] flex justify-between items-center bg-[#D4D4D8] rounded-md  p-[5px]">
          <Button
            onClick={() => {
              if (tempQunatity > 100) {
                setTempQuantity(tempQunatity - quantity);

                setTempPrice(tempPrice - price);
              }
              if (tempQunatity === 100) {
                toast.error(`${quantity} is the minimum quantity`);
              }
            }}
            className=" flex justify-center"
            startContent={<FaMinus />}
          ></Button>
          {/* quantity and icon */}
          <div className="flex justify-center items-center gap-[10px]">
            <div
              className="p-[1px]"
              style={{
                background: iconsObj[icon].bgColor,
              }}
            >
              {iconsObj[icon].icon}
            </div>

            <div>
              {tempQunatity} {serviceByIdQuery.data?.service.service}
              <span className="text-[18px] ml-[5px]">(</span>
              {tempPrice}$<span className="text-[18px]">)</span>
            </div>
          </div>
          <Button
            onClick={() => {
              setTempQuantity(tempQunatity + quantity);

              setTempPrice(tempPrice + price);
            }}
            className="flex justify-center"
            endContent={<FaPlus />}
          ></Button>
        </div>

        {/* buy now button */}
        <Button
          onClick={() => {
            if (!isUser) {
              navigate.push("/login");
              return toast.error("login to buy");
            }
            handleCheckout(
              {
                serviceId: serviceByIdQuery.data!.service.id,
                quantity: tempQunatity,
              },
              {
                email: userData.user.email,
                name: userData.user.name,
                phone: userData.user.phone,
              }
            );
          }}
          className="w-[200px] h-[50px] mt-[60px]  font-[600] uppercase bg-[#B67929] text-white"
        >
          buy now <span className="text-[18px]">(</span>
          {tempPrice}$<span className="text-[18px]">)</span>
        </Button>

        {/* info div */}
        <div className="w-[80vw] pc:w-[60vw] mobile:h-[70px] p-[10px]  flex justify-evenly items-center  border-[#B67929] border-[1px] rounded-lg mt-[40px] mobile:mt-[100px]">
          <div className=" flex  max-mobile:flex-col  justify-center items-center gap-[20px] capitalize text-[16px] font-[500]">
            <div className="font-bold">
              high quality {serviceByIdQuery.data?.service.service} includes:
            </div>
            <div className="flex justify-center items-center gap-[5px]">
              {" "}
              <GiCheckMark /> Real High-Quality
              <span className="text-[16px] font-[400]">
                {serviceByIdQuery.data?.service.service}
              </span>
            </div>
            <div className="flex justify-center items-center gap-[5px]">
              {" "}
              <GiCheckMark /> Real High-Quality
              <span className="text-[16px] font-[400]">
                {serviceByIdQuery.data?.service.service}
              </span>
            </div>
            <div className="flex justify-center items-center gap-[5px]">
              {" "}
              <GiCheckMark /> Real High-Quality
              <span className="text-[16px] font-[400]">
                {serviceByIdQuery.data?.service.service}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
