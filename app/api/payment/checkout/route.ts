import Razorpay from "razorpay";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prismaClient } from "@/clients";
const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_SECRET_KEY,
});

const checkoutInput = z.object({
  serviceId: z.string(),
  quantity: z.number(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log(body);
    // validating input
    const parsedInput = checkoutInput.safeParse(body);

    if (!parsedInput.success) {
      return NextResponse.json(
        {
          success: false,
          error: "invalid input",
        },
        {
          status: 422,
        }
      );
    }

    const { serviceId, quantity } = parsedInput.data;

    console.log("parsed", serviceId, quantity);
    // finding service with id = serviceId
    const service = await prismaClient.service.findUnique({
      where: { id: serviceId },
    });

    if (!service) {
      return NextResponse.json(
        {
          success: false,
          error: "no service found with that id",
        },
        {
          status: 400,
        }
      );
    }

    console.log("prisma did ran");
    console.log(service);

    const amount =
      parseInt(service.price) * (quantity / parseInt(service.quantity));

    const options = {
      amount: (amount * 100).toString(), // amount in the smallest currency unit
      currency: "USD",
    };
    const order = await instance.orders.create(options);

    console.log(order);

    return NextResponse.json({
      success: true,
      order,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      {
        status: 400,
      }
    );
  }
}
