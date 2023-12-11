import { prismaClient } from "@/clients";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
const getSerivceInput = z.object({
  social: z.string().max(50),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const parsedInput = await getSerivceInput.safeParse(body);

    if (!parsedInput.success) {
      return NextResponse.json(
        {
          success: false,
          message: "invalid social type",
        },
        {
          status: 422,
        }
      );
    }

    const { social } = parsedInput.data;

    //  finding services
    const services = await prismaClient.service.findMany({ where: { social } });

    if (!services) {
      return NextResponse.json(
        {
          success: false,
          message: "no services found",
        },
        {
          status: 400,
        }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "successfully fetched services",
        services,
      },
      {
        status: 200,
      }
    );
  } catch (e: any) {
    return NextResponse.json(
      {
        success: false,
        message: e.message,
      },
      {
        status: 400,
      }
    );
  }
}
