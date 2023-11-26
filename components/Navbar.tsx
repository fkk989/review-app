"use client";
import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarContent,
  NavbarItem,
  Link,
} from "@nextui-org/react";
import { FireIcon } from "@heroicons/react/24/solid";
import { AvatarDropDown } from "./nav/AvatarDropDown";
import { ThemeSwitcher } from "./buttons/ThemeSwitcher";
import { NavMenu } from "./nav/NavMenu";
import { usePathname, useParams, useRouter } from "next/navigation";

export function NavBar() {
  const path = usePathname();
  const param = usePathname();
  const navigate = useRouter();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  // {path === "/services"  ||  path === `/services/${param}` ? "secondary" : "foreground"}
  return (
    <Navbar
      isBlurred
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      className=" text-white"
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
          <p className="font-bold text-inherit text-black dark:text-white">
            ACME
          </p>
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
          <p className="font-bold text-inherit text-black dark:text-white">
            ACME
          </p>
        </NavbarBrand>

        <NavbarItem
          isActive={
            path === "/services" || path === `/services/${param}` ? true : false
          }
        >
          Services
        </NavbarItem>
        <NavbarItem isActive={path === "/review" ? true : false}>
          <Link
            href="review"
            color={path === "/review" ? "secondary" : "foreground"}
          >
            Customer Review
          </Link>
        </NavbarItem>
        <NavbarItem isActive={path === "/order" ? true : false}>
          <Link
            href="order"
            color={path === "/order" ? "secondary" : "foreground"}
          >
            Check Order
          </Link>
        </NavbarItem>
        <NavbarItem isActive={path === "/support" ? true : false}>
          <Link
            href="support"
            color={path === "/support" ? "secondary" : "foreground"}
          >
            Support
          </Link>
        </NavbarItem>
        <NavbarItem isActive={path === "/getstarted" ? true : false}>
          <Link
            href="getstarted"
            color={path === "/getstarted" ? "secondary" : "foreground"}
          >
            Get Started
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <AvatarDropDown />
        <div className="hidden mobile:block">
          <ThemeSwitcher />
        </div>
      </NavbarContent>

      {/* nav menu in mobile */}
      <NavMenu />
    </Navbar>
  );
}
