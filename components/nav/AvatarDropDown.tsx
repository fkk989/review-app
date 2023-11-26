"use client";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown";
import { Button } from "@nextui-org/button";
import { Avatar } from "@nextui-org/avatar";

export const AvatarDropDown = () => {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Avatar
          src="https://pbs.twimg.com/profile_images/1701243463491051520/RXRvWZ3R_400x400.jpg"
          className="cursor-pointer"
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="Dynamic Actions">
        <DropdownItem key={"delete"} color="danger" className=" text-danger">
          Log out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
