"use client";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Input,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/react";
import { FireIcon } from "@heroicons/react/24/solid";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { ThemeSwitcher } from "./buttons/ThemeSwitcher";
import { AvatarDropDown } from "./nav/AvatarDropDown";
import { useRouter } from "next/router";
import { useParams } from "next/navigation";
import { usePathname } from "next/navigation";
import { useState } from "react";

export function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
  ];
  return (
    <Navbar isBordered isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent justify={"start"}>
        <NavbarBrand className="mr-4">
          <FireIcon width={25} height={25} />
          <p className="hidden sm:block font-bold text-inherit">ACME</p>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-[30px]" justify="center">
          <NavbarItem>Home</NavbarItem>
          <NavbarItem>Services</NavbarItem>
          <NavbarItem>Customers Reviews</NavbarItem>
          <NavbarItem>Check Order</NavbarItem>
        </NavbarContent>
      </NavbarContent>

      <NavbarContent as="div" className="items-center" justify="end">
        <AvatarDropDown />
        <ThemeSwitcher />
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full"
              color={
                index === 2
                  ? "warning"
                  : index === menuItems.length - 1
                  ? "danger"
                  : "foreground"
              }
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
