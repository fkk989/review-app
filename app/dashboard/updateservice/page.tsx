import { Service } from "@/components";
import React from "react";

export default function AddService() {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Service cardTitle={"Update Serivce"} url={"service/update"} />
    </div>
  );
}
