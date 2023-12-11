import { Service } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import JWT from "jsonwebtoken";
import { z } from "zod";
import { prismaClient } from "@/clients";

// JWT SECRET
const JWT_SECRET = process.env.JWT_SECRET;

const serviceInput = z.object({
  title: z.string(),
  service: z.string(),
  social: z.string(),
  quantity: z.string(),
  price: z.string(),
});

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const cookie = cookies();
    const token = cookie.get("g-meta-admin-token");

    // if not token found
    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: "not authorized",
          admin: null,
        },
        {
          status: 400,
        }
      );
    }

    // verifing token
    const adminToken = (await JWT.verify(token.value, JWT_SECRET)) as {
      email: string;
    };
    const { email } = adminToken;

    if (!adminToken || !email) {
      return NextResponse.json(
        {
          success: false,
          message: "not authorized",
          admin: null,
        },
        {
          status: 400,
        }
      );
    }

    // checking if there is a admim with that email
    const admin = await prismaClient.admin.findUnique({
      where: { email: email },
    });
    if (!admin) {
      return NextResponse.json(
        {
          success: false,
          message: "Not authorized",
          admin: null,
        },
        {
          status: 400,
        }
      );
    }

    // validating input
    const parsedInput = await serviceInput.safeParse(reqBody);

    // if validation failed
    if (!parsedInput.success) {
      return NextResponse.json(
        {
          success: false,
          message: "invalid input",
        },
        {
          status: 422,
        }
      );
    }
    const { title, service, social, quantity, price } = parsedInput.data;

    const createdService = await prismaClient.service.create({
      data: {
        title,
        service,
        social,
        quantity,
        price,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "successfully created the service",
        createdService,
      },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      {
        status: 400,
      }
    );
  }
}
