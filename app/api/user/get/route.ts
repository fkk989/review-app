import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import JWT from "jsonwebtoken";
import { prismaClient } from "@/clients";

// JWT SECRET
const JWT_SECRET = process.env.JWT_SECRET;
export async function GET() {
  try {
    const cookie = cookies();
    const token = cookie.get("g-meta-user-token");

    // if not token found
    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: "login again",
        },
        {
          status: 400,
        }
      );
    }

    // verifing token
    const userToken = (await JWT.verify(token.value, JWT_SECRET)) as {
      email: string;
    };
    const { email } = userToken;

    if (!userToken || !email) {
      return NextResponse.json(
        {
          success: false,
          message: "not authorized",
        },
        {
          status: 400,
        }
      );
    }

    const user = await prismaClient.user.findUnique({
      where: { email: email },
    });
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "No user found",
          admin: null,
        },
        {
          status: 400,
        }
      );
    }

    user.password = "";
    // res if every check pass
    return NextResponse.json(
      {
        success: true,
        message: "successfully fetched user ",
        user: user,
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
