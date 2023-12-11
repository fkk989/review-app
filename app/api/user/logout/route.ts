import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // g-meta-admin-token
    const cookie = cookies();

    cookie.delete("g-meta-user-token");

    return NextResponse.json(
      {
        success: true,
        message: "loged out",
      },
      { status: 200 }
    );
  } catch (e: any) {
    return NextResponse.json(
      {
        success: false,
        message: e.message,
      },
      { status: 400 }
    );
  }
}
