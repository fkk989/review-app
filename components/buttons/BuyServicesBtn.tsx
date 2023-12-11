"use client";
import { Button } from "@nextui-org/react";
import React from "react";

export function BuyServicesBtn({
  onClick,
  title,
  icon,
  isLoading,
}: {
  title: string;
  icon: React.ReactNode;
  onClick?: () => void;
  isLoading?: boolean;
}) {
  return (
    <Button
      isLoading={isLoading}
      onClick={onClick}
      startContent={icon}
      className="w-[280px] min-h-[60px] capitalize text-white buy-btns"
    >
      {title}
    </Button>
  );
}
