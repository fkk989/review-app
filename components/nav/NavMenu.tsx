"use client";
import { Link, NavbarMenu, NavbarMenuItem } from "@nextui-org/react";
import { ThemeSwitcher } from "../buttons/ThemeSwitcher";

export function NavMenu() {
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
    <NavbarMenu
      className="light:bg-[#B3B2B2]"
      style={{
        borderTop: "1px solid white",
      }}
    >
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
      <ThemeSwitcher />
    </NavbarMenu>
  );
}
