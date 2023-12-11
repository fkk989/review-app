"use client";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown";
import { Avatar } from "@nextui-org/avatar";
import { useGetAdmin, useGetUser } from "@/hooks";
import { useEffect } from "react";
import axios from "axios";
import { adminAtom, backendApiUrl, userAtom } from "@/store";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useRecoilState } from "recoil";
import { set } from "zod";
import { useQueryClient } from "@tanstack/react-query";

export const AvatarDropDown = () => {
  const queryClient = useQueryClient();
  const navigate = useRouter();
  const { getAdminQuery } = useGetAdmin();
  const { getUserQuery } = useGetUser();
  const [isAdmin, setIsAdmin] = useRecoilState(adminAtom);
  const [isUser, setIsUser] = useRecoilState(userAtom);

  useEffect(() => {
    if (getAdminQuery.isSuccess) {
      setIsAdmin(true);
    }
    if (getUserQuery.isSuccess) {
      setIsUser(true);
    }
  });
  return (
    <Dropdown>
      <DropdownTrigger>
        <Avatar className="cursor-pointer" />
      </DropdownTrigger>
      {/* show  when admin */}
      {isAdmin && (
        <DropdownMenu aria-label="Dynamic Actions">
          <DropdownItem
            onClick={() => {
              navigate.push("/dashboard/addservice");
            }}
            key={"Add-Service"}
            color={"default"}
            className=""
          >
            Add Serivce
          </DropdownItem>
          <DropdownItem
            onClick={() => {
              navigate.push("/dashboard/addadmin");
            }}
            key={"Add-Admin"}
            color={"default"}
            className=""
          >
            Add Admin
          </DropdownItem>
          <DropdownItem
            onClick={async () => {
              try {
                const res = await axios.get(`${backendApiUrl}/admin/logout`);
                queryClient.clear();
                setIsAdmin(false);
                navigate.push("/");
              } catch (e: any) {
                toast.error("error while login out");
              }
            }}
            key={"delete"}
            color="danger"
            className=" text-danger"
          >
            Log out
          </DropdownItem>
        </DropdownMenu>
      )}
      {/* show when user */}
      {isUser && (
        <DropdownMenu aria-label="Dynamic Actions">
          <DropdownItem key={"checkorder"} color={"default"}>
            check order
          </DropdownItem>
          <DropdownItem
            onClick={async () => {
              try {
                const res = await axios.get(`${backendApiUrl}/user/logout`);
                queryClient.clear();
                setIsUser(false);
                navigate.push("/");
              } catch (e: any) {
                toast.error("error while login out");
              }
            }}
            key={"delete"}
            color="danger"
            className=" text-danger"
          >
            Log out
          </DropdownItem>
        </DropdownMenu>
      )}
      {/* show to new use of when you logout */}
      {!isAdmin && !isUser && (
        <DropdownMenu aria-label="Dynamic Actions">
          <DropdownItem
            onClick={async () => {
              navigate.push("/dashboard/adminlogin");
            }}
            key={"admin"}
            color={"danger"}
            className={"text-danger"}
          >
            admin
          </DropdownItem>
          <DropdownItem
            onClick={async () => {
              navigate.push("/login");
            }}
            key={"login"}
            color="primary"
            className=" text-primary"
          >
            Log in
          </DropdownItem>
          <DropdownItem
            onClick={async () => {
              navigate.push("/signup");
            }}
            key={"signup"}
            color="primary"
            className=" text-primary"
          >
            Sign up
          </DropdownItem>
        </DropdownMenu>
      )}
    </Dropdown>
  );
};
