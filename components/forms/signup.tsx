"use client";
import { useUserSignUp } from "@/hooks";
import {
  Input,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function UserSignup() {
  const navigate = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [loading, setLoading] = useState(false);

  const { userMutation } = useUserSignUp(setLoading);

  return (
    <Card className="w-[350px] mobile:w-[500px]  flex flex-col items-center justify-start p-[20px] gap-[10px]">
      <CardHeader className="flex justify-center items-center text-[25px] font-[500]">
        sign up
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
        <Input
          onChange={(e) => {
            setPhone(e.target.value);
          }}
          type="text"
          label="Phone"
        />
        <Input
          onChange={(e) => {
            setCountry(e.target.value);
          }}
          type="text"
          label="Country"
        />
      </CardBody>
      <CardFooter className="flex flex-col justify-center items-center gap-[10px]">
        <Button
          isLoading={loading}
          onClick={() => {
            setLoading(true);
            userMutation.mutate({ name, email, password, phone, country });
          }}
          color="primary"
          className="w-[100%] h-[50px] text-[18px] font-[500]"
        >
          Submit
        </Button>
        <div
          className=" w-[100%] flex justify-end items-center cursor-pointer gap-[5px]"
          onClick={() => {
            navigate.push("/login");
          }}
        >
          Already have a account!
          <span className="text-[18px] text-[#0070EF] ">Log in</span>
        </div>
      </CardFooter>
    </Card>
  );
}
