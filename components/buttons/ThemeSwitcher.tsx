"use client";
import { useEffect, useState } from "react";
import { Button } from "@nextui-org/button";
import { useTheme } from "next-themes";
import { IoSunny, IoMoon } from "react-icons/io5";

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;
  if (mounted)
    return (
      <div className="flex gap-4">
        {theme === "dark" && (
          <Button
            size={"sm"}
            variant={"flat"}
            onClick={() => setTheme("light")}
          >
            <IoSunny className="w-[25px] h-[25px] text-orange-300" />
          </Button>
        )}
        {theme === "light" && (
          <Button size={"sm"} variant={"flat"} onClick={() => setTheme("dark")}>
            <IoMoon className="w-[25px] h-[25px] text-black" />
          </Button>
        )}
      </div>
    );
};
