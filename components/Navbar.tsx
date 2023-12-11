"use client";
import React, { useEffect } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/navbar";

import { FireIcon } from "@heroicons/react/24/solid";
import { AvatarDropDown } from "./nav/AvatarDropDown";
import { ThemeSwitcher } from "./buttons/ThemeSwitcher";
import { NavMenu } from "./nav/NavMenu";
import { usePathname, useParams, useRouter } from "next/navigation";
import { ServiceDropdown } from "./nav/ServiceDropdown";
import { Button } from "@nextui-org/react";
import { useRecoilValue } from "recoil";
import { adminAtom, userAtom } from "@/store";
import { useQueryClient } from "@tanstack/react-query";
import { Admin, User } from "@prisma/client";

export function NavBar() {
  const queryClient = useQueryClient();
  const adminData = queryClient.getQueryData(["get-admin"]) as { admin: Admin };
  const userData = queryClient.getQueryData(["get-user"]) as { user: User };

  const path = usePathname();
  const param = usePathname();
  const navigate = useRouter();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const isUser = useRecoilValue(userAtom);
  const isAdmin = useRecoilValue(adminAtom);

  const navItemObj: Array<{
    component?: React.ReactNode;
    title?: string;
    linkPath: string;
  }> = [
    {
      component: <ServiceDropdown />,
      title: "services",
      linkPath: "services",
    },
    {
      title: "customer review",
      linkPath: "review",
    },
    {
      title: "my order",
      linkPath: "orders",
    },
    {
      title: "support",
      linkPath: "support",
    },
    {
      title: "get started",
      linkPath: "getstarted",
    },
  ];

  return (
    <Navbar
      shouldHideOnScroll
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-3" justify="start">
        <NavbarBrand
          onClick={() => {
            navigate.push("/");
          }}
          className="cursor-pointer"
        >
          <FireIcon
            width={25}
            height={25}
            className="text-black dark:text-white"
          />
          <p className="font-bold  text-black dark:text-white">ACME</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="end">
        <NavbarBrand
          onClick={() => {
            navigate.push("/");
          }}
          className="cursor-pointer"
        >
          <FireIcon
            width={25}
            height={25}
            className="text-black dark:text-white"
          />
          <p className="font-bold  text-black dark:text-white">ACME</p>
        </NavbarBrand>

        {navItemObj.map(({ component, title, linkPath }) => {
          if (!component) {
            return (
              <NavbarItem
                key={title}
                onClick={() => {
                  navigate.push(`/${linkPath}`);
                }}
                isActive={path === `/${path}` ? true : false}
                className={`${
                  path === `/${linkPath}` ||
                  linkPath === `/${linkPath}/${param}`
                    ? "text-purple-500"
                    : "text-black dark:text-white"
                } cursor-pointer`}
              >
                {title}
              </NavbarItem>
            );
          } else {
            return (
              <NavbarItem
                key={title}
                isActive={linkPath === `/${linkPath}` ? true : false}
              >
                {component}
              </NavbarItem>
            );
          }
        })}
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="max-mobile:hidden">
          {adminData && `hello ${adminData.admin.name.split(" ")[0]}`}
          {userData && `hello ${userData.user.name.split(" ")[0]}`}
        </NavbarItem>
        <AvatarDropDown />
        <div className="hidden mobile:block">
          <ThemeSwitcher />
        </div>
        {!isUser && !isAdmin && (
          <>
            <Button
              onClick={() => {
                navigate.push("/login");
              }}
              color={"primary"}
              className="max-mobile:hidden"
            >
              Log in
            </Button>
            <Button
              onClick={() => {
                navigate.push("/signup");
              }}
              color={"primary"}
              className="max-mobile:hidden"
            >
              Sign up
            </Button>
          </>
        )}
      </NavbarContent>

      {/* nav menu in mobile */}
      <NavMenu />
    </Navbar>
  );
}
