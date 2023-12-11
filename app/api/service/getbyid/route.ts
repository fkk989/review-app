import { prismaClient } from "@/clients";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
const getSerivceByIdInput = z.object({
  id: z.string().max(50),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const parsedInput = await getSerivceByIdInput.safeParse(body);

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

    const { id } = parsedInput.data;

    //  finding services
    const service = await prismaClient.service.findUnique({ where: { id } });

    if (!service) {
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
        message: "successfully fetched service",
        service,
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
