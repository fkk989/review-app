"use client";
import { useAdminLogin } from "@/hooks";
import { adminAtom } from "@/store";
import {
  Input,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Checkbox,
  Button,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useRecoilState, useSetRecoilState } from "recoil";

export function AdminLoginForm() {
  const navigate = useRouter();
  const queryClient = useQueryClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { adminLoginQuery, isSuccess, isError } = useAdminLogin({
    email,
    password,
  });
  const setIsAdmin = useSetRecoilState(adminAtom);

  useEffect(() => {
    if (adminLoginQuery.isSuccess) {
      setIsAdmin(true);
      setLoading(false);
      navigate.push("/");
    }
    if (adminLoginQuery.isError) {
      queryClient.clear();
      toast.error("error", { id: "admin-login" });
      setLoading(false);
    }
  });

  return (
    <Card className="w-[350px] mobile:w-[500px]  flex flex-col items-center justify-start p-[20px] gap-[10px]">
      <CardHeader className="flex justify-center items-center text-[25px] font-[500]">
        Admin login
      </CardHeader>
      <CardBody className="gap-[20px]">
        <Input
          prefix=""
          color={"default"}
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
            adminLoginQuery.refetch();
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
