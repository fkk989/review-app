import { prismaClient } from "@/clients";
import { Admin } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import emailValidator from "email-validator";
import bcrypt from "bcrypt";
import { z } from "zod";
import { cookies } from "next/headers";
import JWT from "jsonwebtoken";

// JWT SECRET
const JWT_SECRET = process.env.JWT_SECRET;

const adminInput = z.object({
  email: z.string().min(5),
  password: z.string().min(5),
  name: z.string().min(5),
});

export async function POST(req: NextRequest) {
  try {
    const cookie = cookies();
    const token = cookie.get("g-meta-admin-token");

    // if not token found
    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: "not token found. Not authorized",
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

    if (!adminToken || !adminToken.email) {
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

    const admin = await prismaClient.admin.findUnique({
      where: { email: adminToken.email },
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

    const reqBody = await req.json();
    const parsedInput = adminInput.safeParse(reqBody);

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

    const { email, password, name } = parsedInput.data;

    // checking in admin present in db

    const adminInDb = await prismaClient.admin.findUnique({ where: { email } });

    if (adminInDb) {
      return NextResponse.json(
        {
          success: false,
          message: "admin already present",
        },
        {
          status: 400,
        }
      );
    }

    const validatedEmail = emailValidator.validate(email);

    if (!validatedEmail) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid Email",
        },
        {
          status: 422,
        }
      );
    }
    // hashing password
    const salt = await bcrypt.genSalt(8);
    const hashedPassword = await bcrypt.hash(password, salt);

    const createdAdmin = await prismaClient.admin.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });

    createdAdmin.password = "";

    return NextResponse.json(
      {
        success: true,
        message: "created admin successfully",
        admin: createdAdmin,
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
