import { NextRequest, NextResponse } from "next/server";

export async function POST() {
  try {
    // const reqBody = await req.json();
    // console.log(reqBody);
    return NextResponse.json({
      success: true,
      message: "done",
    });
  } catch (e: any) {
    return NextResponse.json(
      { success: false, message: e.message },
      { status: 400 }
    );
  }
}
