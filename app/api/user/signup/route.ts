import { prismaClient } from "@/clients";
import { NextRequest, NextResponse } from "next/server";
import emailValidator from "email-validator";
import bcrypt from "bcrypt";
import { z } from "zod";

const userInput = z.object({
  name: z.string().min(5).max(50),
  email: z.string().min(5).max(50),
  password: z.string().min(5).max(50),
  phone: z.string().max(20),
  country: z.string().max(50),
});

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const parsedInput = await userInput.safeParse(reqBody);

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

    const { email, password, name, phone, country } = parsedInput.data;

    // checking in user present in db
    const userInDb = await prismaClient.user.findUnique({ where: { email } });

    if (userInDb) {
      return NextResponse.json(
        {
          success: false,
          message: "user already present",
        },
        {
          status: 400,
        }
      );
    }

    // checking if the emal is valid or not
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

    const createdUser = await prismaClient.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        phone,
        country,
      },
    });
    createdUser.password = "";

    return NextResponse.json(
      {
        success: true,
        message: "created admin successfully",
        admin: createdUser,
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
