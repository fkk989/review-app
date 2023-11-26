"use client";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";
import { FaInstagram, FaTiktok, FaTwitter, FaYoutube } from "react-icons/fa";
export function SocialButtons() {
  const navgate = useRouter();

  return (
    <div className="w-[60vw] flex flex-wrap justify-center gap-[10px] mobile:justify-between items-center mt-[50px] ">
      <Button
        onClick={() => {
          navgate.push("/services/instagram");
        }}
        className="bg-[#C243F4] w-[180px] h-[60px] font-[600] text-white"
        radius={"full"}
        startContent={<FaInstagram />}
      >
        Instagram Services
      </Button>

      <Button
        onClick={() => {
          navgate.push("/services/twitter");
        }}
        className="bg-[#2CAAF3] w-[180px] h-[60px] font-[600] text-white "
        radius={"full"}
        startContent={<FaTwitter />}
      >
        Twitter Services
      </Button>
      <Button
        onClick={() => {
          navgate.push("/services/youtube");
        }}
        className="bg-[#EA3323] w-[180px] h-[60px] font-[600] text-white "
        radius={"full"}
        startContent={<FaYoutube />}
      >
        Youtube Services
      </Button>
      <Button
        onClick={() => {
          navgate.push("/services/tiktok");
        }}
        className="bg-[#241217] w-[180px] h-[60px] font-[600] text-white "
        radius={"full"}
        startContent={<FaTiktok />}
      >
        TikTok Services
      </Button>
    </div>
  );
}
