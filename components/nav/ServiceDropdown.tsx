"use client";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
} from "@nextui-org/dropdown";
import { Button } from "@nextui-org/button";
import { IoIosArrowDown } from "react-icons/io";
import { usePathname, useParams, useRouter } from "next/navigation";

export function ServiceDropdown() {
  const serviceDropDownObj: Array<{ title: string; link: string }> = [
    {
      title: "instagram",
      link: "instagram",
    },
    {
      title: "tik tok",
      link: "tiktok",
    },
    {
      title: "youtube",
      link: "youtube",
    },
    {
      title: "twitter",
      link: "twitter",
    },
    {
      title: "linkedIn",
      link: "linkedin",
    },
    {
      title: "facebook",
      link: "facebook",
    },
    {
      title: "twitch",
      link: "twitch",
    },
    {
      title: "spotify",
      link: "spotify",
    },
    {
      title: "google",
      link: "google",
    },
    {
      title: "telegram",
      link: "telegram",
    },
    {
      title: "discord",
      link: "discord",
    },
    {
      title: "extra",
      link: "extra",
    },
  ];
  const path = usePathname();
  const param = useParams();
  const navigate = useRouter();
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button endContent={<IoIosArrowDown />} variant={"light"}>
          <div
            className={
              path === "/services" || path === `/services/${param}`
                ? " text-purple-500"
                : ""
            }
          >
            Services
          </div>
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        {serviceDropDownObj.map(({ title, link }) => {
          return (
            <DropdownItem
              className="text-black dark:text-white capitalize"
              key={title}
              onClick={() => {
                navigate.push(`/services/${link}`);
              }}
            >
              {title}
            </DropdownItem>
          );
        })}
      </DropdownMenu>
    </Dropdown>
  );
}
