"use client";
import { useAddOrUpdateService } from "@/hooks/service";
import {
  Input,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Checkbox,
  Button,
} from "@nextui-org/react";
import { useRef, useState } from "react";
import toast from "react-hot-toast";

export function Service({
  cardTitle,
  url,
}: {
  cardTitle: string;
  url: string;
}) {
  const [social, setSocial] = useState("");
  const [title, setTitle] = useState("");
  const [service, setService] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);

  const socialObj = [
    "instagram",
    "tiktok",
    "youtube",
    "twitter",
    "linkedin",
    "facebook",
    "twitch",
    "spotify",
    "google-review",
    "telegram",
    "discord",
  ];

  const { serviceMutation } = useAddOrUpdateService(setLoading, url);
  return (
    <Card className="mobile:w-[500px]  flex flex-col items-center justify-start p-[20px] gap-[10px]">
      <CardHeader className="flex justify-center items-center text-[25px] font-[500]">
        {cardTitle}
      </CardHeader>
      <CardBody className="gap-[20px]">
        <Input
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          type="text"
          label="title"
        />
        <Input
          onChange={(e) => {
            setService(e.target.value);
          }}
          type="text"
          label="service"
        />
        <Input
          onChange={(e) => {
            const quantity = e.target.value;
            setQuantity(quantity);
          }}
          type="text"
          label="quantity"
        />
        <Input
          onChange={(e) => {
            const price = e.target.value;
            setPrice(price);
          }}
          type="text"
          label="price"
        />
        <div className="grid grid-cols-12 gap-[5px] ">
          {socialObj.map((socialtype) => {
            return (
              <Checkbox
                disableAnimation
                onClick={() => {
                  setSocial(socialtype);
                }}
                isSelected={social === socialtype ? true : false}
                className=" col-span-4"
                value={socialtype}
              >
                {socialtype}
              </Checkbox>
            );
          })}
        </div>
      </CardBody>
      <CardFooter className="flex justify-center items-center">
        <Button
          isLoading={loading}
          onClick={() => {
            try {
              setLoading(true);
              serviceMutation.mutate({
                title,
                service,
                social,
                quantity,
                price,
              });
            } catch (e: any) {
              toast.error(e.message);
            }
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
