"use client";
import { useEffect, useState } from "react";
import { Button } from "@nextui-org/button";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";
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
            <SunIcon width={25} height={25} color="orange" />
          </Button>
        )}
        {theme === "light" && (
          <Button size={"sm"} variant={"flat"} onClick={() => setTheme("dark")}>
            <MoonIcon width={25} height={25} color="black" />
          </Button>
        )}
      </div>
    );
};
