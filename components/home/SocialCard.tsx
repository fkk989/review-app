"use client";
import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
interface SocialCardProp {
  width: string;
  height: string;
  mobileWidth?: string;
  mobileHeight?: string;
  title: string;
  icon: React.ReactNode;
  param: string;
  bgColor: string;
  titleColor?: string;
  alignItems: string;
  paddingTop: string;
}
export function SocialCard({
  width,
  height,
  mobileWidth,
  mobileHeight,
  title,
  icon,
  param,
  bgColor,
  titleColor,
  alignItems,
  paddingTop,
}: SocialCardProp) {
  const navigate = useRouter();
  return (
    <Card
      onClick={() => {
        navigate.push(`/services/${param}`);
      }}
      isFooterBlurred
      radius="lg"
      className={`border-none  col-span-6 mobile:col-span-3 cursor-pointer ${mobileWidth} ${mobileHeight}`}
    >
      <div
        className=" flex justify-center  items-start"
        style={{
          background: bgColor,
          width: width,
          height: height,
          alignItems: alignItems,
          paddingTop: paddingTop,
        }}
      >
        {icon}
      </div>

      <CardFooter className=" justify-center before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
        <p
          className="text-tiny text-white/80 "
          style={{
            color: titleColor,
          }}
        >
          {title}
        </p>
      </CardFooter>
    </Card>
  );
}
