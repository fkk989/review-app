"use client";
import { useUserLogin } from "@/hooks";
import { userAtom } from "@/store";
import {
  Input,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
} from "@nextui-org/react";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRecoilState, useSetRecoilState } from "recoil";

export function UserLoginForm() {
  const queryClient = useQueryClient();
  const navigate = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { userLoginQuery } = useUserLogin({ email, password });
  const setIsUser = useSetRecoilState(userAtom);

  useEffect(() => {
    if (userLoginQuery.isSuccess) {
      setIsUser(true);
      setLoading(false);
      navigate.back();
    }
    if (userLoginQuery.isError) {
      queryClient.clear();
      toast.error("error", { id: "user-login" });
      setLoading(false);
    }
  });

  return (
    <Card className="w-[350px] mobile:w-[500px]  flex flex-col items-center justify-start p-[20px] gap-[10px]">
      <CardHeader className="flex justify-center items-center text-[25px] font-[500]">
        Log in
      </CardHeader>
      <CardBody className="gap-[20px]">
        <Input
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          type="email"
          label="Email"
        />
        <Input
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          type="password"
          label="Password"
        />
      </CardBody>
      <CardFooter className="flex flex-col justify-center items-center gap-[10px]">
        <Button
          isLoading={loading}
          onClick={() => {
            setLoading(true);
            userLoginQuery.refetch();
          }}
          color="primary"
          className="w-[100%] h-[50px] text-[18px] font-[500]"
        >
          Submit
        </Button>

        <div
          className=" w-[100%] flex justify-end items-center cursor-pointer gap-[5px]"
          onClick={() => {
            navigate.push("/signup");
          }}
        >
          Don't have a account!
          <span className="text-[18px] text-[#0070EF] ">Sign up</span>
        </div>
      </CardFooter>
    </Card>
  );
}
