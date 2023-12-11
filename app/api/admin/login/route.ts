import { NextRequest, NextResponse } from "next/server";
import { prismaClient } from "@/clients";
import { cookies } from "next/headers";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";
import { z } from "zod";

// JWT SECRET
const JWT_SECRET = process.env.JWT_SECRET as string;

const loginInput = z.object({
  email: z.string().min(5),
  password: z.string().min(5),
});

//function for get req this function will return a admin data
export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const cookie = cookies();
    const parsedInput = loginInput.safeParse(reqBody);
    //  checking input types
    if (!parsedInput.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid input",
        },
        {
          status: 422,
        }
      );
    }

    const { email, password } = parsedInput.data;
    const admin = await prismaClient.admin.findUnique({
      where: { email: email },
    });

    if (!admin) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email",
        },
        {
          status: 422,
        }
      );
    }
    const passwordChecking = await bcrypt.compare(password, admin.password);

    if (!passwordChecking) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid password",
        },
        {
          status: 422,
        }
      );
    }

    // creating jwt token
    const token = JWT.sign({ email: email }, JWT_SECRET, {
      expiresIn: "24h",
    });

    cookie.set("g-meta-admin-token", token);

    // making passrod null
    admin.password = "";

    return NextResponse.json(
      {
        success: true,
        message: "login successfull",
        admin: admin,
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
        admin: null,
      },
      {
        status: 400,
      }
    );
  }
}
