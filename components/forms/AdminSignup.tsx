"use client";
import { useAddAdmin } from "@/hooks";
import {
  Input,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
} from "@nextui-org/react";
import { useState } from "react";

export function AdminSignup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { adminMutation } = useAddAdmin();
  return (
    <Card className="w-[350px] mobile:w-[500px]  flex flex-col items-center justify-start p-[20px] gap-[10px]">
      <CardHeader className="flex justify-center items-center text-[25px] font-[500]">
        Admin Sign up
      </CardHeader>
      <CardBody className="gap-[20px]">
        <Input
          onChange={(e) => {
            setName(e.target.value);
          }}
          type="text"
          label="Name"
        />
        <Input
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          type="text"
          label="Email"
        />
        <Input
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          type="text"
          label="Password"
        />
      </CardBody>
      <CardFooter className="flex justify-center items-center">
        <Button
          onClick={() => {
            adminMutation.mutate({ email, password, name });
          }}
          color="primary"
          className="w-[100%] h-[50px] text-[18px] font-[500]"
        >
          Submit
        </Button>
      </CardFooter>
    </Card>
  );
}
